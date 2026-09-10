import type { ReactNode } from "react";

export function AnnouncementBanner({ children }: { children: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-dark-slate px-4 py-2.5 text-center text-xs leading-relaxed text-cream sm:text-sm"
    >
      {children}
    </div>
  );
}
