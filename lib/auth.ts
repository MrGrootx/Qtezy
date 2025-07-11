"use server";

import { auth } from "@clerk/nextjs/server";

export async function checkAdminStatus(): Promise<boolean> {
  try {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return false;
    }

    const privateMetadata = sessionClaims?.metadata as
      | { role?: string }
      | undefined;
    const userRole = privateMetadata?.role;

    return userRole === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

export async function getCurrentUserRole(): Promise<string | null> {
  try {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return null;
    }

    const privateMetadata = sessionClaims?.metadata as
      | { role?: string }
      | undefined;
    return privateMetadata?.role || "Member";
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}
