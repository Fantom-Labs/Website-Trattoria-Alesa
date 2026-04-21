"use client";

import { usePathname } from "@/i18n/navigation";
import type { ReactNode } from "react";

/**
 * Esconde o footer global na página Menu para a rolagem ficar só no iframe do PDF
 * (sem “competir” com o scroll da página).
 */
export function SiteFooterMenuGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/menu" || pathname.startsWith("/menu/")) return null;
  return children;
}
