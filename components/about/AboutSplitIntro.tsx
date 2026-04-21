import { cn } from "@/lib/utils";
import Image from "next/image";

function AboutStamp({ className }: { className?: string }) {
  return (
    <Image
      src="/stamp.svg"
      alt=""
      width={303}
      height={306}
      unoptimized
      className={cn("h-auto w-36 max-w-full lg:w-[200px]", className)}
      aria-hidden
    />
  );
}

export type AboutSplitIntroProps = {
  heading: string;
  body: string;
  imageAlt: string;
};

/**
 * Secção editorial 50/50: texto em fundo neutro + imagem, selo na junção (desktop).
 */
export function AboutSplitIntro({ heading, body, imageAlt }: AboutSplitIntroProps) {
  return (
    <section className="relative" data-header-theme="brown">
      <div className="grid min-h-0 grid-cols-1 lg:grid-cols-2 lg:min-h-[min(90dvh,52rem)]">
        <div className="order-2 flex flex-col justify-center bg-[#F5F5F5] px-6 py-14 sm:px-10 sm:py-20 lg:order-1 lg:px-14 lg:py-24 xl:px-20">
          <div className="mb-8 flex justify-center lg:hidden">
            <AboutStamp />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-dark-slate sm:text-[15px]">
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">{body}</p>
        </div>

        <div className="relative order-1 min-h-[min(52vw,22rem)] w-full sm:min-h-[min(48vw,26rem)] lg:order-2 lg:min-h-0">
          <Image
            src="/images/img-2.png"
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[18%] z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <AboutStamp />
      </div>
    </section>
  );
}
