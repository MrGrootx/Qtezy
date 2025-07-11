import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const result = await db.query(
    "SELECT * FROM quotes ORDER BY created_at DESC"
  );
  return NextResponse.json(result);
}
