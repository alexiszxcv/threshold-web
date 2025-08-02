// app/api/letters/route.ts
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { Letter } from "@/lib/models/JournalEntry";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb("threshold"); // runtime connect

    const letter: Omit<Letter, "_id"> = {
      content: body.content,
      recipient: body.recipient,
      createdAt: new Date(),
      isUnsent: true,
    };

    const result = await db.collection("letters").insertOne(letter);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Letter written and safely stored (unsent)",
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to save letter" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb("threshold"); // runtime connect
    const count = await db.collection("letters").countDocuments();

    return NextResponse.json({
      count,
      message: `${count} letters have been written in this space`,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to get letter count" },
      { status: 500 }
    );
  }
}
