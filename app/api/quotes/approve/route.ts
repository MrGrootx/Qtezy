import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROLE = "admin";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const { userId, sessionClaims } = await auth();

  const role = sessionClaims?.metadata.role;

  if (!userId) {
    return redirect("/sign-in");
  }
  if (!role || role !== ADMIN_ROLE) {
    return redirect("/unauthorized");
  }

  if (!id) {
    return NextResponse.json({ error: "Missing quote ID" }, { status: 400 });
  }

  try {
    await db.query(`UPDATE quotes SET status = 'approved' WHERE id = $1`, [id]);

    return NextResponse.json({ message: `Quote ${id} approved successfully.` });
  } catch (err) {
    console.error("DB Error approving quote:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
