<#
.SYNOPSIS
  Sincroniza el grafo de graphify del proyecto con el vault de Obsidian.

.DESCRIPTION
  Direccion Proyecto -> vault: reexporta graphify-out/graph.json (ya construido,
  vía /graphify o el hook de post-commit) como notas de Obsidian en
  grafo-proyecto/ dentro del vault.

  Direccion vault -> proyecto (fold-back): trata grafo-proyecto/ como su propio
  corpus y funde su grafo con el del proyecto, incorporando notas que el usuario
  haya escrito/editado a mano en Obsidian.

  El fold-back necesita un LLM para las notas .md del vault (graphify no admite
  extraccion de codigo puro para markdown). Si no hay GEMINI_API_KEY/GOOGLE_API_KEY
  en el entorno, este script omite el fold-back y avisa: en ese caso, corre
  `/graphify graphify-out\grafo-proyecto-fold` (o el path del vault) dentro de una
  sesion de Claude Code para que use subagentes en vez de una clave de API.
#>

param(
    [string]$VaultDir = "C:\Users\Fran\ObsidianVaults\astrologia-herbolaria",
    [string]$ProjectDir = "C:\Users\Fran\Code"
)

$ErrorActionPreference = "Stop"
$GrafoProyecto = Join-Path $VaultDir "grafo-proyecto"

Write-Host "== 1/2: Proyecto -> vault ==" -ForegroundColor Cyan
Push-Location $ProjectDir
try {
    if (-not (Test-Path "graphify-out\graph.json")) {
        Write-Warning "graphify-out\graph.json no existe todavia. Corre '/graphify .' en Claude Code primero."
    } else {
        graphify export obsidian --dir $GrafoProyecto
    }
} finally {
    Pop-Location
}

Write-Host "== 2/2: vault -> proyecto (fold-back) ==" -ForegroundColor Cyan
if ($env:GEMINI_API_KEY -or $env:GOOGLE_API_KEY) {
    graphify extract $GrafoProyecto --backend gemini
    Push-Location $ProjectDir
    try {
        graphify merge-graphs `
            "graphify-out\graph.json" `
            (Join-Path $GrafoProyecto "graphify-out\graph.json") `
            --out "graphify-out\graph.json"
        Write-Host "Fold-back completo: notas del vault fusionadas de vuelta al grafo del proyecto." -ForegroundColor Green
    } finally {
        Pop-Location
    }
} else {
    Write-Warning "No hay GEMINI_API_KEY/GOOGLE_API_KEY en el entorno - se omite el fold-back automatico."
    Write-Host "Para incorporar notas nuevas del vault al grafo del proyecto, corre dentro de Claude Code:" -ForegroundColor Yellow
    Write-Host "  /graphify `"$GrafoProyecto`"" -ForegroundColor Yellow
    Write-Host "  (esto usa subagentes en vez de una clave de API), y luego:" -ForegroundColor Yellow
    Write-Host "  graphify merge-graphs graphify-out\graph.json `"$GrafoProyecto\graphify-out\graph.json`" --out graphify-out\graph.json" -ForegroundColor Yellow
}

Write-Host "Listo." -ForegroundColor Green
