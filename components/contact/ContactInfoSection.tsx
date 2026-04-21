import { SectionContainer } from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/Button";

export type ContactInfoSectionProps = {
  headlineLine1: string;
  headlineLine2: string;
  infoBlockTitle: string;
  infoBlockSubtitle: string;
  addressLabel: string;
  addressLines: string;
  hoursLabel: string;
  hours: string;
  phone: string;
  phoneHref: string;
  email: string;
  note: string;
  reserveLabel: string;
};

/**
 * Bloco editorial de contacto (linhas horizontais, três colunas em desktop)
 * inspirado em layouts tipo “customer service” em cream.
 */
export function ContactInfoSection({
  headlineLine1,
  headlineLine2,
  infoBlockTitle,
  infoBlockSubtitle,
  addressLabel,
  addressLines,
  hoursLabel,
  hours,
  phone,
  phoneHref,
  email,
  note,
  reserveLabel,
}: ContactInfoSectionProps) {
  return (
    <section className="bg-[#fcf9f1] pb-16 sm:pb-20" data-header-theme="brown">
      <SectionContainer>
        <header className="border-b border-stone-200/90 py-8 sm:py-10">
          <h1 className="font-sans text-[clamp(1.65rem,4.2vw,3.15rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <span className="block text-[#C5A059]">{headlineLine1}</span>
            <span className="block text-dark-slate">{headlineLine2}</span>
          </h1>
        </header>

        <div className="lg:grid lg:grid-cols-12 lg:divide-x lg:divide-stone-200/90">
          <div className="border-b border-stone-200/90 py-8 sm:py-10 lg:col-span-4 lg:border-b-0 lg:py-12 lg:pr-8">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-dark-slate">{infoBlockTitle}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-warm-brown">{infoBlockSubtitle}</p>
          </div>

          <div className="space-y-8 border-b border-stone-200/90 py-8 sm:py-10 lg:col-span-4 lg:border-b-0 lg:py-12 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-steel-grey">{addressLabel}</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-dark-slate">{addressLines}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-steel-grey">{hoursLabel}</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-dark-slate">{hours}</p>
            </div>
          </div>

          <div className="py-8 sm:py-10 lg:col-span-4 lg:py-12 lg:pl-8">
            <a
              href={phoneHref}
              className="block text-2xl font-bold tracking-tight text-dark-slate transition-colors hover:text-warm-brown sm:text-3xl lg:text-4xl"
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="mt-4 block text-sm font-medium text-warm-brown underline-offset-4 hover:underline sm:text-base"
            >
              {email}
            </a>
          </div>
        </div>

        <footer className="border-t border-stone-200/90 pt-8 sm:pt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-warm-brown sm:text-base">{note}</p>
          <div className="mt-6">
            <Button href="/reservations" variant="primary">
              {reserveLabel}
            </Button>
          </div>
        </footer>
      </SectionContainer>
    </section>
  );
}
