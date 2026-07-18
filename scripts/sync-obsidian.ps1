<#
.SYNOPSIS
  Sincroniza el grafo de graphify del proyecto con el vault de Obsidian.

.DESCRIPTION
  Dirección Proyecto -> vault: reexporta graphify-out/graph.json (ya construido,
  vía /graphify o el hook de post-commit) como notas de Obsidian en
  grafo-proyecto/ dentro del vault.

  Dirección vault -> proyecto (fold-back): trata grafo-proyecto/ como su propio
  corpus y funde su grafo con el del proyecto, incorporando notas que el usuario
  haya escrito/editado a mano en Obsidian.

  El fold-back necesita un LLM para las notas .md del vault (graphify no admite
  extracción de código puro para markdown). Si no hay GEMINI_API_KEY/GOOGLE_API_KEY
  en el entorno, este script omite el fold-back y avisa: en ese caso, corre
  `/graphify` dentro de Claude Code primero.
#>

param(
    [switch]$Help,
    [string]$VaultDir = "C:\Users\Fran\ObsidianVaults\astrologia-herbolaria",
    [string]$ProjectDir = ""
)

if ($Help) {
    Write-Host "sync-obsidian.ps1 - Sincroniza graphify <-> Obsidian vault"
    Write-Host "Uso: .\scripts\sync-obsidian.ps1 [-VaultDir <ruta>] [-ProjectDir <ruta>] [-Help]"
    Write-Host "
    -VaultDir: ruta al vault de Obsidian (por defecto: $VaultDir)
    -ProjectDir: ruta al directorio del proyecto. Si no se especifica, se deriva desde la ubicación del script (repo root asumido como la carpeta padre de 'scripts/')"
    exit 0
}

# Fail fast
$ErrorActionPreference = "Stop"

# Derivar $ProjectDir desde la ubicación del script si no se pasa explícitamente.
if (-not $ProjectDir -or $ProjectDir -eq "") {
    if ($PSScriptRoot) {
        try {
            $candidate = Resolve-Path (Join-Path $PSScriptRoot "..") -ErrorAction Stop
            $ProjectDir = $candidate.Path
        } catch {
            # Fallback a carpeta actual
            $ProjectDir = (Get-Location).Path
        }
    } else {
        $ProjectDir = (Get-Location).Path
    }
}

# Comprobar que graphify esté disponible
$graphifyCmd = Get-Command graphify -ErrorAction SilentlyContinue
if (-not $graphifyCmd) {
    Write-Error "El ejecutable 'graphify' no se encontró en PATH. Instálalo y asegúrate de que 'graphify' sea accesible desde la terminal."
    Write-Host "Instalación / más info: https://github.com/graphify/graphify  (o la URL apropiada según tu instalación)"
    exit 1
}

$GrafoProyecto = Join-Path $VaultDir "grafo-proyecto"
$GraphJsonProject = Join-Path (Join-Path $ProjectDir "graphify-out") "graph.json"

Write-Host "== 1/2: Proyecto -> vault ==" -ForegroundColor Cyan
Push-Location $ProjectDir
try {
    if (-not (Test-Path $GraphJsonProject)) {
        Write-Warning "$GraphJsonProject no existe todavía. Corre '/graphify .' en Claude Code primero."
    } else {
        & graphify export obsidian --dir $GrafoProyecto
    }
} finally {
    Pop-Location
}

Write-Host "== 2/2: vault -> proyecto (fold-back) ==" -ForegroundColor Cyan
if ($env:GEMINI_API_KEY -or $env:GOOGLE_API_KEY) {
    & graphify extract $GrafoProyecto --backend gemini
    Push-Location $ProjectDir
    try {
        $GraphJsonVault = Join-Path (Join-Path $GrafoProyecto "graphify-out") "graph.json"
        & graphify merge-graphs `
            $GraphJsonProject `
            $GraphJsonVault `
            --out $GraphJsonProject
        Write-Host "Fold-back completo: notas del vault fusionadas de vuelta al grafo del proyecto." -ForegroundColor Green
    } finally {
        Pop-Location
    }
} else {
    Write-Warning "No hay GEMINI_API_KEY/GOOGLE_API_KEY en el entorno - se omite el fold-back automático."
    Write-Host "Para incorporar notas nuevas del vault al grafo del proyecto, corre dentro de Claude Code:" -ForegroundColor Yellow
    Write-Host "  /graphify `"$GrafoProyecto`"" -ForegroundColor Yellow
    Write-Host "  (esto usa subagentes en vez de una clave de API), y luego:" -ForegroundColor Yellow
    Write-Host "  graphify merge-graphs $GraphJsonProject `"$GrafoProyecto\graphify-out\graph.json`" --out $GraphJsonProject" -ForegroundColor Yellow
}

Write-Host "Listo." -ForegroundColor Green
