"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Activity {
  id: string;
  name: string;
  category: string;
  cost: number;
  image?: string;
  description?: string;
  time?: string;
}

interface Stop {
  id: string;
  city: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  activities: Activity[];
  transport?: string;
  hotel?: string;
  notes?: string;
  position?: number;
}

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  stops: Stop[];
}

// Mock data
const mockTrips: { [key: string]: Trip } = {
  "trip-1": {
    id: "trip-1",
    name: "Summer in Europe",
    destination: "Western Europe",
    startDate: "2024-06-15",
    endDate: "2024-07-20",
    totalBudget: 3500,
    stops: [
      {
        id: "stop-1",
        city: "Paris",
        country: "France",
        arrivalDate: "2024-06-15",
        departureDate: "2024-06-20",
        position: 1,
        transport: "Flight from NYC (JFK → CDG) - 7hrs",
        hotel: "Hotel de Ville Boutique - $450/night",
        activities: [
          {
            id: "act-1",
            name: "Eiffel Tower",
            category: "Iconic",
            cost: 85,
            time: "09:00 AM",
            description: "Visit the iconic symbol of Paris",
          },
          {
            id: "act-2",
            name: "Louvre Museum",
            category: "Culture",
            cost: 120,
            time: "02:00 PM",
            description: "World's largest art museum",
          },
          {
            id: "act-3",
            name: "Seine River Cruise",
            category: "Relaxation",
            cost: 65,
            time: "06:00 PM",
            description: "Evening cruise along the Seine",
          },
        ],
        notes: "Reserve ahead for tower visit. Sunset is magical!",
      },
      {
        id: "stop-2",
        city: "Barcelona",
        country: "Spain",
        arrivalDate: "2024-06-20",
        departureDate: "2024-06-25",
        position: 2,
        transport: "Train (AVE) from Paris - 6hrs",
        hotel: "Casa Mila Suites - $380/night",
        activities: [
          {
            id: "act-4",
            name: "Sagrada Familia",
            category: "Architecture",
            cost: 95,
            time: "09:00 AM",
            description: "Gaudí's masterpiece basilica",
          },
          {
            id: "act-5",
            name: "Park Güell",
            category: "Nature",
            cost: 40,
            time: "02:00 PM",
            description: "Colorful mosaic-covered gardens",
          },
          {
            id: "act-6",
            name: "Tapas Tour",
            category: "Food",
            cost: 75,
            time: "07:00 PM",
            description: "Spanish tapas and wine tasting",
          },
        ],
        notes: "Arrive early at Sagrada Familia to beat crowds",
      },
      {
        id: "stop-3",
        city: "Rome",
        country: "Italy",
        arrivalDate: "2024-06-25",
        departureDate: "2024-07-01",
        position: 3,
        transport: "Flight from Barcelona - 2hrs",
        hotel: "Trevi Palace - $420/night",
        activities: [
          {
            id: "act-7",
            name: "Colosseum Tour",
            category: "History",
            cost: 110,
            time: "08:30 AM",
            description: "Ancient Roman amphitheater",
          },
          {
            id: "act-8",
            name: "Vatican Museums",
            category: "Culture",
            cost: 85,
            time: "02:00 PM",
            description: "Sistine Chapel and papal treasures",
          },
          {
            id: "act-9",
            name: "Pasta Making Class",
            category: "Food",
            cost: 55,
            time: "05:00 PM",
            description: "Learn to make authentic Italian pasta",
          },
        ],
        notes: "Book Vatican tours in advance",
      },
    ],
  },
};

const categoryIcons: { [key: string]: string } = {
  Iconic: "🗼",
  Culture: "🎨",
  Relaxation: "🏖️",
  Architecture: "🏗️",
  Nature: "🌿",
  Food: "🍽️",
  History: "📜",
  Adventure: "🧗",
};

