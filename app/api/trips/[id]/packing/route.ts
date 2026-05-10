import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get packing checklist
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: tripId } = await params;

  try {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Trip not found or unauthorized" }, { status: 404 })
    }

    const items = await prisma.packingItem.findMany({ where: { tripId } })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Add packing item
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: tripId } = await params;

  try {
    const { name, category } = await req.json()
    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Trip not found or unauthorized" }, { status: 404 })
    }

    const item = await prisma.packingItem.create({
      data: { name, category, tripId }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
