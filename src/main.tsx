/** Punto de entrada de ATHOS. */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { bootstrap } from '@/lib/bootstrap';

import '@/styles/fonts.css';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/typography.css';
import '@/styles/shell.css';
import '@/styles/components.css';

const container = document.getElementById('root');
if (!container) throw new Error('Falta el elemento raíz');

bootstrap()
  .catch((error: unknown) => {
    console.error('ATHOS no ha podido preparar sus datos locales', error);
  })
  .finally(() => {
    createRoot(container).render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  });