export default function ItineraryPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedStop, setExpandedStop] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [showAddStop, setShowAddStop] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTrip = mockTrips[tripId as keyof typeof mockTrips];
      setTrip(mockTrip || null);
      if (mockTrip && mockTrip.stops.length > 0) {
        setExpandedStop(mockTrip.stops[0].id);
      }
      setLoading(false);
    }, 500);
  }, [tripId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-serif italic text-muted mb-4">
            Planning your journey...
          </p>
          <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="book-card p-12 text-center max-w-md">
          <p className="text-4xl mb-4">🗺️</p>
          <p className="text-xl italic font-serif text-foreground mb-2">
            Trip not found
          </p>
          <p className="text-muted mb-6">We couldn't find this itinerary</p>
          <Link
            href="/trips"
            className="inline-block bg-primary text-white px-6 py-2.5 rounded font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all"
          >
            Back to Trips
          </Link>
        </div>
      </div>
    );
  }

  const totalActivityCost = trip.stops.reduce(
    (sum, stop) =>
      sum + stop.activities.reduce((actSum, act) => actSum + act.cost, 0),
    0,
  );

  const getDayCount = (start: string, end: string) => {
    return Math.ceil(
      (new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60 * 24),
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/trips"
            className="text-sm text-muted hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to Trips
          </Link>
          <div className="flex items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
                {trip.name}
              </h1>
              <p className="text-muted">
                Building your journey through {trip.destination}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                ${trip.totalBudget.toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Total Budget
              </div>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            <div className="book-card p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {trip.stops.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted">
                Stops
              </div>
            </div>
            <div className="book-card p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {trip.stops.reduce(
                  (sum, stop) => sum + stop.activities.length,
                  0,
                )}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted">
                Activities
              </div>
            </div>
            <div className="book-card p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                ${totalActivityCost}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted">
                Activities
              </div>
            </div>
            <div className="book-card p-4 text-center hidden md:block">
              <div className="text-2xl font-bold text-primary">
                {getDayCount(trip.startDate, trip.endDate)}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted">
                Days
              </div>
            </div>
            <div className="book-card p-4 text-center hidden md:block">
              <div className="text-2xl font-bold text-primary">
                $
                {Math.round(
                  (trip.totalBudget - totalActivityCost) / trip.stops.length,
                )}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted">
                Avg/Stop
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-12">
          {/* Timeline visual line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent hidden md:block"></div>

          <div className="space-y-6">
            {trip.stops.map((stop, index) => {
              const dayCount = getDayCount(
                stop.arrivalDate,
                stop.departureDate,
              );
              const isExpanded = expandedStop === stop.id;

              return (
                <div key={stop.id} className="relative">
                  {/* Timeline connector */}
                  <div
                    className="absolute left-0 md:left-2 top-8 w-10 h-0.5 bg-gradient-to-r from-primary to-accent hidden md:block"
                    style={{ width: "22px", left: "12px" }}
                  ></div>

                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 md:left-2 top-6 w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center text-sm font-bold text-primary hidden md:flex z-10"
                    style={{ left: "-7px" }}
                  >
                    {index + 1}
                  </div>

                  {/* Stop card */}
                  <div
                    className="md:ml-12 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() =>
                        setExpandedStop(isExpanded ? null : stop.id)
                      }
                      className="w-full text-left book-card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-serif font-bold text-foreground">
                              {stop.city}
                            </h3>
                            <span className="text-sm text-muted">
                              ({stop.country})
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted">
                            <span>📅 {dayCount} days</span>
                            <span>
                              {new Date(stop.arrivalDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                              {" - "}
                              {new Date(stop.departureDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                            <span>🎯 {stop.activities.length} activities</span>
                          </div>
                        </div>
                        <div
                          className={`text-2xl transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </div>
                      </div>

                      {/* Collapsed preview */}
                      {!isExpanded && stop.activities.length > 0 && (
                        <div className="flex gap-2 mt-4">
                          {stop.activities.slice(0, 3).map((activity) => (
                            <span
                              key={activity.id}
                              className="inline-block px-3 py-1 bg-primary/10 text-xs rounded text-primary font-semibold"
                            >
                              {categoryIcons[activity.category] || "•"}{" "}
                              {activity.category}
                            </span>
                          ))}
                          {stop.activities.length > 3 && (
                            <span className="inline-block px-3 py-1 bg-border text-xs rounded text-muted font-semibold">
                              +{stop.activities.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="mt-4 space-y-4 animate-fade-in">
                        {/* Transport */}
                        {stop.transport && (
                          <div className="book-card p-4 bg-primary/5 border border-primary/20">
                            <div className="flex items-start gap-3">
                              <span className="text-xl">✈️</span>
                              <div>
                                <h4 className="font-bold text-foreground text-sm">
                                  Transport
                                </h4>
                                <p className="text-sm text-muted mt-1">
                                  {stop.transport}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Hotel */}
                        {stop.hotel && (
                          <div className="book-card p-4 bg-secondary/10 border border-secondary/20">
                            <div className="flex items-start gap-3">
                              <span className="text-xl">🏨</span>
                              <div>
                                <h4 className="font-bold text-foreground text-sm">
                                  Accommodation
                                </h4>
                                <p className="text-sm text-muted mt-1">
                                  {stop.hotel}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Activities */}
                        <div>
                          <h4 className="font-bold text-foreground mb-3 text-sm uppercase tracking-widest">
                            {stop.activities.length} Activities Planned
                          </h4>
                          <div className="space-y-3">
                            {stop.activities.map((activity) => (
                              <div
                                key={activity.id}
                                onClick={() => setSelectedActivity(activity)}
                                className="book-card p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xl">
                                        {categoryIcons[activity.category] ||
                                          "•"}
                                      </span>
                                      <h5 className="font-bold text-foreground">
                                        {activity.name}
                                      </h5>
                                      {activity.time && (
                                        <span className="text-xs text-muted ml-auto">
                                          {activity.time}
                                        </span>
                                      )}
                                    </div>
                                    {activity.description && (
                                      <p className="text-xs text-muted mt-2">
                                        {activity.description}
                                      </p>
                                    )}
                                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
                                        {activity.category}
                                      </span>
                                      <span className="text-sm font-bold text-primary ml-auto">
                                        ${activity.cost}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Notes */}
                        {stop.notes && (
                          <div className="book-card p-4 bg-accent/5 border border-accent/20">
                            <h4 className="font-bold text-foreground text-sm mb-2">
                              💡 Notes
                            </h4>
                            <p className="text-sm text-muted italic">
                              {stop.notes}
                            </p>
                          </div>
                        )}

                        {/* Stop actions */}
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 border border-primary text-primary rounded text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-all">
                            Edit Stop
                          </button>
                          <button className="flex-1 px-4 py-2 border border-primary text-primary rounded text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-all">
                            Add Activity
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Stop Section */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowAddStop(!showAddStop)}
            className="px-8 py-3 bg-primary text-white rounded font-bold uppercase tracking-widest text-sm hover:bg-accent shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            + Add New Stop
          </button>
        </div>

        {/* Budget Summary */}
        <div className="book-card p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
            Budget Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded">
              <div className="text-2xl font-bold text-primary">
                ${totalActivityCost}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted mt-2">
                Activities
              </div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded">
              <div className="text-2xl font-bold text-secondary">
                ${Math.round(trip.totalBudget * 0.35)}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted mt-2">
                Transport
              </div>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded">
              <div className="text-2xl font-bold text-accent">
                ${Math.round(trip.totalBudget * 0.35)}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted mt-2">
                Accommodation
              </div>
            </div>
            <div className="text-center p-4 border-2 border-primary/20 rounded">
              <div className="text-2xl font-bold text-primary">
                $
                {trip.totalBudget -
                  totalActivityCost -
                  Math.round(trip.totalBudget * 0.7)}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted mt-2">
                Contingency
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/trips"
            className="px-6 py-2.5 border border-primary text-primary rounded font-bold uppercase tracking-widest text-sm hover:bg-primary/5 transition-all"
          >
            Back to Trips
          </Link>
          <div className="flex gap-4">
            <Link
              href={`/trips/${trip.id}/budget`}
              className="px-6 py-2.5 border border-primary text-primary rounded font-bold uppercase tracking-widest text-sm hover:bg-primary/5 transition-all"
            >
              Full Budget
            </Link>
            <Link
              href={`/trips/${trip.id}/packing`}
              className="px-6 py-2.5 bg-primary text-white rounded font-bold uppercase tracking-widest text-sm hover:bg-accent shadow-md hover:shadow-lg transition-all"
            >
              Packing List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
