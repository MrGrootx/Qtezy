
import { NextResponse } from "next/server";
import db from "@/lib/db";

const allowedOrigins = [
  "https://qtezy-pi3vhxoiy-groots-projects-1e5b1bd8.vercel.app",
  "http://localhost:3000"
];

function withCORS(response: NextResponse, reqOrigin?: string) {
  const origin = reqOrigin && allowedOrigins.includes(reqOrigin) ? reqOrigin : allowedOrigins[0];
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function GET(request: Request) {
  const reqOrigin = request.headers.get("origin") || undefined;
  try {
    const result = await db`
      SELECT * FROM quotes
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `;
    return withCORS(NextResponse.json({ success: true, data: result }), reqOrigin);
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return withCORS(
      NextResponse.json(
        { success: false, message: "Error fetching quotes" },
        { status: 500 }
      ),
      reqOrigin
    );
  }
}

export async function OPTIONS(request: Request) {
  const reqOrigin = request.headers.get("origin") || undefined;
  // Handle preflight requests
  return withCORS(new NextResponse(null, { status: 204 }), reqOrigin);
}
