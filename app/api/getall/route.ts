import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
   
  try {
    const result = await db`
         SELECT * FROM quotes 
      `;
      
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
   //  console.error("Failed to fetch quotes:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching quotes" },
      { status: 500 }
    );
  }
}
