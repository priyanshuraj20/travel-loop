"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stop {
  id: string;
  city: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  activities: Activity[];
  transport: string;
  hotel: string;
  notes: string;
}

interface Activity {
  id: string;
  name: string;
  category: string;
  cost: number;
}

interface Trip {
  id: string;
  name: string;
  description: string;
  totalBudget: number;
  stops: Stop[];
}

// Mock data for demonstration
const mockTrip: Trip = {
  id: "trip-1",
  name: "Summer in Europe",
  description: "A 14-day adventure through Western Europe",
  totalBudget: 3500,
  stops: [
    {
      id: "stop-1",
      city: "Paris",
      country: "France",
      arrivalDate: "2024-07-01",
      departureDate: "2024-07-05",
      activities: [
        {
          id: "act-1",
          name: "Eiffel Tower Visit",
          category: "Sightseeing",
          cost: 85,
        },
        { id: "act-2", name: "Louvre Museum", category: "Culture", cost: 120 },
        {
          id: "act-3",
          name: "Seine River Cruise",
          category: "Adventure",
          cost: 65,
        },
      ],
      transport: "Flight from NYC (JFK to CDG)",
      hotel: "Hotel de Ville - $450/night",
      notes: "Don't forget beret and croissant cravings",
    },
    {
      id: "stop-2",
      city: "Barcelona",
      country: "Spain",
      arrivalDate: "2024-07-05",
      departureDate: "2024-07-10",
      activities: [
        {
          id: "act-4",
          name: "Sagrada Familia",
          category: "Sightseeing",
          cost: 95,
        },
        { id: "act-5", name: "Park Güell", category: "Nature", cost: 40 },
        { id: "act-6", name: "Tapas Tour", category: "Food", cost: 75 },
      ],
      transport: "Train from Paris (TGV)",
      hotel: "Casa Mila Boutique - $380/night",
      notes: "Siesta time is sacred",
    },
    {
      id: "stop-3",
      city: "Rome",
      country: "Italy",
      arrivalDate: "2024-07-10",
      departureDate: "2024-07-14",
      activities: [
        { id: "act-7", name: "Colosseum Tour", category: "Culture", cost: 110 },
        {
          id: "act-8",
          name: "Vatican Museums",
          category: "Sightseeing",
          cost: 85,
        },
        { id: "act-9", name: "Pizza Making Class", category: "Food", cost: 55 },
      ],
      transport: "Flight from Barcelona (BCN to FCO)",
      hotel: "Trevi Palace - $420/night",
      notes: "Gelato every day",
    },
  ],
};

export default function ItineraryPage() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrip(mockTrip);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Loading your itinerary...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="book-card p-8 text-center">
          <p className="text-xl italic font-serif text-muted mb-4">
            No itinerary found
          </p>
          <Link href="/trips/create" className="ink-link">
            Create a new trip
          </Link>
        </div>
      </div>
    );
  }

  const totalActivitiesCost = trip.stops.reduce(
    (sum, stop) =>
      sum + stop.activities.reduce((actSum, act) => actSum + act.cost, 0),
    0,
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 fade-in">
      {/* Header */}
      <header className="mb-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl mb-2">{trip.name}</h1>
            <p className="text-lg text-muted italic font-serif">
              {trip.description}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${trip.totalBudget.toLocaleString()}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">
              Total Budget
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 bg-page/50 rounded-sm p-6 border border-border">
          <div className="text-center">
            <div className="text-xl font-bold">{trip.stops.length}</div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">
              Destinations
            </div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-xl font-bold">
              {trip.stops.reduce(
                (sum, stop) => sum + stop.activities.length,
                0,
              )}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">
              Activities
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">${totalActivitiesCost}</div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">
              Activities Cost
            </div>
          </div>
        </div>
      </header>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>

        <div className="space-y-8">
          {trip.stops.map((stop, index) => (
            <div key={stop.id} className="relative flex items-start">
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-page hidden md:block"></div>

              {/* Stop Card */}
              <div className="ml-0 md:ml-16 w-full">
                <div className="book-card p-6">
                  {/* Stop Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl mb-1">
                        {stop.city}, {stop.country}
                      </h3>
                      <p className="text-muted italic font-serif">
                        {new Date(stop.arrivalDate).toLocaleDateString()} -{" "}
                        {new Date(stop.departureDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-muted hover:text-primary transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Transport */}
                  <div className="mb-6">
                    <h4 className="text-lg font-serif italic mb-2 border-b border-border pb-1">
                      Transport
                    </h4>
                    <p className="text-muted">{stop.transport}</p>
                  </div>

                  {/* Hotel */}
                  <div className="mb-6">
                    <h4 className="text-lg font-serif italic mb-2 border-b border-border pb-1">
                      Accommodation
                    </h4>
                    <p className="text-muted">{stop.hotel}</p>
                  </div>

                  {/* Activities */}
                  <div className="mb-6">
                    <h4 className="text-lg font-serif italic mb-4 border-b border-border pb-1">
                      Activities
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stop.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="bg-page/50 p-4 rounded border border-border"
                        >
                          <h5 className="font-bold mb-1">{activity.name}</h5>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted">
                              {activity.category}
                            </span>
                            <span className="font-bold text-primary">
                              ${activity.cost}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {stop.notes && (
                    <div>
                      <h4 className="text-lg font-serif italic mb-2 border-b border-border pb-1">
                        Notes
                      </h4>
                      <p className="text-muted italic">{stop.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Stop Button */}
        <div className="mt-12 text-center">
          <button className="primary text-lg px-8 py-4">+ Add New Stop</button>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="mt-12 book-card p-8">
        <h2 className="text-2xl mb-6">Budget Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              ${totalActivitiesCost}
            </div>
            <div className="text-sm uppercase tracking-widest text-muted font-serif">
              Activities
            </div>
          </div>
          <div className="text-center border-x border-border">
            <div className="text-3xl font-bold text-primary mb-2">
              ${Math.round(trip.totalBudget * 0.4)}
            </div>
            <div className="text-sm uppercase tracking-widest text-muted font-serif">
              Transport
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              ${Math.round(trip.totalBudget * 0.35)}
            </div>
            <div className="text-sm uppercase tracking-widest text-muted font-serif">
              Accommodation
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12">
        <Link href="/dashboard" className="secondary">
          Back to Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/budget" className="secondary">
            View Budget
          </Link>
          <Link href="/packing" className="primary">
            Packing List
          </Link>
        </div>
      </div>
    </div>
  );
}
