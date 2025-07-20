import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  try {
    const result =  await db`SELECT * FROM quotes WHERE user_id = ${userId}`;
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching quotes" },
      { status: 500 }
    );
  }
}
