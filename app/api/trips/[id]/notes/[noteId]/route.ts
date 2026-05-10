import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string, noteId: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { noteId } = await params;

  try {
    const { content } = await req.json()
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      include: { trip: true }
    })

    if (!note || note.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 })
    }

    const updated = await prisma.note.update({
      where: { id: noteId },
      data: { content }
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, noteId: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { noteId } = await params;

  try {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      include: { trip: true }
    })

    if (!note || note.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Note not found or unauthorized" }, { status: 404 })
    }

    await prisma.note.delete({ where: { id: noteId } })
    return NextResponse.json({ message: "Note deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
