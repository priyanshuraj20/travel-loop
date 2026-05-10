"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  estimatedBudget?: number;
  coverPhoto?: string;
  travelStyle?: string;
  description?: string;
}

const mockTrips: Trip[] = [
  {
    id: "trip-1",
    name: "Summer in Europe",
    destination: "Paris, France",
    startDate: "2024-06-15",
    endDate: "2024-07-20",
    totalBudget: 3500,
    estimatedBudget: 3500,
    travelStyle: "cultural",
    description: "A cultural trip to explore the charm of Western Europe",
  },
  {
    id: "trip-2",
    name: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    startDate: "2024-09-10",
    endDate: "2024-09-25",
    totalBudget: 4200,
    estimatedBudget: 4200,
    travelStyle: "adventure",
    description: "Exploring the bustling streets and temples of Tokyo",
  },
  {
    id: "trip-3",
    name: "Caribbean Beach Escape",
    destination: "Cancun, Mexico",
    startDate: "2024-12-20",
    endDate: "2024-12-27",
    totalBudget: 2800,
    estimatedBudget: 2800,
    travelStyle: "relaxation",
    description: "A relaxing beach getaway during the holiday season",
  },
  {
    id: "trip-4",
    name: "Hiking in the Alps",
    destination: "Swiss Alps",
    startDate: "2024-08-01",
    endDate: "2024-08-15",
    totalBudget: 2200,
    estimatedBudget: 2200,
    travelStyle: "adventure",
    description: "Mountain hiking and alpine exploration",
  },
  {
    id: "trip-5",
    name: "Food Tour of Italy",
    destination: "Rome, Italy",
    startDate: "2024-10-05",
    endDate: "2024-10-20",
    totalBudget: 3000,
    estimatedBudget: 3000,
    travelStyle: "gastronomic",
    description: "Culinary adventures through Italy's finest regions",
  },
  {
    id: "trip-6",
    name: "Thailand Luxury Retreat",
    destination: "Bangkok, Thailand",
    startDate: "2025-02-01",
    endDate: "2025-02-14",
    totalBudget: 5500,
    estimatedBudget: 5500,
    travelStyle: "luxury",
    description: "Premium spa and resort experience in Thailand",
  },
];

const travelStyleEmojis: { [key: string]: string } = {
  luxury: "👑",
  adventure: "⛺",
  cultural: "🏛️",
  relaxation: "🏖️",
  budget: "🧭",
  gastronomic: "🍽️",
};

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(mockTrips);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterTrips();
  }, [searchQuery, selectedStyle, trips]);

  const filterTrips = () => {
    let filtered = trips;

    if (searchQuery) {
      filtered = filtered.filter(
        (trip) =>
          trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.destination.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedStyle) {
      filtered = filtered.filter((trip) => trip.travelStyle === selectedStyle);
    }

    setFilteredTrips(filtered);
  };

  const getDayCount = (start: string, end: string) => {
    return Math.ceil(
      (new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60 * 24),
    );
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const handleDeleteTrip = async (tripId: string) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const response = await fetch(`/api/trips/${tripId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setTrips(trips.filter((t) => t.id !== tripId));
        }
      } catch (err) {
        console.error("Failed to delete trip:", err);
      }
    }
  };

  const styles = [
    "adventure",
    "cultural",
    "relaxation",
    "luxury",
    "budget",
    "gastronomic",
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            My Journeys
          </h1>
          <p className="text-muted mb-6">
            Manage and explore all your planned adventures
          </p>

          <Link
            href="/trips/create"
            className="inline-block bg-primary text-white px-6 py-2.5 rounded font-bold uppercase tracking-widest text-sm hover:bg-accent shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            + Plan New Trip
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="book-card p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search trips by name or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded text-sm font-bold uppercase tracking-widest transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "bg-page border border-border text-foreground hover:border-primary"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded text-sm font-bold uppercase tracking-widest transition-all ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "bg-page border border-border text-foreground hover:border-primary"
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Filter by Travel Style */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted font-bold mb-3">
              Filter by style:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStyle(null)}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedStyle === null
                    ? "bg-primary text-white"
                    : "bg-page border border-border text-foreground hover:border-primary"
                }`}
              >
                All
              </button>
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() =>
                    setSelectedStyle(selectedStyle === style ? null : style)
                  }
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1 ${
                    selectedStyle === style
                      ? "bg-primary text-white"
                      : "bg-page border border-border text-foreground hover:border-primary"
                  }`}
                >
                  <span>{travelStyleEmojis[style]}</span>
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trip Results */}
        {filteredTrips.length === 0 ? (
          <div className="book-card p-12 text-center">
            <p className="text-4xl mb-4">🧭</p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">
              No trips found
            </h3>
            <p className="text-muted mb-6">
              {searchQuery || selectedStyle
                ? "Try adjusting your search filters"
                : "Time to plan your next adventure!"}
            </p>
            <Link
              href="/trips/create"
              className="inline-block bg-primary text-white px-6 py-2.5 rounded font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all"
            >
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted mb-6">
              Showing <span className="font-bold">{filteredTrips.length}</span>{" "}
              of <span className="font-bold">{trips.length}</span> trips
            </p>

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredTrips.map((trip, index) => {
                  const dayCount = getDayCount(trip.startDate, trip.endDate);
                  return (
                    <div
                      key={trip.id}
                      className="book-card overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Cover Image */}
                      <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-b border-border relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                        <span className="text-5xl z-10">
                          {travelStyleEmojis[trip.travelStyle || "adventure"]}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg font-serif font-bold text-foreground flex-1 line-clamp-2">
                              {trip.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted">
                            {trip.destination}
                          </p>
                        </div>

                        {/* Trip Stats */}
                        <div className="space-y-2 border-t border-border pt-4">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted">Duration</span>
                            <span className="font-bold text-foreground">
                              {dayCount} days
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted">Budget</span>
                            <span className="font-bold text-primary">
                              {formatCurrency(trip.totalBudget)}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted">Dates</span>
                            <span className="font-bold text-foreground">
                              {new Date(trip.startDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                              -
                              {new Date(trip.endDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Link
                            href={`/trips/${trip.id}`}
                            className="flex-1 text-center px-3 py-2 bg-primary text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all"
                          >
                            View
                          </Link>
                          <Link
                            href={`/trips/${trip.id}/edit`}
                            className="flex-1 text-center px-3 py-2 border border-primary text-primary rounded text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-all"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteTrip(trip.id)}
                            className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-3 mb-12">
                {filteredTrips.map((trip, index) => {
                  const dayCount = getDayCount(trip.startDate, trip.endDate);
                  return (
                    <div
                      key={trip.id}
                      className="book-card p-6 flex items-center gap-6 hover:shadow-md transition-all animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {/* Icon */}
                      <div className="text-4xl flex-shrink-0">
                        {travelStyleEmojis[trip.travelStyle || "adventure"]}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-serif font-bold text-foreground truncate">
                          {trip.name}
                        </h3>
                        <p className="text-sm text-muted">{trip.destination}</p>
                        <div className="flex gap-6 mt-2 text-xs text-muted">
                          <span>📅 {dayCount} days</span>
                          <span>💰 {formatCurrency(trip.totalBudget)}</span>
                          <span>
                            {new Date(trip.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Link
                          href={`/trips/${trip.id}`}
                          className="px-4 py-2 bg-primary text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all"
                        >
                          View
                        </Link>
                        <Link
                          href={`/trips/${trip.id}/edit`}
                          className="px-4 py-2 border border-primary text-primary rounded text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-all"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
