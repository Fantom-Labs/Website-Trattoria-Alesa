import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionEnter } from "@/components/reveal/SectionEnter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatarAlt: string;
};

/** Retratos Unsplash (crop 128) — alinhados por índice com `items`. */
const PORTRAIT_URLS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&h=128&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&h=128&q=80",
] as const;

function fallbackInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "?";
}

export function TestimonialSection({
  title,
  items,
}: {
  title: string;
  items: TestimonialItem[];
}) {
  return (
    <section
      data-header-theme="brown"
      className="border-t border-warm-brown/15 bg-cream py-20 sm:py-24"
    >
      <SectionContainer>
        <SectionEnter className="mb-12 text-left">
          <h2 className="font-display text-3xl tracking-wide text-dark-slate sm:text-4xl">{title}</h2>
        </SectionEnter>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {items.map((item, index) => (
            <SectionEnter key={`testimonial-${index}`} delay={0.06 + index * 0.05}>
              <blockquote className="relative max-w-xl pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-full before:bg-[#C5A059]">
                <p className="text-lg leading-relaxed text-dark-slate">{item.quote}</p>
                <footer className="mt-4 flex flex-wrap items-center gap-2">
                  <Avatar className="size-8 shrink-0 border border-transparent shadow ring-1 ring-dark-slate/10">
                    <AvatarImage
                      src={PORTRAIT_URLS[index] ?? PORTRAIT_URLS[0]}
                      alt={item.avatarAlt}
                    />
                    <AvatarFallback>{fallbackInitials(item.name)}</AvatarFallback>
                  </Avatar>
                  <cite className="not-italic text-sm font-medium text-dark-slate">{item.name}</cite>
                  <span aria-hidden className="size-1 shrink-0 rounded-full bg-dark-slate/15" />
                  <span className="text-sm text-steel-grey">{item.role}</span>
                </footer>
              </blockquote>
            </SectionEnter>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
