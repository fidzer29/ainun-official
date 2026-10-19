const LOCAL_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const platformUrl = vercelProductionUrl
    ? /^https?:\/\//i.test(vercelProductionUrl)
      ? vercelProductionUrl
      : `https://${vercelProductionUrl}`
    : "";
  const resolvedUrl = configuredUrl || platformUrl;

  if (!resolvedUrl && process.env.NODE_ENV === "production") {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL to the public site origin for production builds.",
    );
  }

  const siteUrl = new URL(resolvedUrl || LOCAL_SITE_URL);

  if (!["http:", "https:"].includes(siteUrl.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
  }

  return new URL(siteUrl.origin);
}
