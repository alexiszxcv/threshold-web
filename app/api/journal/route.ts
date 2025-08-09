// app/api/journal/route.ts
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { JournalEntry } from "@/lib/models/JournalEntry";

// GET - Read journal entries
export async function GET() {
  try {
    const db = await getDb("threshold"); // runtime connect
    const entries = await db
      .collection<JournalEntry>("journal_entries")
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json({
      success: true,
      data: entries,
      count: entries.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

// POST - Create new journal entry
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

// PUT - Update journal entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "Journal entry ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    const result = await db.collection("journal_entries").updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Journal entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Journal entry updated",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update journal entry" },
      { status: 500 }
    );
  }
}

// DELETE - Delete journal entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Journal entry ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    const result = await db.collection("journal_entries").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Journal entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Journal entry deleted",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete journal entry" },
      { status: 500 }
    );
  }
}
