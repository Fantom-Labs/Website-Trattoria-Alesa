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

export function buildWhatsAppUrl(prefilledMessage: string) {
  const e164 = getWhatsAppE164();
  if (!e164) return "#";
  const text = encodeURIComponent(prefilledMessage);
  return `https://wa.me/${e164}?text=${text}`;
}
