/** Fixed chat button (always this number, independent of env prefill). */
export const WHATSAPP_FLOATER_HREF = "https://wa.me/491785606754";

function cleanDigits(value: string | undefined) {
  if (!value) return "";
  return value.replace(/\D/g, "");
}

export function getWhatsAppE164() {
  return cleanDigits(process.env.NEXT_PUBLIC_WHATSAPP_E164);
}

export function getInstagramUrl() {
  const url = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  return url && url.length > 0 ? url : "";
}

const DRIVE_FILE_ID_IN_PATH = /\/file\/d\/([a-zA-Z0-9_-]+)/;

/** Accepts a raw file id or a full drive.google.com share URL. */
function resolveGoogleDriveFileId(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) return trimmed;
  const match = trimmed.match(DRIVE_FILE_ID_IN_PATH);
  return match?.[1] ?? null;
}

/** Public PDF on Drive: share "anyone with the link" as viewer, then set id or paste link in env. */
export function getMenuDrivePdfEmbed() {
  const id = resolveGoogleDriveFileId(process.env.NEXT_PUBLIC_MENU_DRIVE_FILE_ID);
  if (!id) return null;
  return {
    previewUrl: `https://drive.google.com/file/d/${id}/preview`,
    viewUrl: `https://drive.google.com/file/d/${id}/view`,
  };
}

export function buildWhatsAppUrl(prefilledMessage: string) {
  const e164 = getWhatsAppE164();
  if (!e164) return "#";
  const text = encodeURIComponent(prefilledMessage);
  return `https://wa.me/${e164}?text=${text}`;
}
