export const dynamic = "force-dynamic"; // prevents static optimization

import { type NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Confession } from "@/lib/models/JournalEntry";

// GET - Read all confessions
export async function GET() {
  try {
    const db = await getDb("threshold");
    const confessions = await db
      .collection<Confession>("confessions")
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({
      success: true,
      data: confessions,
      count: confessions.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch confessions" },
      { status: 500 }
    );
  }
}

// POST - Create new confession
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb("threshold");         // runtime connect

    const confession: Omit<Confession, "_id"> = {
      duration: body.duration ?? 0,
      timestamp: new Date().toISOString(),
      createdAt: new Date(),
    };

    const result = await db.collection("confessions").insertOne(confession);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Your voice has been heard and released",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record confession" },
      { status: 500 }
    );
  }
}

// PUT - Update confession (for admin purposes)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "Confession ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    const result = await db.collection("confessions").updateOne(
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
        { error: "Confession not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Confession updated",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update confession" },
      { status: 500 }
    );
  }
}

// DELETE - Delete confession
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Confession ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    const result = await db.collection("confessions").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Confession not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Confession deleted",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete confession" },
      { status: 500 }
    );
  }
}
