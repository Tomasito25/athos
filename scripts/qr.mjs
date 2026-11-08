/**
 * Dibuja un código QR en el terminal.
 *
 *   node scripts/qr.mjs <url>
 *
 * Lo usa `run.sh --movil` para que puedas apuntar con la cámara del teléfono en
 * lugar de teclear una dirección IP. Si Node no está disponible, run.sh se
 * limita a mostrar la dirección: el QR es una comodidad, no un requisito.
 */
import QRCode from 'qrcode';

const url = process.argv[2];
if (!url) {
  console.error('Uso: node scripts/qr.mjs <url>');
  process.exit(2);
}

const salida = await QRCode.toString(url, {
  type: 'terminal',
  small: true,
  errorCorrectionLevel: 'L',
});
process.stdout.write(salida);
