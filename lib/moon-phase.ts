const SYNODIC_MONTH_DAYS = 29.53058867;
const KNOWN_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14);

export type FaseLunar = {
  /** 0 = luna nueva, 0.5 = luna llena, 1 = próxima luna nueva. */
  fraccion: number;
  /** Porción iluminada visible, 0 a 1. */
  iluminacion: number;
  creciente: boolean;
  nombre: string;
};

export function calcularFaseLunar(fecha: Date = new Date()): FaseLunar {
  const diffDias = (fecha.getTime() - KNOWN_NEW_MOON_UTC) / 86400000;
  const edad = ((diffDias % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;
  const fraccion = edad / SYNODIC_MONTH_DAYS;
  const iluminacion = (1 - Math.cos(2 * Math.PI * fraccion)) / 2;
  const creciente = fraccion < 0.5;

  let nombre: string;
  if (fraccion < 0.03 || fraccion > 0.97) nombre = "Luna nueva";
  else if (fraccion < 0.22) nombre = "Luna creciente";
  else if (fraccion < 0.28) nombre = "Cuarto creciente";
  else if (fraccion < 0.47) nombre = "Gibosa creciente";
  else if (fraccion < 0.53) nombre = "Luna llena";
  else if (fraccion < 0.72) nombre = "Gibosa menguante";
  else if (fraccion < 0.78) nombre = "Cuarto menguante";
  else nombre = "Luna menguante";

  return { fraccion, iluminacion, creciente, nombre };
}

export type MomentoDelDia = "noche" | "amanecer" | "dia" | "atardecer";

export function calcularMomentoDelDia(fecha: Date = new Date()): MomentoDelDia {
  const hora = fecha.getHours();
  if (hora >= 6 && hora < 8) return "amanecer";
  if (hora >= 8 && hora < 18) return "dia";
  if (hora >= 18 && hora < 20) return "atardecer";
  return "noche";
}
