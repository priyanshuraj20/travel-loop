import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Get trip notes
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

    const notes = await prisma.note.findMany({
      where: { tripId },
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Add trip note
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: tripId } = await params;

  try {
    const { content } = await req.json()
    const trip = await prisma.trip.findUnique({ where: { id: tripId } })
    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Trip not found or unauthorized" }, { status: 404 })
    }

    const note = await prisma.note.create({
      data: { content, tripId }
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
