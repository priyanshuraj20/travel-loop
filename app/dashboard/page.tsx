"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardData {
  upcomingTrips: any[];
  popularCities: any[];
  recentTrips: any[];
  recentActivities: any[];
  stats: {
    totalTrips: number;
    totalCountries: number;
    totalBudget: number;
    totalActivities: number;
    totalCitiesVisited: number;
    monthlyTrips: number;
  };
  recommendedDestinations: any[];
  budgetHighlights: any[];
  budgetSummary: any[];
  topDestinations: any[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Consulting your records...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-page via-page/95 to-secondary/10">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 shadow-xl z-40 hidden lg:block">
        <div className="p-6 border-b border-border/30">
          <h2 className="text-xl font-serif italic text-primary">
            Travel Loop
          </h2>
          <p className="text-xs text-muted uppercase tracking-widest mt-1">
            Control Center
          </p>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20"
          >
            <span className="text-lg">📊</span>
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            href="/trips/create"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">✈️</span>
            <span className="font-medium">Plan Trip</span>
          </Link>
          <Link
            href="/itinerary"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">🗺️</span>
            <span className="font-medium">Itineraries</span>
          </Link>
          <Link
            href="/budget"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">💰</span>
            <span className="font-medium">Budget</span>
          </Link>
          <Link
            href="/packing"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <span className="text-lg">🎒</span>
            <span className="font-medium">Packing</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border/30 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif italic text-primary mb-1">
                  Traveler's Command Center
                </h1>
                <p className="text-muted font-serif italic">
                  Welcome back, {session?.user?.name || "Explorer"}. Your
                  adventures await.
                </p>
              </div>
              <div className="hidden md:flex gap-3">
                <Link href="/trips/create">
                  <button className="primary px-6 py-2 text-sm uppercase tracking-widest font-bold">
                    Plan New Journey
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div className="stat-card group">
              <div className="text-2xl mb-1">🗺️</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {data?.stats.totalTrips || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Journeys
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">🌍</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {data?.stats.totalCountries || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Countries
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                ${(data?.stats.totalBudget || 0).toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Invested
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {data?.stats.totalActivities || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Activities
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">🏙️</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {data?.stats.totalCitiesVisited || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                Cities
              </div>
            </div>
            <div className="stat-card group">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-xl font-bold text-primary group-hover:scale-110 transition-transform">
                {data?.stats.monthlyTrips || 0}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted font-serif">
                This Year
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upcoming & Recent */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Trips */}
              <section className="dashboard-section">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif italic text-primary">
                    Upcoming Adventures
                  </h2>
                  <Link href="/trips/create">
                    <button className="ink-link text-sm uppercase tracking-widest font-bold">
                      + New Trip
                    </button>
                  </Link>
                </div>

                {data?.upcomingTrips.length ? (
                  <div className="grid gap-4">
                    {data.upcomingTrips.map((trip) => (
                      <div key={trip.id} className="trip-card group">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-serif italic group-hover:text-primary transition-colors mb-2">
                              {trip.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted">
                              <span className="flex items-center gap-1">
                                📅{" "}
                                {new Date(trip.startDate).toLocaleDateString()}
                              </span>
                              <span className="text-border">•</span>
                              <span>
                                {Math.ceil(
                                  (new Date(trip.endDate).getTime() -
                                    new Date(trip.startDate).getTime()) /
                                    (1000 * 60 * 60 * 24),
                                )}{" "}
                                days
                              </span>
                            </div>
                          </div>
                          <Link href={`/trips/${trip.id}`}>
                            <button className="primary text-xs px-4 py-2 uppercase tracking-widest font-bold">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="text-4xl mb-4">🗺️</div>
                    <h3 className="text-xl font-serif italic mb-2">
                      No upcoming journeys
                    </h3>
                    <p className="text-muted mb-6">
                      Time to plan your next adventure!
                    </p>
                    <Link href="/trips/create">
                      <button className="secondary px-6 py-3 uppercase tracking-widest font-bold">
                        Start Planning
                      </button>
                    </Link>
                  </div>
                )}
              </section>

              {/* Recent Activity Timeline */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {data?.recentActivities.slice(0, 8).map((activity, idx) => (
                    <div key={activity.id} className="activity-item group">
                      <div className="flex items-start gap-4">
                        <div className="activity-icon">
                          {activity.category === "food" && "🍽️"}
                          {activity.category === "sightseeing" && "🏛️"}
                          {activity.category === "adventure" && "🏔️"}
                          {activity.category === "culture" && "🎭"}
                          {activity.category === "shopping" && "🛍️"}
                          {![
                            "food",
                            "sightseeing",
                            "adventure",
                            "culture",
                            "shopping",
                          ].includes(activity.category) && "📍"}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            Added{" "}
                            <span className="font-serif italic">
                              "{activity.name}"
                            </span>{" "}
                            to {activity.stop.city.name}
                          </p>
                          <p className="text-sm text-muted">
                            {activity.stop.trip.name} •{" "}
                            {new Date(activity.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!data?.recentActivities ||
                    data.recentActivities.length === 0) && (
                    <div className="text-center py-8 text-muted">
                      <p className="font-serif italic">
                        No recent activities yet
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column - Budget & Recommendations */}
            <div className="space-y-8">
              {/* Budget Overview */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Budget Overview
                </h2>
                {data?.budgetHighlights.length ? (
                  <div className="space-y-4">
                    {data.budgetHighlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="budget-card">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-serif italic text-sm">
                            {highlight.tripName}
                          </h4>
                          <span className="text-xs text-muted">
                            {Math.round(
                              (highlight.totalAmount / highlight.totalLimit) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="budget-bar">
                          <div
                            className="budget-fill"
                            style={{
                              width: `${Math.min(100, (highlight.totalAmount / highlight.totalLimit) * 100)}%`,
                              backgroundColor:
                                highlight.totalAmount > highlight.totalLimit
                                  ? "#ef4444"
                                  : "#10b981",
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-2">
                          <span>${highlight.totalAmount.toLocaleString()}</span>
                          <span className="text-muted">
                            ${highlight.totalLimit.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted">
                    <p className="font-serif italic text-sm">
                      No budget data yet
                    </p>
                  </div>
                )}
              </section>

              {/* Quick Actions */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/trips/create">
                    <button className="action-button">
                      <span className="text-2xl mb-2">✈️</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        New Trip
                      </span>
                    </button>
                  </Link>
                  <Link href="/itinerary">
                    <button className="action-button">
                      <span className="text-2xl mb-2">🗺️</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        Itinerary
                      </span>
                    </button>
                  </Link>
                  <Link href="/budget">
                    <button className="action-button">
                      <span className="text-2xl mb-2">💰</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        Budget
                      </span>
                    </button>
                  </Link>
                  <Link href="/packing">
                    <button className="action-button">
                      <span className="text-2xl mb-2">🎒</span>
                      <span className="text-xs uppercase tracking-widest font-bold">
                        Packing
                      </span>
                    </button>
                  </Link>
                </div>
              </section>

              {/* Recommended Destinations */}
              <section className="dashboard-section">
                <h2 className="text-2xl font-serif italic text-primary mb-6">
                  Explore New Places
                </h2>
                <div className="space-y-4">
                  {data?.recommendedDestinations.slice(0, 4).map((city) => (
                    <div key={city.id} className="destination-card group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif italic group-hover:text-primary transition-colors">
                            {city.name}
                          </h4>
                          <p className="text-xs text-muted">{city.country}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${i < Math.floor(city.costIndex / 20) ? "text-primary" : "text-border"}`}
                            >
                              $
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Top Destinations */}
              {data?.topDestinations && data.topDestinations.length > 0 && (
                <section className="dashboard-section">
                  <h2 className="text-2xl font-serif italic text-primary mb-6">
                    Your Favorite Spots
                  </h2>
                  <div className="space-y-3">
                    {data.topDestinations.map((dest, idx) => (
                      <div
                        key={dest.cityId}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-serif italic text-border text-sm">
                            #{idx + 1}
                          </span>
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {dest.city.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted">
                          {dest._count.cityId} visits
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
