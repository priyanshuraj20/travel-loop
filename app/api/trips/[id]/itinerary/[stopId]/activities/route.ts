import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ stopId: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { stopId } = await params;

  try {
    const activities = await prisma.activity.findMany({
      where: { stopId },
    });
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ stopId: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { stopId } = await params;

  try {
    const body = await req.json();
    const stop = await prisma.stop.findUnique({
      where: { id: stopId },
      include: { trip: true },
    });

    if (!stop || stop.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    const activity = await prisma.activity.create({
      data: {
        ...body,
        stopId,
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
