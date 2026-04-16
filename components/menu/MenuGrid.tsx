import { SectionContainer } from "@/components/layout/SectionContainer";
import { Divider } from "@/components/layout/Divider";
import { getTranslations } from "next-intl/server";

type ItemKey = "0" | "1" | "2";

async function Column({
  title,
  section,
  keys,
}: {
  title: string;
  section: "pasta" | "pizza" | "specials";
  keys: readonly ItemKey[];
}) {
  const t = await getTranslations("Menu");

  return (
    <div className="min-w-0 space-y-6">
      <h2 className="font-display text-2xl tracking-wide text-dark-slate">{title}</h2>
      <Divider />
      <ul className="space-y-8">
        {keys.map((k) => (
          <li key={k} className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-semibold text-dark-slate">
                {t(`${section}.${k}.name`)}
              </h3>
              <span className="shrink-0 text-sm font-medium text-warm-brown">
                {t(`${section}.${k}.price`)}
              </span>
            </div>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-warm-brown/90">
              {t(`${section}.${k}.desc`)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const itemKeys = ["0", "1", "2"] as const;

export async function MenuGrid() {
  const t = await getTranslations("Menu");

  return (
    <SectionContainer className="grid gap-14 py-6 lg:grid-cols-3 lg:gap-10">
      <Column title={t("pastaTitle")} section="pasta" keys={itemKeys} />
      <Column title={t("pizzaTitle")} section="pizza" keys={itemKeys} />
      <Column title={t("specialsTitle")} section="specials" keys={itemKeys} />
    </SectionContainer>
  );
}
