import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: tripId } = await params;

  try {
    const stops = await prisma.stop.findMany({
      where: { tripId },
      include: { city: true, activities: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(stops);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: tripId } = await params;

  try {
    const { cityId, arrivalDate, departureDate, order } = await req.json();

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    const stop = await prisma.stop.create({
      data: {
        tripId,
        cityId,
        arrivalDate: new Date(arrivalDate),
        departureDate: new Date(departureDate),
        order,
      },
    });

    return NextResponse.json(stop, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
