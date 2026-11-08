/** Las ocho épocas, en orden. */
import { EARLY_PERIODS } from './history-early';
import { LATE_PERIODS } from './history-late';
import type { HistoryEvent, HistoryPeriod } from './history';

export const HISTORY_PERIODS: HistoryPeriod[] = [...EARLY_PERIODS, ...LATE_PERIODS];

/** Todos los hechos, ordenados por fecha, con la época a la que pertenecen. */
export const HISTORY_TIMELINE: Array<HistoryEvent & { periodId: string }> = HISTORY_PERIODS.flatMap(
  (p) => p.events.map((e) => ({ ...e, periodId: p.id })),
).sort((a, b) => a.sort - b.sort);

/** Los concilios, que son las junturas de todo lo demás. */
export const COUNCILS = HISTORY_TIMELINE.filter((e) => e.council);

/** Los siete Ecuménicos, por número. */
export const ECUMENICAL = COUNCILS.filter((e) => e.council?.number).sort(
  (a, b) => (a.council!.number ?? 0) - (b.council!.number ?? 0),
);
