"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface City {
  id: string;
  name: string;
  country: string;
  costIndex: number;
  popularity: number;
  image: string;
  description: string;
}

// Mock city data
const mockCities: City[] = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    costIndex: 4,
    popularity: 95,
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
    description: "The City of Light, with iconic landmarks and romantic charm.",
  },
  {
    id: "2",
    name: "Tokyo",
    country: "Japan",
    costIndex: 3,
    popularity: 92,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    description: "A bustling metropolis blending tradition and modernity.",
  },
  {
    id: "3",
    name: "Barcelona",
    country: "Spain",
    costIndex: 3,
    popularity: 88,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop",
    description: "Mediterranean architecture and vibrant street life.",
  },
  {
    id: "4",
    name: "New York",
    country: "USA",
    costIndex: 4,
    popularity: 90,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    description: "The city that never sleeps, full of energy and culture.",
  },
  {
    id: "5",
    name: "Rome",
    country: "Italy",
    costIndex: 3,
    popularity: 87,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
    description: "Ancient history meets modern Italian culture.",
  },
  {
    id: "6",
    name: "Amsterdam",
    country: "Netherlands",
    costIndex: 4,
    popularity: 85,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop",
    description: "Canals, bikes, and a laid-back European vibe.",
  },
  {
    id: "7",
    name: "Prague",
    country: "Czech Republic",
    costIndex: 2,
    popularity: 80,
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&h=300&fit=crop",
    description: "Fairy-tale architecture and affordable charm.",
  },
  {
    id: "8",
    name: "Sydney",
    country: "Australia",
    costIndex: 4,
    popularity: 86,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    description: "Harbor views and outdoor adventures Down Under.",
  },
];

const costIndexLabels = {
  1: "Very Cheap",
  2: "Cheap",
  3: "Moderate",
  4: "Expensive",
  5: "Very Expensive",
};

export default function CitiesSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [filteredCities, setFilteredCities] = useState<City[]>(mockCities);

  const regions = [
    { value: "all", label: "All Regions" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "americas", label: "Americas" },
    { value: "oceania", label: "Oceania" },
  ];

  useEffect(() => {
    let filtered = mockCities;

    if (searchQuery) {
      filtered = filtered.filter(
        (city) =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion !== "all") {
      const regionMap: { [key: string]: string[] } = {
        europe: ["France", "Spain", "Italy", "Netherlands", "Czech Republic"],
        asia: ["Japan"],
        americas: ["USA"],
        oceania: ["Australia"],
      };
      filtered = filtered.filter((city) =>
        regionMap[selectedRegion]?.includes(city.country)
      );
    }

    setFilteredCities(filtered);
  }, [searchQuery, selectedRegion]);

  const handleAddToTrip = (cityId: string) => {
    // Mock add to trip functionality
    alert(`Added ${mockCities.find(c => c.id === cityId)?.name} to your trip!`);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="text-sm text-muted hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl mb-4 font-serif font-bold text-foreground">
            Discover Cities
          </h1>
          <p className="text-lg text-muted italic font-serif">
            Explore destinations that call to your wanderlust
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 book-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search cities or countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full"
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredCities.length === 0 ? (
          <div className="text-center py-12">
            <div className="book-card p-8 max-w-md mx-auto">
              <p className="text-xl italic font-serif text-muted mb-4">
                No cities found matching your search
              </p>
              <p className="text-sm text-muted">
                Try adjusting your filters or search terms
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <div key={city.id} className="book-card group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
                    ⭐ {city.popularity}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-1">
                    {city.name}
                  </h3>
                  <p className="text-muted text-sm mb-3">{city.country}</p>
                  <p className="text-sm text-muted italic mb-4 line-clamp-2">
                    {city.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs uppercase tracking-widest text-muted">
                      Cost: {costIndexLabels[city.costIndex as keyof typeof costIndexLabels]}
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < city.costIndex ? "text-primary" : "text-muted/30"
                          }`}
                        >
                          $
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToTrip(city.id)}
                    className="primary w-full text-sm"
                  >
                    Add to Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="book-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Ready to Plan Your Journey?
            </h3>
            <p className="text-muted italic mb-6">
              Start building your personalized itinerary with these inspiring destinations
            </p>
            <Link href="/trips/create" className="primary">
              Create New Trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}