// app/api/growth/route.ts
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { GrowthMoment } from "@/lib/models/JournalEntry";

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
