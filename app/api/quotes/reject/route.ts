// reject route

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  console.log("Rejecting quote with ID:", id);
  
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  if (!id) {
    return NextResponse.json({ error: "Missing quote ID" }, { status: 400 });
  }

  try {
    await db.query(`UPDATE quotes SET status = 'rejected' WHERE id = $1`, [id]);

    return NextResponse.json({ message: `Quote rejected successfully.` });
  } catch (error) {
    console.error("DB Error rejecting quote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
