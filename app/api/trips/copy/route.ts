import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Copy a trip to user's account
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { publicId } = await req.json()
    const originalTrip = await prisma.trip.findUnique({
      where: { publicId, isPublic: true },
      include: {
        stops: { include: { activities: true } },
        budgets: true,
        packingItems: true,
      }
    })

    if (!originalTrip) return NextResponse.json({ error: "Trip not found" }, { status: 404 })

    const newTrip = await prisma.trip.create({
      data: {
        name: `Copy of ${originalTrip.name}`,
        description: originalTrip.description,
        startDate: originalTrip.startDate,
        endDate: originalTrip.endDate,
        coverPhoto: originalTrip.coverPhoto,
        userId: session.user.id,
        stops: {
          create: originalTrip.stops.map(stop => ({
            arrivalDate: stop.arrivalDate,
            departureDate: stop.departureDate,
            order: stop.order,
            cityId: stop.cityId,
            activities: {
              create: stop.activities.map(activity => ({
                name: activity.name,
                description: activity.description,
                category: activity.category,
                interest: activity.interest,
                cost: activity.cost,
                image: activity.image,
              }))
            }
          }))
        },
        budgets: {
          create: originalTrip.budgets.map(budget => ({
            category: budget.category,
            amount: budget.amount,
            limit: budget.limit,
          }))
        },
        packingItems: {
          create: originalTrip.packingItems.map(item => ({
            name: item.name,
            category: item.category,
            isChecked: false,
          }))
        }
      }
    })

    return NextResponse.json(newTrip)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
