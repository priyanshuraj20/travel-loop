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
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    const budgets = await prisma.budget.findMany({
      where: { tripId },
    });
    return NextResponse.json(budgets);
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
    const { category, amount, limit } = await req.json();

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    const budget = await prisma.budget.create({
      data: {
        tripId,
        category,
        amount: parseFloat(amount) || 0,
        limit: parseFloat(limit) || 0,
      },
    });

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: tripId } = await params;

  try {
    const { budgetId, amount, limit } = await req.json();

    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
      include: { trip: true },
    });

    if (!budget || budget.trip.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden or Not Found" }, { status: 403 });
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId },
      data: {
        amount: amount !== undefined ? parseFloat(amount) : undefined,
        limit: limit !== undefined ? parseFloat(limit) : undefined,
      },
    });

    return NextResponse.json(updatedBudget);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
