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
    return redirect("/unauthorized")
  }

  if (!id) {
    return NextResponse.json({ error: "Missing quote ID" }, { status: 400 });
  }

  return NextResponse.json({ message: `Quote ${id} approved successfully.` });
}
