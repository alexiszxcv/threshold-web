export const dynamic = "force-dynamic"; // prevents static optimization

import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { Confession } from "@/lib/models/JournalEntry";

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
