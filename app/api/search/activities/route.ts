import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stopId = searchParams.get("stopId");

  try {
    if (stopId) {
      const activities = await prisma.activity.findMany({
        where: { stopId },
      });
      return NextResponse.json(activities);
    } else {
      const activities = await prisma.activity.findMany();
      const grouped = activities.reduce((acc: any, activity) => {
        if (!acc[activity.category]) acc[activity.category] = [];
        acc[activity.category].push(activity);
        return acc;
      }, {});
      return NextResponse.json(grouped);
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
