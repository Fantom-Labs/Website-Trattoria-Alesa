import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionEnter } from "@/components/reveal/SectionEnter";
import Image from "next/image";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatarAlt: string;
};

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
        <SectionEnter className="mb-12 text-center">
          <h2 className="text-[18px] font-bold uppercase leading-relaxed tracking-normal text-steel-grey">
            {title}
          </h2>
        </SectionEnter>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {items.map((item, index) => (
            <SectionEnter key={`testimonial-${index}`} delay={0.06 + index * 0.05}>
              <blockquote className="relative max-w-xl pl-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-full before:bg-[#C5A059]">
                <p className="text-lg leading-relaxed text-dark-slate">{item.quote}</p>
                <footer className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-white shadow ring-1 ring-dark-slate/10">
                    <Image
                      src="/Tripadvisor-Logo.png"
                      alt={item.avatarAlt}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </span>
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
