"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Trip {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  coverPhoto?: string;
  stops: Stop[];
  totalBudget: number;
}

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

// Mock trip data for public sharing
const mockTrip: Trip = {
  id: "public-trip-1",
  name: "European Summer Adventure",
  description: "A 14-day journey through the heart of Europe, exploring culture, cuisine, and unforgettable landscapes.",
  startDate: "2024-07-01",
  endDate: "2024-07-15",
  coverPhoto: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
  totalBudget: 3500,
  stops: [
    {
      id: "stop-1",
      city: "Paris",
      country: "France",
      arrivalDate: "2024-07-01",
      departureDate: "2024-07-05",
      transport: "Flight from NYC (JFK to CDG)",
      hotel: "Hotel de Ville - $450/night",
      notes: "Don't forget beret and croissant cravings",
      activities: [
        { id: "act-1", name: "Eiffel Tower Visit", category: "Sightseeing", cost: 85 },
        { id: "act-2", name: "Louvre Museum", category: "Culture", cost: 120 },
        { id: "act-3", name: "Seine River Cruise", category: "Adventure", cost: 65 },
      ],
    },
    {
      id: "stop-2",
      city: "Barcelona",
      country: "Spain",
      arrivalDate: "2024-07-05",
      departureDate: "2024-07-10",
      transport: "Train from Paris (TGV)",
      hotel: "Casa Mila Boutique - $380/night",
      notes: "Siesta time is sacred",
      activities: [
        { id: "act-4", name: "Sagrada Familia", category: "Sightseeing", cost: 95 },
        { id: "act-5", name: "Park Güell", category: "Nature", cost: 40 },
        { id: "act-6", name: "Tapas Tour", category: "Food", cost: 75 },
      ],
    },
    {
      id: "stop-3",
      city: "Rome",
      country: "Italy",
      arrivalDate: "2024-07-10",
      departureDate: "2024-07-15",
      transport: "Flight from Barcelona (BCN to FCO)",
      hotel: "Trevi Palace - $420/night",
      notes: "Gelato every day",
      activities: [
        { id: "act-7", name: "Colosseum Tour", category: "Culture", cost: 110 },
        { id: "act-8", name: "Vatican Museums", category: "Sightseeing", cost: 85 },
        { id: "act-9", name: "Pizza Making Class", category: "Food", cost: 55 },
      ],
    },
  ],
};

export default function PublicTripPage() {
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for public trip
    setTimeout(() => {
      setTrip(mockTrip);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleCopyTrip = () => {
    alert("Trip copied to your collection! You can now customize it.");
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this amazing trip: ${trip?.name}`;

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Loading shared itinerary...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="book-card p-8 text-center">
          <p className="text-xl italic font-serif text-muted mb-4">
            Trip not found
          </p>
          <Link href="/" className="ink-link">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const totalActivities = trip.stops.reduce((sum, stop) => sum + stop.activities.length, 0);
  const totalActivityCost = trip.stops.reduce(
    (sum, stop) => sum + stop.activities.reduce((actSum, act) => actSum + act.cost, 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        {trip.coverPhoto && (
          <Image
            src={trip.coverPhoto}
            alt={trip.name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight font-serif font-bold">
              {trip.name}
            </h1>
            <p className="text-xl md:text-2xl font-serif italic opacity-90">
              {trip.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Trip Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="book-card p-6 text-center">
            <div className="text-3xl mb-2">🗺️</div>
            <div className="text-2xl font-bold text-primary">{trip.stops.length}</div>
            <div className="text-xs uppercase tracking-widest text-muted">Destinations</div>
          </div>
          <div className="book-card p-6 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-primary">
              {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted">Days</div>
          </div>
          <div className="book-card p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-primary">${trip.totalBudget.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-widest text-muted">Budget</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-12">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>

          <div className="space-y-8">
            {trip.stops.map((stop, index) => (
              <div key={stop.id} className="relative flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg hidden md:flex">
                  {index + 1}
                </div>
                <div className="ml-0 md:ml-8 flex-grow">
                  <div className="book-card p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-serif font-bold mb-1">
                          {stop.city}, {stop.country}
                        </h3>
                        <p className="text-muted text-sm">
                          {new Date(stop.arrivalDate).toLocaleDateString()} - {new Date(stop.departureDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <p className="text-sm text-muted">{stop.transport}</p>
                        <p className="text-sm text-muted">{stop.hotel}</p>
                      </div>
                    </div>

                    {stop.notes && (
                      <p className="text-muted italic mb-4">"{stop.notes}"</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stop.activities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <div className="flex items-center gap-3">
                            <div className="activity-icon">
                              {activity.category === "Sightseeing" ? "🏛️" :
                               activity.category === "Culture" ? "🎭" :
                               activity.category === "Food" ? "🍽️" :
                               activity.category === "Nature" ? "🌿" :
                               activity.category === "Adventure" ? "🏔️" : "📍"}
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium text-sm">{activity.name}</h4>
                              <p className="text-xs text-muted">{activity.category} • ${activity.cost}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button onClick={handleCopyTrip} className="primary text-lg px-8 py-4">
            📋 Copy This Trip
          </button>
          <Link href="/signup" className="secondary text-lg px-8 py-4">
            ✍️ Start Your Own Journey
          </Link>
        </div>

        {/* Share Section */}
        <div className="book-card p-8 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Share This Itinerary</h3>
          <p className="text-muted italic mb-6">
            Inspire others with your travel plans
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleShare("twitter")}
              className="secondary px-6 py-3"
            >
              🐦 Twitter
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="secondary px-6 py-3"
            >
              📘 Facebook
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="secondary px-6 py-3"
            >
              🔗 Copy Link
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-muted italic font-serif">
            Shared with ❤️ from Travel Loop
          </p>
        </div>
      </div>
    </div>
  );
}