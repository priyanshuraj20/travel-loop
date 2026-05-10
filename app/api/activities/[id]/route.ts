import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const activity = await prisma.activity.findUnique({
      where: { id },
      include: { stop: { include: { trip: true } } },
    });

    if (!activity || activity.stop.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    const updatedActivity = await prisma.activity.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedActivity);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const activity = await prisma.activity.findUnique({
      where: { id },
      include: { stop: { include: { trip: true } } },
    });

    if (!activity || activity.stop.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    await prisma.activity.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
