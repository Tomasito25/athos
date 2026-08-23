/**
 * Contador compartido por la oración de Jesús y el chotki.
 *
 * Mantiene la cuenta, el tiempo transcurrido, la vibración y el bloqueo de
 * pantalla. Las capacidades que el navegador no tenga se ignoran en silencio,
 * pero la pantalla lo indica: no se promete lo que no hay.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { saveSession } from '@/db/user';
import { releaseWakeLock, requestWakeLock, wakeLockSupported } from '@/lib/wakelock';
import { useSettings } from '@/stores/settings';

export const TARGETS = [33, 50, 100, 300] as const;

export interface CounterOptions {
  mode: 'jesus-prayer' | 'chotki';
  formulaId: string;
  initialTarget?: number | null;
}

export function useCounter({ mode, formulaId, initialTarget = null }: CounterOptions) {
  const { jesusPrayerVibration, jesusPrayerSound, jesusPrayerKeepAwake } = useSettings();

  const [count, setCount] = useState(0);
  const [target, setTarget] = useState<number | null>(initialTarget);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef<number | null>(null);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  const audioContext = useRef<AudioContext | null>(null);

  /* ---- Cronómetro ---- */
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (startedAt.current) setElapsed(Date.now() - startedAt.current);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  /* ---- Pantalla encendida ---- */
  useEffect(() => {
    if (running && jesusPrayerKeepAwake) {
      void requestWakeLock().then(setWakeLockActive);
    } else {
      void releaseWakeLock().then(() => setWakeLockActive(false));
    }
    return () => {
      void releaseWakeLock();
    };
  }, [running, jesusPrayerKeepAwake]);

  const beep = useCallback(() => {
    if (!jesusPrayerSound) return;
    try {
      audioContext.current ??= new AudioContext();
      const ctx = audioContext.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.frequency.value = 528;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.24);
    } catch {
      /* Algunos navegadores exigen un gesto previo; no es motivo de error. */
    }
  }, [jesusPrayerSound]);

  const buzz = useCallback(
    (pattern: number | number[]) => {
      if (!jesusPrayerVibration) return;
      navigator.vibrate?.(pattern);
    },
    [jesusPrayerVibration],
  );

  const start = useCallback(() => {
    startedAt.current ??= Date.now();
    setRunning(true);
  }, []);

  const pause = useCallback(() => setRunning(false), []);

  const increment = useCallback(() => {
    if (!startedAt.current) startedAt.current = Date.now();
    setRunning(true);
    setCount((current) => {
      const next = current + 1;
      const reachedTarget = target !== null && next === target;
      const decade = next % 10 === 0;
      buzz(reachedTarget ? [80, 60, 80, 60, 160] : decade ? [40, 40, 40] : 18);
      if (reachedTarget || decade) beep();
      return next;
    });
  }, [beep, buzz, target]);

  const reset = useCallback(() => {
    setCount(0);
    setElapsed(0);
    setRunning(false);
    startedAt.current = null;
  }, []);

  const finish = useCallback(
    async (save: boolean) => {
      const began = startedAt.current;
      if (save && count > 0 && began) {
        await saveSession({
          startedAt: new Date(began).toISOString(),
          endedAt: new Date().toISOString(),
          count,
          target,
          durationMs: Date.now() - began,
          mode,
          formulaId,
        });
      }
      reset();
      return save && count > 0;
    },
    [count, formulaId, mode, reset, target],
  );

  const progress = useMemo(() => (target ? Math.min(1, count / target) : 0), [count, target]);
  const complete = target !== null && count >= target;

  return {
    count,
    target,
    setTarget,
    running,
    elapsed,
    progress,
    complete,
    wakeLockActive,
    wakeLockSupported: wakeLockSupported(),
    vibrationSupported: typeof navigator !== 'undefined' && 'vibrate' in navigator,
    start,
    pause,
    increment,
    reset,
    finish,
  };
}
