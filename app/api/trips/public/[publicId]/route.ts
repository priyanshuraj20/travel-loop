import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get public trip read-only
export async function GET(
  req: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  const { publicId } = await params;

  try {
    const trip = await prisma.trip.findUnique({
      where: { publicId, isPublic: true },
      include: {
        stops: {
          include: { city: true, activities: true },
          orderBy: { order: "asc" }
        },
        budgets: true,
      }
    })

    if (!trip) return NextResponse.json({ error: "Trip not found" }, { status: 404 })

    return NextResponse.json(trip)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
