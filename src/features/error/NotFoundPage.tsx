import { ButtonLink, Empty, PageHead } from '@/components/ui';
import es from '@/locales/es';

export function NotFoundPage() {
  return (
    <div className="page page--reading">
      <PageHead title="Aquí no hay nada" />
      <Empty
        title="Esta página no existe"
        text="Puede que el enlace esté equivocado o que la sección aún no se haya incorporado."
        action={<ButtonLink to="/" variant="primary">{es.nav.home}</ButtonLink>}
      />
    </div>
  );
}
