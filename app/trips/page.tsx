"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  status: 'upcoming' | 'completed' | 'planning';
  citiesCount: number;
}

const mockTrips: Trip[] = [
  {
    id: "trip-1",
    name: "Summer in Europe",
    destination: "Paris, Barcelona, Rome",
    startDate: "2024-07-01",
    endDate: "2024-07-14",
    totalBudget: 3500,
    estimatedBudget: 3500,
    travelStyle: "cultural",
    description: "A cultural journey through Western Europe",
    status: 'upcoming',
    citiesCount: 3,
  },
  {
    id: "trip-2",
    name: "Tokyo Adventure",
    destination: "Tokyo, Kyoto",
    startDate: "2024-09-10",
    endDate: "2024-09-25",
    totalBudget: 4200,
    estimatedBudget: 4200,
    travelStyle: "adventure",
    description: "Exploring the bustling streets and temples of Japan",
    status: 'planning',
    citiesCount: 2,
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
    description: "Sun, sand, and relaxation in paradise",
    status: 'completed',
    citiesCount: 1,
  },
  {
    id: "trip-4",
    name: "Moroccan Desert Journey",
    destination: "Marrakech, Sahara Desert",
    startDate: "2025-03-15",
    endDate: "2025-03-22",
    totalBudget: 2200,
    estimatedBudget: 2200,
    travelStyle: "adventure",
    description: "Camel treks and ancient medinas",
    status: 'planning',
    citiesCount: 2,
  },
  {
    id: "trip-5",
    name: "Iceland Northern Lights",
    destination: "Reykjavik, Blue Lagoon",
    startDate: "2024-11-10",
    endDate: "2024-11-17",
    totalBudget: 3800,
    estimatedBudget: 3800,
    travelStyle: "nature",
    description: "Chasing auroras and volcanic wonders",
    status: 'upcoming',
    citiesCount: 2,
  },
  {
    id: "trip-6",
    name: "New Zealand Road Trip",
    destination: "Auckland, Queenstown, Christchurch",
    startDate: "2025-01-05",
    endDate: "2025-01-20",
    totalBudget: 4500,
    estimatedBudget: 4500,
    travelStyle: "adventure",
    description: "Scenic drives and outdoor adventures",
    status: 'planning',
    citiesCount: 3,
  },
];

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrips(mockTrips);
      setLoading(false);
    }, 800);
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'planning': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return '🗓️';
      case 'completed': return '✅';
      case 'planning': return '📝';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Loading your travel archive...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-page via-page/95 to-secondary/10">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 shadow-xl z-40 hidden lg:block">
        <div className="p-6 border-b border-border/30">
          <h2 className="text-xl font-serif italic text-primary">
            Travel Loop
          </h2>
          <p className="text-xs text-muted uppercase tracking-widest mt-1">
            My Archive
          </p>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">📊</span>
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            href="/trips"
            className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20"
          >
            <span className="text-lg">🗂️</span>
            <span className="font-medium">My Trips</span>
          </Link>
          <Link
            href="/trips/create"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">✈️</span>
            <span className="font-medium">Plan Trip</span>
          </Link>
          <Link
            href="/search/cities"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">🏙️</span>
            <span className="font-medium">Discover Cities</span>
          </Link>
          <Link
            href="/search/activities"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">🎯</span>
            <span className="font-medium">Find Activities</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border/30 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => {/* TODO: implement mobile menu */}}
                  className="lg:hidden p-2 rounded-lg hover:bg-secondary/20 transition-colors"
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif italic text-primary mb-1">
                    My Travel Archive
                  </h1>
                  <p className="text-muted font-serif italic">
                    {trips.length} journeys documented
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/trips/create">
                  <button className="primary px-4 py-2 text-sm uppercase tracking-widest font-bold md:px-6">
                    Plan New Journey
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search and Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "all" ? "bg-primary text-white" : "bg-secondary/20 hover:bg-secondary/30"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("upcoming")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "upcoming" ? "bg-green-500 text-white" : "bg-secondary/20 hover:bg-secondary/30"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setStatusFilter("planning")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "planning" ? "bg-orange-500 text-white" : "bg-secondary/20 hover:bg-secondary/30"
                }`}
              >
                Planning
              </button>
              <button
                onClick={() => setStatusFilter("completed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === "completed" ? "bg-blue-500 text-white" : "bg-secondary/20 hover:bg-secondary/30"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Trips Grid */}
          {filteredTrips.length === 0 ? (
            <div className="text-center py-16">
              <div className="book-card p-8 max-w-md mx-auto">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-xl font-serif italic text-primary mb-2">
                  No trips found
                </h3>
                <p className="text-muted mb-6">
                  {searchTerm || statusFilter !== "all" ? "Try adjusting your search or filters." : "Start your first journey!"}
                </p>
                <Link href="/trips/create">
                  <button className="primary px-6 py-3 uppercase tracking-widest font-bold">
                    Plan Your First Trip
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="book-card p-6 group hover:shadow-lg transition-all duration-300">
                  {/* Cover Image Placeholder */}
                  <div className="w-full h-32 bg-gradient-to-br from-secondary to-primary/20 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-2xl">🗺️</span>
                  </div>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getStatusColor(trip.status)}`}>
                    <span>{getStatusIcon(trip.status)}</span>
                    <span className="capitalize">{trip.status}</span>
                  </div>

                  {/* Trip Info */}
                  <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {trip.name}
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    {trip.destination}
                  </p>
                  <div className="text-xs text-muted mb-4 space-y-1">
                    <div>📅 {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</div>
                    <div>🏙️ {trip.citiesCount} cities • 💰 ${trip.totalBudget.toLocaleString()}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/trips/${trip.id}`} className="flex-1">
                      <button className="w-full secondary text-xs py-2 uppercase tracking-widest font-bold">
                        View Details
                      </button>
                    </Link>
                    <button className="p-2 text-muted hover:text-primary transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
