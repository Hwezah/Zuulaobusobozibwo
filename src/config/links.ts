/**
 * Single source of truth for outbound links and social handles.
 * Import these rather than hard-coding URLs anywhere else.
 */
export const LINKS = {
  whatsappGroup: "https://chat.whatsapp.com/JMpHuFJxL3E1zuDEmOlOBo", // Free Community
  telegramGroup: "https://t.me/+tyZUUf-azbM1NzQ0", // Inner Circle
  youtube: "https://www.youtube.com/@zuulaobusobozibwo1433",
};

export const SOCIALS = {
  youtube: "https://www.youtube.com/@zuulaobusobozibwo1433",
  tiktok: "https://www.tiktok.com/@zuulaobusobozibwo",
  whatsapp: "https://wa.me/256777667080", // direct chat with 0777 667 080
  facebook: "https://facebook.com/ZuulaObusobozibwo",
  telegram: "https://t.me/+tyZUUf-azbM1NzQ0",
};

/** Open a URL in a new tab with no opener. No-op during SSR. */
export function openUrl(u: string) {
  if (typeof window !== "undefined") window.open(u, "_blank", "noopener");
}
