import { checkAdminStatus } from "@/lib/auth";
import db from "@/lib/db";
import { Quote } from "@/types/globals";
import { NextResponse } from "next/server";
import { z } from "zod";

const QuoteSchema = z.object({
  text: z.string().min(5, "Quote must be at least 5 characters long").trim(),
  author: z.string().min(2, "Author name is too short").trim(),
  category: z.string().min(2, "Category name is too short").trim(),
});

export async function POST(req: Request) {
  try {
    const isAdmin = await checkAdminStatus();

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body: Quote = await req.json();
    const parsedData = QuoteSchema.safeParse(body);

    if (!parsedData.success) {
      const messages = parsedData.error.issues.map((e) => e.message);
      return NextResponse.json({ error: messages }, { status: 400 });
    }

    const { text, author, category } = parsedData.data;
    const createdAt = new Date();
    const updatedAt = new Date();

    const result = await db.query(
      `INSERT INTO quotes (text, author, category, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [text, author, category, createdAt, updatedAt]
    );

    return NextResponse.json({
      message: "Quote created successfully",
      quote: result,
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { error: "Failed to create quote" },
      { status: 500 }
    );
  }
}
