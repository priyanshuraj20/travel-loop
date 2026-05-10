import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Toggle public status of a trip
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params;

  try {
    const { isPublic } = await req.json()
    const trip = await prisma.trip.findUnique({ where: { id } })

    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Trip not found or unauthorized" }, { status: 404 })
    }

    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: { isPublic },
    })

    return NextResponse.json(updatedTrip)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
