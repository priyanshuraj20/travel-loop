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
    const totalCountries = new Set(stopsWithCities.map((s) => s.city.country))
      .size;

    const totalBudget = await prisma.budget.aggregate({
      where: { trip: { userId } },
      _sum: { amount: true },
    });

    const cityCount = await prisma.city.count();
    const recommendedDestinations = await prisma.city.findMany({
      take: 5,
      skip: Math.max(0, Math.floor(Math.random() * (cityCount - 5))),
    });

    const recentTrips = await prisma.trip.findMany({
      where: { userId },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: {
        stops: {
          include: {
            activities: { take: 3, orderBy: { createdAt: "desc" } },
            city: true,
          },
        },
      },
    });

    const recentActivities = await prisma.activity.findMany({
      where: { stop: { trip: { userId } } },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        stop: {
          include: {
            trip: true,
            city: true,
          },
        },
      },
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

    const budgetSummary = await prisma.budget.groupBy({
      by: ["category"],
      where: { trip: { userId } },
      _sum: { amount: true, limit: true },
    });

    const totalActivities = await prisma.activity.count({
      where: { stop: { trip: { userId } } },
    });

    const totalCitiesVisited = await prisma.stop.count({
      where: { trip: { userId } },
      select: { cityId: true },
    });

    const monthlyStats = await prisma.trip.groupBy({
      by: ["startDate"],
      where: { userId },
      _count: true,
      orderBy: { startDate: "desc" },
      take: 12,
    });

    const topDestinationsRaw = await prisma.stop.groupBy({
      by: ["cityId"],
      where: { trip: { userId } },
      _count: true,
      orderBy: { _count: { cityId: "desc" } },
      take: 5,
    });

    const topDestinations = await Promise.all(
      topDestinationsRaw.map(async (dest) => {
        const city = await prisma.city.findUnique({
          where: { id: dest.cityId },
        });
        return {
          ...dest,
          city,
        };
      }),
    );

    return NextResponse.json({
      upcomingTrips,
      popularCities,
      recentTrips,
      recentActivities,
      stats: {
        totalTrips,
        totalCountries,
        totalBudget: totalBudget._sum.amount || 0,
        totalActivities,
        totalCitiesVisited: totalCitiesVisited.cityId,
        monthlyTrips: monthlyStats.length,
      },
      recommendedDestinations,
      budgetHighlights,
      budgetSummary,
      topDestinations,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
