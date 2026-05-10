import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const totalTrips = await prisma.trip.count()
    const totalUsers = await prisma.user.count()
    
    const topCities = await prisma.city.findMany({
      include: { _count: { select: { stops: true } } },
      orderBy: { stops: { _count: "desc" } },
      take: 5,
    })

    const recentTrips = await prisma.trip.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } }
    })

    return NextResponse.json({
      stats: {
        totalTrips,
        totalUsers,
      },
      topCities,
      recentTrips,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
