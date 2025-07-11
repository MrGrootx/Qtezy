import { headers } from "next/headers";

export async function getClientIp() {
  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "127.0.0.1";
  return ip;
}
