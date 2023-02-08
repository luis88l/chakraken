/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
// Regresa el mes y año , Formato a mandar a la funcion yyyy-MM-dd fh_registro "2023-01-09"
export function ReturnFechaLetra(Fecha: string): any {
  const date = new Date(Fecha + ' 00:00')
  let mes = date.toLocaleString('es-MX', { month: 'long' })
  mes = mes.charAt(0).toUpperCase() + mes.slice(1)
  const dia = date.toLocaleString('es-MX', { day: 'numeric' })
  return `${dia} ${mes}`
}
