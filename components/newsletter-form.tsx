"use client";

import { useId, useState } from "react";
import ciudadesData from "@/data/ciudades-chile.json";
import { cn } from "@/lib/utils";

const CIUDADES = ciudadesData.ciudades;
const OTRA_CIUDAD = "__otra__";

type Estado = "idle" | "enviando" | "ok" | "error";

export function NewsletterForm({ variant = "home" }: { variant?: "home" | "footer" }) {
  const idPrefix = useId();
  const [lugarNacimiento, setLugarNacimiento] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensaje, setMensaje] = useState("");

  const esOtraCiudad = lugarNacimiento === OTRA_CIUDAD;
  const compacto = variant === "footer";

  async function manejarEnvio(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const form = evento.currentTarget;
    const datos = Object.fromEntries(new FormData(form).entries());

    setEstado("enviando");
    setMensaje("Enviando…");

    try {
      const respuesta = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const resultado = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        throw new Error(resultado.error || "No se pudo completar la suscripción.");
      }

      setMensaje(
        resultado.cartaNatalFallo
          ? "¡Gracias! Quedaste suscrita — tuvimos un problema calculando tu carta natal, lo revisamos antes del próximo envío."
          : "¡Gracias! Revisa tu correo para confirmar la suscripción.",
      );
      setEstado("ok");
      form.reset();
      setLugarNacimiento("");
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : "Algo falló. Intenta de nuevo en unos minutos.");
      setEstado("error");
    }
  }

  return (
    <form
      aria-label="Suscribirse a El cielo del mes"
      onSubmit={manejarEnvio}
      className={cn("flex flex-col gap-xs", compacto ? "mt-sm text-left" : "mx-auto mt-sm max-w-[420px]")}
    >
      <div className="flex flex-col gap-[0.15rem] text-left">
        <label htmlFor={`${idPrefix}-email`}>Tu correo electrónico</label>
        <input
          type="email"
          id={`${idPrefix}-email`}
          name="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          spellCheck={false}
          required
          className="rounded-borde border border-ciruela bg-blanco px-[1rem] py-[0.75rem] font-cuerpo text-base text-ciruela"
        />
      </div>

      <div className="grid grid-cols-1 gap-xs min-[480px]:grid-cols-2">
        <div className="flex flex-col gap-[0.15rem] text-left">
          <label htmlFor={`${idPrefix}-fecha`}>Fecha de nacimiento</label>
          <input
            type="date"
            id={`${idPrefix}-fecha`}
            name="fecha_nacimiento"
            autoComplete="bday"
            required
            className="rounded-borde border border-ciruela bg-blanco px-[1rem] py-[0.75rem] font-cuerpo text-base text-ciruela"
          />
        </div>
        <div className="flex flex-col gap-[0.15rem] text-left">
          <label htmlFor={`${idPrefix}-hora`}>Hora de nacimiento</label>
          <input
            type="time"
            id={`${idPrefix}-hora`}
            name="hora_nacimiento"
            className="rounded-borde border border-ciruela bg-blanco px-[1rem] py-[0.75rem] font-cuerpo text-base text-ciruela"
          />
        </div>
      </div>
      <p className="text-left text-[0.85rem] text-ciruela-suave">
        Si no sabes tu hora exacta, déjala en blanco — igual podemos leer tu luna natal, aunque no tu ascendente.
      </p>

      <div className="flex flex-col gap-[0.15rem] text-left">
        <label htmlFor={`${idPrefix}-lugar`}>Ciudad de nacimiento</label>
        <select
          id={`${idPrefix}-lugar`}
          name="lugar_nacimiento"
          required
          value={lugarNacimiento}
          onChange={(evento) => setLugarNacimiento(evento.target.value)}
          className="rounded-borde border border-ciruela bg-blanco px-[1rem] py-[0.75rem] font-cuerpo text-base text-ciruela"
        >
          <option value="">Selecciona una ciudad…</option>
          {CIUDADES.map((ciudad) => (
            <option key={ciudad.nombre} value={ciudad.nombre}>
              {ciudad.nombre}
            </option>
          ))}
          <option value={OTRA_CIUDAD}>Otra ciudad…</option>
        </select>
      </div>
      {esOtraCiudad && (
        <div className="flex flex-col gap-[0.15rem] text-left">
          <label htmlFor={`${idPrefix}-otra-ciudad`}>Nombre de tu ciudad</label>
          <input
            type="text"
            id={`${idPrefix}-otra-ciudad`}
            name="otra_ciudad"
            placeholder="Ciudad, país"
            required
            className="rounded-borde border border-ciruela bg-blanco px-[1rem] py-[0.75rem] font-cuerpo text-base text-ciruela"
          />
        </div>
      )}

      <label htmlFor={`${idPrefix}-consentimiento`} className="flex items-start gap-xs text-left text-[0.9rem]">
        <input type="checkbox" id={`${idPrefix}-consentimiento`} name="consentimiento" required className="mt-[0.2rem] accent-ciruela" />
        <span>
          Acepto que estos datos se usen para calcular mi carta natal y recibir El cielo del mes. Ver{" "}
          <a href="/privacidad">política de privacidad</a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className={cn(
          "inline-block rounded-borde border px-[1.6rem] py-[0.85rem] font-cuerpo text-[0.95rem] font-semibold no-underline transition-colors disabled:opacity-60",
          compacto
            ? "border-champan bg-transparent text-champan hover:border-oro hover:text-oro focus-visible:border-oro focus-visible:text-oro"
            : "border-transparent bg-ciruela text-champan hover:border-oro focus-visible:border-oro",
        )}
      >
        Suscribirme
      </button>
      {mensaje && (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-[0.9rem]",
            estado === "error" && "text-[#a23b3b]",
            estado === "ok" && (compacto ? "text-champan" : "text-ciruela"),
          )}
        >
          {mensaje}
        </p>
      )}
    </form>
  );
}
