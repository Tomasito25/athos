/**
 * Cifrado local del diario.
 *
 * Usa exclusivamente Web Crypto: PBKDF2-SHA256 para derivar la clave del PIN y
 * AES-GCM para cifrar. La clave nunca se guarda; se deriva en memoria cada vez
 * que el usuario desbloquea el diario.
 *
 * Honestidad sobre lo que esto protege: un PIN corto no resiste un ataque por
 * fuerza bruta de alguien con acceso al dispositivo y tiempo. Protege frente a
 * una mirada casual y frente a la lectura directa de IndexedDB, no frente a un
 * atacante decidido. La aplicación no afirma más que eso.
 */
import type { EncryptionEnvelope } from '@/types';

const ITERATIONS = 310_000;

const enc = new TextEncoder();
const dec = new TextDecoder();

export const cryptoAvailable = () =>
  typeof globalThis.crypto !== 'undefined' && !!globalThis.crypto.subtle;

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(pin: string, salt: Uint8Array, iterations = ITERATIONS): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, [
    'deriveKey',
  ]);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

export interface Encrypted {
  ciphertext: string;
  envelope: EncryptionEnvelope;
}

export async function encryptText(plain: string, pin: string): Promise<Encrypted> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin, salt);
  const buffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    enc.encode(plain),
  );

  return {
    ciphertext: toBase64(buffer),
    envelope: {
      algorithm: 'AES-GCM',
      kdf: 'PBKDF2-SHA256',
      iterations: ITERATIONS,
      salt: toBase64(salt.buffer as ArrayBuffer),
      iv: toBase64(iv.buffer as ArrayBuffer),
    },
  };
}

export async function decryptText(
  ciphertext: string,
  envelope: EncryptionEnvelope,
  pin: string,
): Promise<string> {
  const salt = fromBase64(envelope.salt);
  const iv = fromBase64(envelope.iv);
  const key = await deriveKey(pin, salt, envelope.iterations);
  const buffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    fromBase64(ciphertext) as BufferSource,
  );
  return dec.decode(buffer);
}

/** Verificador del PIN: se guarda el resultado, nunca el PIN. */
export async function pinDigest(pin: string, salt: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', enc.encode(`${salt}:${pin}`));
  return toBase64(buffer);
}

export function newSalt(): string {
  return toBase64(crypto.getRandomValues(new Uint8Array(16)).buffer as ArrayBuffer);
}

/* ---------- Desbloqueo biométrico mediante WebAuthn ---------- */

export const webAuthnAvailable = () =>
  typeof window !== 'undefined' && !!window.PublicKeyCredential;

export async function platformAuthenticatorAvailable(): Promise<boolean> {
  if (!webAuthnAvailable()) return false;
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}
