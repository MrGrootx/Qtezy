import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return new Response("Hello from the API route");
}
