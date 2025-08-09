// app/api/growth/route.ts
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { GrowthMoment } from "@/lib/models/JournalEntry";

// GET - Read all growth moments
export async function GET() {
  try {
    const db = await getDb("threshold");
    const growthMoments = await db
      .collection<GrowthMoment>("growth_moments")
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({
      success: true,
      data: growthMoments,
      count: growthMoments.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch growth moments" },
      { status: 500 }
    );
  }
}

// POST - Create new growth moment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb("threshold"); // runtime connect

    const growthMoment: Omit<GrowthMoment, "_id"> = {
      reflection: body.reflection,
      intention: body.intention,
      createdAt: new Date(),
    };

    const result = await db.collection("growth_moments").insertOne(growthMoment);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: "Your growth has been acknowledged",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save growth moment" },
      { status: 500 }
    );
  }
}

// PUT - Update growth moment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "Growth moment ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    const result = await db.collection("growth_moments").updateOne(
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
        { error: "Growth moment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Growth moment updated",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update growth moment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete growth moment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Growth moment ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb("threshold");
    const result = await db.collection("growth_moments").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Growth moment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Growth moment deleted",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete growth moment" },
      { status: 500 }
    );
  }
}
