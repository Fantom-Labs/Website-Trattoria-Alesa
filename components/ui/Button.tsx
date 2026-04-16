"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";

const palette = {
  primary:
    "bg-warm-brown text-cream hover:bg-dark-slate border border-transparent",
  secondary:
    "bg-transparent text-dark-slate border border-warm-brown hover:bg-warm-brown/10",
  ghost:
    "bg-transparent text-inherit border border-white/25 hover:bg-white/10",
  text: "bg-transparent text-inherit border-transparent underline-offset-4 hover:underline px-1 py-1 min-h-0 rounded-none",
} as const;

type Variant = keyof typeof palette;

type Base = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  fullWidth?: boolean;
};

type ButtonLocal = Base &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
    externalHref?: undefined;
  };

type LinkLocal = Base &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
    externalHref?: undefined;
  };

type ExternalLocal = Base &
  Omit<ComponentProps<"a">, "className" | "children" | "href"> & {
    externalHref: string;
    href?: undefined;
  };

export type ButtonProps = ButtonLocal | LinkLocal | ExternalLocal;

const stripKeys = ["className", "variant", "fullWidth", "children"] as const;

function filterDomProps(obj: object, extra: string[]) {
  const omit = new Set<string>([...stripKeys, ...extra]);
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>).filter(([k]) => !omit.has(k)),
  );
}

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary", fullWidth } = props;

  const base =
    "inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium tracking-wide transition-[color,background-color,border-color,opacity] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-brown sm:px-5";

  const classes = cn(base, palette[variant], fullWidth && "w-full", className);

  if ("externalHref" in props && props.externalHref) {
    const { externalHref } = props as ExternalLocal;
    const anchorProps = filterDomProps(props, ["externalHref"]) as ComponentProps<"a">;
    return (
      <a
        data-variant="external"
        href={externalHref}
        className={classes}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  if ("href" in props && props.href) {
    const { href } = props as LinkLocal;
    const linkProps = filterDomProps(props, ["href"]) as Omit<ComponentProps<typeof Link>, "href">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = filterDomProps(props, []) as ComponentProps<"button">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
