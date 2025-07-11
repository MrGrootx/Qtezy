import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: quoteId } = await context.params;

    const isLiked = await db.query(
      `SELECT * FROM quote_likes WHERE user_id = $1 AND quote_id = $2`,
      [userId, quoteId]
    );

    if (isLiked.length > 0) {
      await db.query(
        `DELETE FROM quote_likes WHERE user_id = $1 AND quote_id = $2`,
        [userId, quoteId]
      );

      await db.query(
        `UPDATE quotes SET total_likes = total_likes - 1 WHERE id = $1`,
        [quoteId]
      );

      return NextResponse.json({
        message: "Like removed from quote",
        success: false,
      });
    } else {
      await db.query(
        `INSERT INTO quote_likes (user_id, quote_id) VALUES ($1, $2)`,
        [userId, quoteId]
      );

      await db.query(
        `UPDATE quotes SET total_likes = total_likes + 1 WHERE id = $1`,
        [quoteId]
      );

      return NextResponse.json({
        message: "You liked this quote!",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error liking quote:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
