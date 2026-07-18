import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatoCLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatCLP(monto: number) {
  return formatoCLP.format(monto);
}

const formatoFecha = new Intl.DateTimeFormat("es-CL", { dateStyle: "long" });

export function formatFecha(fecha: Date) {
  return formatoFecha.format(fecha);
}
