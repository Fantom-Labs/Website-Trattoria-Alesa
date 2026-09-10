import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";

export function SchoolBanner({ message }: { message: string }) {
  return <AnnouncementBanner>{message}</AnnouncementBanner>;
}
