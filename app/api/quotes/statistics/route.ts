import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getTotalQuotes = await db.query(`
        SELECT COUNT(*) AS total FROM quotes;`);
    const getPendingQuotes = await db.query(`
        SELECT COUNT(*) AS total FROM quotes WHERE status = 'pending';`);
    const getApprovedQuotes = await db.query(`
        SELECT COUNT(*) AS total FROM quotes WHERE status = 'approved';`);

    return NextResponse.json({
      total_quotes: getTotalQuotes[0].total,
      pending_quotes: getPendingQuotes[0].total,
      approved_quotes: getApprovedQuotes[0].total,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
