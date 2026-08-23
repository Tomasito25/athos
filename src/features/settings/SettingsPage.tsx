import { Link } from 'react-router-dom';
import { CALENDAR_STYLE_LABELS, CALENDAR_STYLE_NOTE } from '@/lib/calendar/liturgical';
import { DEFAULT_SETTINGS, useSettings } from '@/stores/settings';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import {
  Button,
  Field,
  ListRow,
  PageHead,
  Panel,
  Section,
  Segmented,
  Switch,
} from '@/components/ui';
import {
  IconBell,
  IconInfo,
  IconInstall,
  IconLock,
  IconMoon,
  IconScroll,
  IconSun,
} from '@/components/icons';
import type { CalendarStyle } from '@/types';
import type { MeasureChoice, ThemeChoice } from '@/stores/settings';
import es from '@/locales/es';

export function SettingsPage() {
  const settings = useSettings();

  return (
    <div className="page page--reading">
      <PageHead title={es.settings.title} />

      <Section title={es.settings.appearance}>
        <Panel>
          <div className="stack">
            <Field label={es.settings.theme}>
              {() => (
                <Segmented
                  value={settings.theme}
                  label={es.settings.theme}
                  options={[
                    { value: 'light' as ThemeChoice, label: es.settings.themeLight },
                    { value: 'dark' as ThemeChoice, label: es.settings.themeDark },
                    { value: 'system' as ThemeChoice, label: es.settings.themeSystem },
                  ]}
                  onChange={(value) => settings.set('theme', value)}
                />
              )}
            </Field>

            <Field
              label={`${es.settings.fontSize} · ${Math.round(settings.fontScale * 100)}%`}
            >
              {(id) => (
                <input
                  id={id}
                  type="range"
                  min={0.85}
                  max={1.6}
                  step={0.05}
                  value={settings.fontScale}
                  onChange={(event) => settings.set('fontScale', Number(event.target.value))}
                  style={{ width: '100%' }}
                />
              )}
            </Field>

            <Field label={`${es.settings.lineHeight} · ${settings.lineHeight.toFixed(2)}`}>
              {(id) => (
                <input
                  id={id}
                  type="range"
                  min={1.35}
                  max={2.1}
                  step={0.05}
                  value={settings.lineHeight}
                  onChange={(event) => settings.set('lineHeight', Number(event.target.value))}
                  style={{ width: '100%' }}
                />
              )}
            </Field>

            <Field label={es.settings.measure}>
              {() => (
                <Segmented
                  value={settings.measure}
                  label={es.settings.measure}
                  options={[
                    { value: 'narrow' as MeasureChoice, label: es.settings.measureNarrow },
                    { value: 'normal' as MeasureChoice, label: es.settings.measureNormal },
                    { value: 'wide' as MeasureChoice, label: es.settings.measureWide },
                  ]}
                  onChange={(value) => settings.set('measure', value)}
                />
              )}
            </Field>
          </div>

          <div style={{ marginTop: 'var(--sp-4)' }}>
            <Switch
              checked={settings.paperMode}
              onChange={(value) => settings.set('paperMode', value)}
              title={es.settings.paperMode}
              description="Fondo cálido de pergamino en las páginas de lectura."
            />
            <Switch
              checked={settings.serifUi}
              onChange={(value) => settings.set('serifUi', value)}
              title={es.settings.serifUi}
              description="Toda la interfaz con la tipografía de los libros litúrgicos."
            />
            <Switch
              checked={settings.highContrast}
              onChange={(value) => settings.set('highContrast', value)}
              title={es.settings.highContrast}
              description="Más contraste entre el texto y el fondo."
            />
          </div>

          <p className="source-note">{es.settings.reducedMotion}</p>
        </Panel>
      </Section>

      <Section title={es.settings.calendar}>
        <Panel>
          <Field label={es.settings.calendarStyle}>
            {() => (
              <Segmented
                value={settings.calendarStyle}
                label={es.settings.calendarStyle}
                options={[
                  { value: 'nuevo' as CalendarStyle, label: es.calendar.styleNew },
                  { value: 'juliano' as CalendarStyle, label: es.calendar.styleOld },
                ]}
                onChange={(value) => settings.set('calendarStyle', value)}
              />
            )}
          </Field>
          <p className="muted text-sm" style={{ marginTop: 'var(--sp-3)' }}>
            {CALENDAR_STYLE_LABELS[settings.calendarStyle]}. {CALENDAR_STYLE_NOTE[settings.calendarStyle]}
          </p>
        </Panel>
      </Section>

      <Section title={es.settings.language}>
        <Panel>
          <Field label={es.settings.language} hint={es.settings.languageNote}>
            {(id) => (
              <select
                id={id}
                className="select"
                value={settings.language}
                onChange={(event) => settings.set('language', event.target.value)}
              >
                {SUPPORTED_LANGUAGES.map((language) => (
                  <option key={language.code} value={language.code} disabled={!language.ready}>
                    {language.native}
                    {language.ready ? '' : ' — pendiente de traducir'}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </Panel>
      </Section>

      <Section title={es.nav.more}>
        <div className="list">
          <ListRow to="/configuracion/instalar" leading={<IconInstall size={20} />} title={es.settings.install} />
          <ListRow to="/configuracion/notificaciones" leading={<IconBell size={20} />} title={es.settings.notifications} />
          <ListRow to="/configuracion/seguridad" leading={<IconLock size={20} />} title={es.settings.security} />
          <ListRow to="/configuracion/datos" leading={<IconScroll size={20} />} title={es.settings.data} />
          <ListRow to="/configuracion/fuentes" leading={<IconInfo size={20} />} title={es.settings.sources} />
          <ListRow to="/configuracion/acerca-de" leading={<IconInfo size={20} />} title={es.settings.about} />
        </div>
      </Section>

      <div className="btn-row" style={{ marginTop: 'var(--sp-5)' }}>
        <Button
          variant="ghost"
          onClick={() => {
            settings.reset();
          }}
        >
          Restablecer el aspecto
        </Button>
        <span className="row muted text-sm" style={{ marginInlineStart: 'auto' }}>
          {settings.theme === 'dark' ? <IconMoon size={16} /> : <IconSun size={16} />}
          {es.settings.version.replace('{{version}}', __APP_VERSION__)}
        </span>
      </div>

      <p className="source-note">
        Restablecer el aspecto sólo afecta a estas preferencias; no toca el diario, las reglas ni
        los hábitos. Para eso, <Link to="/configuracion/datos">{es.settings.data}</Link>.
      </p>

      <p className="sr-only">
        Valores por defecto: tema {DEFAULT_SETTINGS.theme}, escala {DEFAULT_SETTINGS.fontScale}.
      </p>
    </div>
  );
}
