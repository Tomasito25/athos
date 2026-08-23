/**
 * Cifrado del diario.
 *
 * Se comprueba lo que la aplicación afirma en la pantalla de Seguridad, ni más
 * ni menos: AES-GCM real, clave derivada del PIN, y ninguna forma de recuperar
 * el texto sin él.
 */
import { describe, expect, it } from 'vitest';
import { decryptText, encryptText, newSalt, pinDigest } from '@/lib/crypto';

describe('cifrado de las entradas', () => {
  it('cifra y descifra con el mismo PIN', async () => {
    const texto = 'Hoy he vuelto a empezar. Señor, ten piedad.';
    const { ciphertext, envelope } = await encryptText(texto, '1234');
    expect(ciphertext).not.toContain('Señor');
    expect(await decryptText(ciphertext, envelope, '1234')).toBe(texto);
  });

  it('falla con un PIN equivocado', async () => {
    const { ciphertext, envelope } = await encryptText('secreto', '1234');
    await expect(decryptText(ciphertext, envelope, '4321')).rejects.toThrow();
  });

  it('declara el algoritmo que usa de verdad', async () => {
    const { envelope } = await encryptText('x', '1234');
    expect(envelope.algorithm).toBe('AES-GCM');
    expect(envelope.kdf).toBe('PBKDF2-SHA256');
    expect(envelope.iterations).toBeGreaterThanOrEqual(300_000);
  });

  it('usa sal e IV distintos en cada cifrado', async () => {
    const a = await encryptText('mismo texto', '1234');
    const b = await encryptText('mismo texto', '1234');
    expect(a.envelope.salt).not.toBe(b.envelope.salt);
    expect(a.envelope.iv).not.toBe(b.envelope.iv);
    expect(a.ciphertext).not.toBe(b.ciphertext);
  });

  it('conserva los acentos y el griego', async () => {
    const texto = 'Δόξα τῷ Θεῷ — oración, ayuno, Theotókos';
    const { ciphertext, envelope } = await encryptText(texto, 'pin-largo');
    expect(await decryptText(ciphertext, envelope, 'pin-largo')).toBe(texto);
  });
});

describe('verificación del PIN', () => {
  it('el resumen depende de la sal', async () => {
    const a = await pinDigest('1234', 'sal-a');
    const b = await pinDigest('1234', 'sal-b');
    expect(a).not.toBe(b);
  });

  it('el mismo PIN y la misma sal dan el mismo resumen', async () => {
    const sal = newSalt();
    expect(await pinDigest('1234', sal)).toBe(await pinDigest('1234', sal));
  });

  it('el resumen no contiene el PIN', async () => {
    const digest = await pinDigest('123456', newSalt());
    expect(digest).not.toContain('123456');
  });

  it('cada sal es distinta', () => {
    const sales = new Set(Array.from({ length: 50 }, () => newSalt()));
    expect(sales.size).toBe(50);
  });
});
