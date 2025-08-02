// app/api/journal/route.ts
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { JournalEntry } from "@/lib/models/JournalEntry";

export async function GET() {
  try {
    const db = await getDb("threshold"); // runtime connect
    const entries = await db
      .collection<JournalEntry>("journal_entries")
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb("threshold"); // runtime connect

    const entry: Omit<JournalEntry, "_id"> = {
      content: body.content,
      timestamp: body.timestamp ?? new Date().toISOString(),
      mood: body.mood,
      isAnonymous: body.isAnonymous ?? true,
      underlines: 0,
      marginNotes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("journal_entries").insertOne(entry);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Entry added to the communal journal",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}
