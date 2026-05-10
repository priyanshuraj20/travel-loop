import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string, stopId: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: tripId, stopId } = await params;

  try {
    const body = await req.json();
    const stop = await prisma.stop.findUnique({
      where: { id: stopId },
      include: { trip: true },
    });

    if (!stop || stop.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    const updatedStop = await prisma.stop.update({
      where: { id: stopId },
      data: {
        ...body,
        arrivalDate: body.arrivalDate ? new Date(body.arrivalDate) : undefined,
        departureDate: body.departureDate ? new Date(body.departureDate) : undefined,
      },
    });

    return NextResponse.json(updatedStop);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, stopId: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { stopId } = await params;

  try {
    const stop = await prisma.stop.findUnique({
      where: { id: stopId },
      include: { trip: true },
    });

    if (!stop || stop.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    await prisma.stop.delete({ where: { id: stopId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
