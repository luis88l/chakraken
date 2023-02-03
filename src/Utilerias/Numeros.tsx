

// Rellena 2 digitos con 0
export function padTo2Digits(num: any): string {
    return num.toString().padStart(2, '0');
}

// Rellena elemento dependiendo las indicaciones que se registren
export function RellenarElemento(VecesaRepetir: number, Caracter:any, Elemento:any): string {
    return Elemento.toString().padStart(VecesaRepetir, Caracter);
}