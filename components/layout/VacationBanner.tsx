import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { ItalyFlag } from "@/components/layout/ItalyFlag";

export function VacationBanner({ message }: { message: string }) {
  return (
    <AnnouncementBanner>
      {message} <ItalyFlag /> ❤️
    </AnnouncementBanner>
  );
}
