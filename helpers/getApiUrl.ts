export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_VERCEL_ENV! === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`
    : "http://localhost:3000";
}
