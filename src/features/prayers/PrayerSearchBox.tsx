/** El buscador de oraciones: lleva a la lista completa con lo escrito ya filtrado. */
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@/components/icons';
import es from '@/locales/es';

export function PrayerSearchBox() {
  const [texto, setTexto] = useState('');
  const navigate = useNavigate();

  const buscar = (event: FormEvent) => {
    event.preventDefault();
    const q = texto.trim();
    navigate(q ? `/orar/oraciones/todas?q=${encodeURIComponent(q)}` : '/orar/oraciones/todas');
  };

  return (
    <form className="pray-search" role="search" onSubmit={buscar}>
      <IconSearch size={18} aria-hidden="true" />
      <input
        type="search"
        enterKeyHint="search"
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        placeholder={es.prayers.searchPlaceholder}
        aria-label={es.prayers.searchPlaceholder}
      />
    </form>
  );
}
