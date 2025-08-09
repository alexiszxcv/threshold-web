// app/api/letters/route.ts
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Letter } from "@/lib/models/JournalEntry";

// GET - Read letters (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeContent = searchParams.get('includeContent') === 'true';
    
    const db = await getDb("threshold");
    
    if (includeContent) {
      // Return full letters with content
      const letters = await db
        .collection<Letter>("letters")
        .find({})
        .sort({ createdAt: -1 })
        .limit(20)
        .toArray();
      
      return NextResponse.json({
        success: true,
        data: letters,
        count: letters.length
      });
    } else {
      // Return just count for privacy
      const count = await db.collection("letters").countDocuments();
      return NextResponse.json({
        count,
        message: `${count} letters have been written in this space`,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get letters" },
      { status: 500 }
    );
  }
}

// POST - Create new letter
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

// PUT - Update letter (mark as sent, edit content, etc.)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "Letter ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    
    // If marking as sent, add sentAt timestamp
    if (updateData.isUnsent === false && !updateData.sentAt) {
      updateData.sentAt = new Date();
    }
    
    const result = await db.collection("letters").updateOne(
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
        { error: "Letter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: updateData.isUnsent === false ? "Letter sent" : "Letter updated",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update letter" },
      { status: 500 }
    );
  }
}

// DELETE - Delete letter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Letter ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    const result = await db.collection("letters").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Letter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Letter deleted",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete letter" },
      { status: 500 }
    );
  }
}
