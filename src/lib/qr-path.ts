/**
 * De la matriz de módulos de un QR a un trazado SVG.
 *
 * Vive aparte del componente para poder comprobarlo sin montar React: la
 * prueba dibuja el trazado, lo convierte en píxeles y lo pasa por un
 * descodificador de QR de verdad, para verificar que lo que se pinta se lee.
 */
export interface QrMatriz {
  size: number;
  data: Uint8Array;
}

export function qrPath(matriz: QrMatriz): string {
  const partes: string[] = [];
  for (let fila = 0; fila < matriz.size; fila += 1) {
    for (let col = 0; col < matriz.size; col += 1) {
      if (matriz.data[fila * matriz.size + col]) partes.push(`M${col} ${fila}h1v1h-1z`);
    }
  }
  return partes.join('');
}
