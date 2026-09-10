import type { ReactNode } from "react";

import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";

export function SchoolBanner({ message }: { message: ReactNode }) {
  return <AnnouncementBanner>{message}</AnnouncementBanner>;
}
