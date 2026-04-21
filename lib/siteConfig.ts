/** Used by `buildWhatsAppUrl` when `NEXT_PUBLIC_WHATSAPP_E164` is unset (matches legacy floater default). */
const WHATSAPP_E164_FALLBACK = "491785606754";

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
  const e164 = getWhatsAppE164() || WHATSAPP_E164_FALLBACK;
  const text = encodeURIComponent(prefilledMessage.trim());
  return `https://wa.me/${e164}?text=${text}`;
}

/** Google “Embed a map” iframe `src` (Restaurant Alesa). Override with `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`. */
const CONTACT_MAPS_EMBED_DEFAULT =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2651.631918502919!2d10.9442765!3d48.34837989999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e982df64d055f%3A0x873f053ee75a8fc6!2sRestaurant%20Alesa!5e0!3m2!1spt-BR!2sbr!4v1776738241523!5m2!1spt-BR!2sbr";

/** Same place in the full Maps web app (new tab). */
const CONTACT_MAPS_LINK_DEFAULT =
  "https://www.google.com/maps/search/?api=1&query=Restaurant+Alesa+Augsburg";

/** `src` for the contact page map iframe. */
export function getContactMapIframeSrc() {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim();
  if (fromEnv) return fromEnv.replace(/^["']|["']$/g, "");
  return CONTACT_MAPS_EMBED_DEFAULT;
}

/** Link for “Open in Google Maps” (new tab). */
export function getContactMapExternalUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK_URL?.trim();
  if (fromEnv) return fromEnv.replace(/^["']|["']$/g, "");
  return CONTACT_MAPS_LINK_DEFAULT;
}
