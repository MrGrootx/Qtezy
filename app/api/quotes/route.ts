import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db`
      SELECT * FROM quotes
      WHERE status = 'approved'
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching quotes" },
      { status: 500 }
    );
  }
}
