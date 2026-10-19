export const INSTAGRAM_URL =
  "https://www.instagram.com/ainunoffic?vrfl=cmYyd2liMm5ocDI4&utm_source=qr";
export const TIKTOK_URL =
  "https://www.tiktok.com/@ainunofficial2025?_r=1&_t=ZS-9AeRfFTORi4";
export const WHATSAPP_PHONE = "6285862727221";
export const SHOPEE_URL = "https://id.shp.ee/GSoHqvfT";

export function getWhatsAppUrl(message = "") {
  const url = new URL("https://api.whatsapp.com/send/");
  url.searchParams.set("phone", WHATSAPP_PHONE);
  url.searchParams.set("text", message);
  url.searchParams.set("type", "phone_number");
  url.searchParams.set("app_absent", "0");
  return url.toString();
}
