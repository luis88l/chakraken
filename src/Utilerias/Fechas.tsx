// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
import { padTo2Digits } from "./Numeros";

// Formato yyyy-MM-dd
export function AcortarNewDate(Fecha: Date): any {
  return (
    String(Fecha.getFullYear()) +
    "-" +
    padTo2Digits(Fecha.getMonth() + 1) +
    "-" +
    padTo2Digits(Fecha.getDate())
  );
}
