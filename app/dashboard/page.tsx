"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface DashboardData {
  upcomingTrips: any[];
  popularCities: any[];
  stats: {
    totalTrips: number;
    totalCountries: number;
    totalBudget: number;
  };
  recommendedDestinations: any[];
  budgetHighlights: any[];
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
    <div className="max-w-6xl mx-auto px-4 py-12 fade-in">
      {/* Welcome Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl mb-2">Traveler's Hub</h1>
        <p className="text-lg text-muted italic font-serif">
          Greetings, {session?.user?.name || "Explorer"}. Your journal awaits.
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Stats & Upcoming */}
        <div className="lg:col-span-2 space-y-12">
          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 border-y border-border py-8 bg-page/50 rounded-sm">
            <div className="text-center group">
              <span className="block text-3xl font-bold text-primary transition-transform group-hover:scale-110 duration-300">
                {data?.stats.totalTrips || 0}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-serif font-bold">Journeys</span>
            </div>
            <div className="text-center border-x border-border group">
              <span className="block text-3xl font-bold text-primary transition-transform group-hover:scale-110 duration-300">
                {data?.stats.totalCountries || 0}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-serif font-bold">Countries</span>
            </div>
            <div className="text-center group">
              <span className="block text-3xl font-bold text-primary transition-transform group-hover:scale-110 duration-300">
                ${data?.stats.totalBudget.toLocaleString() || 0}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted font-serif font-bold">Invested</span>
            </div>
          </div>

          {/* Recent Records */}
          <section>
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-3xl">Upcoming Chapters</h2>
              <Link href="/trips/new">
                <button className="primary text-xs uppercase tracking-widest font-bold">Plan New Journey</button>
              </Link>
            </div>

            {data?.upcomingTrips.length ? (
              <div className="space-y-6">
                {data.upcomingTrips.map((trip) => (
                  <div key={trip.id} className="book-card p-8 flex justify-between items-center group relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-2xl mb-1 group-hover:text-primary transition-colors">{trip.name}</h3>
                      <p className="text-sm text-muted italic font-serif">
                        {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} 
                        <span className="mx-2 text-border">/</span>
                        {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <Link href={`/trips/${trip.id}`} className="relative z-10 ink-link font-bold uppercase tracking-widest text-xs">
                      Open Record
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="book-card p-16 text-center bg-page/30 border-dashed">
                <p className="text-xl italic font-serif text-muted mb-6">Your future pages are currently blank.</p>
                <Link href="/trips/new">
                  <button className="secondary uppercase tracking-widest font-bold">Write Your First Chapter</button>
                </Link>
              </div>
            )}
          </section>

          {/* Budget Highlights */}
          {data?.budgetHighlights.length ? (
            <section>
              <h2 className="text-3xl mb-8">Financial Ledger</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.budgetHighlights.map((highlight, idx) => (
                  <div key={idx} className="book-card p-8 border-l-4 border-l-primary">
                    <h4 className="text-xl font-serif italic mb-4">{highlight.tripName}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs uppercase tracking-widest text-muted font-bold">
                        <span>Expenditure</span>
                        <span>{Math.round((highlight.totalAmount / highlight.totalLimit) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000 ease-out" 
                          style={{ width: `${Math.min(100, (highlight.totalAmount / highlight.totalLimit) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-end pt-2">
                        <span className="text-lg font-bold">${highlight.totalAmount.toLocaleString()}</span>
                        <span className="text-xs text-muted font-serif">Limit: ${highlight.totalLimit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* Right Column: Recommendations & Popular */}
        <div className="space-y-12">
          <section className="book-card p-8 bg-page shadow-xl">
            <h2 className="text-2xl mb-8 border-b border-border pb-4 uppercase tracking-widest">
              Recommended
            </h2>
            <div className="space-y-8">
              {data?.recommendedDestinations.map((city) => (
                <div key={city.id} className="group cursor-pointer">
                  <h4 className="text-xl group-hover:text-primary transition-colors">{city.name}</h4>
                  <p className="text-sm text-muted font-serif italic mb-3">{city.country}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < city.costIndex ? 'text-primary' : 'text-border'}`}>$</span>
                      ))}
                    </div>
                    <button className="ink-link text-[10px] font-bold uppercase tracking-widest">
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-2">
            <h2 className="text-xl mb-6 font-serif italic border-b border-border pb-2 flex items-center gap-2 text-muted uppercase tracking-widest">
              Trending Now
            </h2>
            <div className="space-y-4">
              {data?.popularCities.map((city, idx) => (
                <div key={city.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="font-serif italic text-border text-lg">{idx + 1}</span>
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{city.name}</span>
                  </div>
                  <div className="h-px flex-grow mx-4 bg-border/30"></div>
                  <span className="text-[10px] uppercase tracking-tighter text-muted font-bold">{city.popularity}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
