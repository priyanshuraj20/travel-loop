import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const now = new Date();

  try {
    const upcomingTrips = await prisma.trip.findMany({
      where: {
        userId,
        startDate: { gt: now },
      },
      take: 3,
      orderBy: { startDate: "asc" },
    });

    const popularCities = await prisma.city.findMany({
      take: 5,
      orderBy: { popularity: "desc" },
    });

    const totalTrips = await prisma.trip.count({ where: { userId } });
    
    // Total unique countries visited
    const stopsWithCities = await prisma.stop.findMany({
      where: { trip: { userId } },
      select: { city: { select: { country: true } } },
    });
    const totalCountries = new Set(stopsWithCities.map((s) => s.city.country)).size;

    const totalBudget = await prisma.budget.aggregate({
      where: { trip: { userId } },
      _sum: { amount: true },
    });

    const cityCount = await prisma.city.count();
    const recommendedDestinations = await prisma.city.findMany({
      take: 5,
      skip: Math.max(0, Math.floor(Math.random() * (cityCount - 5))),
    });

    const activeTrips = await prisma.trip.findMany({
      where: {
        userId,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      include: { budgets: true },
    });

    const budgetHighlights = activeTrips.map((trip) => ({
      tripName: trip.name,
      totalAmount: trip.budgets.reduce((sum, b) => sum + b.amount, 0),
      totalLimit: trip.budgets.reduce((sum, b) => sum + b.limit, 0),
    }));

    return NextResponse.json({
      upcomingTrips,
      popularCities,
      stats: {
        totalTrips,
        totalCountries,
        totalBudget: totalBudget._sum.amount || 0,
      },
      recommendedDestinations,
      budgetHighlights,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
