import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string, itemId: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { itemId } = await params;

  try {
    const { isChecked } = await req.json()
    const item = await prisma.packingItem.findUnique({
      where: { id: itemId },
      include: { trip: true }
    })

    if (!item || item.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Item not found or unauthorized" }, { status: 404 })
    }

    const updated = await prisma.packingItem.update({
      where: { id: itemId },
      data: { isChecked }
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string, itemId: string }> }
) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { itemId } = await params;

  try {
    const item = await prisma.packingItem.findUnique({
      where: { id: itemId },
      include: { trip: true }
    })

    if (!item || item.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Item not found or unauthorized" }, { status: 404 })
    }

    await prisma.packingItem.delete({ where: { id: itemId } })
    return NextResponse.json({ message: "Item deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
