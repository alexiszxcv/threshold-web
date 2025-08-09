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
export async function POST(request: Request) {
  try {
    const { content, duration } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return Response.json({ error: 'Content is required and must be a string' }, { status: 400 });
    }
    
    if (!duration || !['temporary', 'permanent'].includes(duration)) {
      return Response.json({ error: 'Duration must be either "temporary" or "permanent"' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('confessions').insertOne({
      content,
      duration,
      createdAt: new Date(),
      ...(duration === 'temporary' && { expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) })
    });

    return Response.json({ 
      id: result.insertedId, 
      content, 
      duration, 
      createdAt: new Date().toISOString() 
    }, { status: 201 });
  } catch (error) {
    console.error('Error recording confession:', error);
    return Response.json({ 
      error: 'Failed to record confession',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : '') : undefined
    }, { status: 500 });
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
