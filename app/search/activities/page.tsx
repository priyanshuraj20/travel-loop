"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Activity {
  id: string;
  name: string;
  category: string;
  cost: number;
  duration: string;
  image: string;
  description: string;
  city?: string;
}

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: "1",
    name: "Eiffel Tower Visit",
    category: "sightseeing",
    cost: 85,
    duration: "2-3 hours",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop",
    description: "Iconic iron lattice tower with panoramic views of Paris.",
    city: "Paris",
  },
  {
    id: "2",
    name: "Louvre Museum Tour",
    category: "museums",
    cost: 120,
    duration: "3-4 hours",
    image: "https://images.unsplash.com/photo-1566139956833-0c5a5a0f6b7f?w=400&h=300&fit=crop",
    description: "World's largest art museum housing the Mona Lisa.",
    city: "Paris",
  },
  {
    id: "3",
    name: "Seine River Cruise",
    category: "sightseeing",
    cost: 65,
    duration: "1 hour",
    image: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=400&h=300&fit=crop",
    description: "Romantic boat tour along Paris's famous river.",
    city: "Paris",
  },
  {
    id: "4",
    name: "Sagrada Familia",
    category: "sightseeing",
    cost: 95,
    duration: "1-2 hours",
    image: "https://images.unsplash.com/photo-1583779457094-ab30f7fdbb59?w=400&h=300&fit=crop",
    description: "Gaudí's unfinished basilica masterpiece.",
    city: "Barcelona",
  },
  {
    id: "5",
    name: "Park Güell Visit",
    category: "nature",
    cost: 40,
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "Colorful mosaic park with city views.",
    city: "Barcelona",
  },
  {
    id: "6",
    name: "Tapas Tour",
    category: "food",
    cost: 75,
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    description: "Authentic Spanish small plates experience.",
    city: "Barcelona",
  },
  {
    id: "7",
    name: "Colosseum Tour",
    category: "sightseeing",
    cost: 110,
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=300&fit=crop",
    description: "Ancient Roman amphitheater exploration.",
    city: "Rome",
  },
  {
    id: "8",
    name: "Pizza Making Class",
    category: "food",
    cost: 55,
    duration: "2 hours",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    description: "Learn to make authentic Neapolitan pizza.",
    city: "Rome",
  },
  {
    id: "9",
    name: "Tokyo Nightlife",
    category: "nightlife",
    cost: 150,
    duration: "4-6 hours",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    description: "Experience Shibuya's vibrant nightlife scene.",
    city: "Tokyo",
  },
  {
    id: "10",
    name: "Mount Fuji Day Trip",
    category: "adventure",
    cost: 200,
    duration: "Full day",
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc99c35?w=400&h=300&fit=crop",
    description: "Hike and explore Japan's sacred mountain.",
    city: "Tokyo",
  },
];

const categories = [
  { value: "all", label: "All Activities" },
  { value: "sightseeing", label: "Sightseeing" },
  { value: "food", label: "Food Tours" },
  { value: "adventure", label: "Adventure" },
  { value: "museums", label: "Museums" },
  { value: "nightlife", label: "Nightlife" },
  { value: "nature", label: "Nature" },
];

export default function ActivitiesSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(mockActivities);

  useEffect(() => {
    let filtered = mockActivities;

    if (searchQuery) {
      filtered = filtered.filter(
        (activity) =>
          activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.city?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((activity) => activity.category === selectedCategory);
    }

    setFilteredActivities(filtered);
  }, [searchQuery, selectedCategory]);

  const handleAddActivity = (activityId: string) => {
    // Mock add activity functionality
    alert(`Added ${mockActivities.find(a => a.id === activityId)?.name} to your itinerary!`);
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
            Discover Activities
          </h1>
          <p className="text-lg text-muted italic font-serif">
            Find experiences that will make your journey unforgettable
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 book-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search activities, cities, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12">
            <div className="book-card p-8 max-w-md mx-auto">
              <p className="text-xl italic font-serif text-muted mb-4">
                No activities found matching your search
              </p>
              <p className="text-sm text-muted">
                Try adjusting your filters or search terms
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="book-card group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">
                    {activity.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                    ${activity.cost}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-1">
                    {activity.name}
                  </h3>
                  <p className="text-muted text-sm mb-2">
                    {activity.city} • {activity.duration}
                  </p>
                  <p className="text-sm text-muted italic mb-4 line-clamp-2">
                    {activity.description}
                  </p>
                  <button
                    onClick={() => handleAddActivity(activity.id)}
                    className="primary w-full text-sm"
                  >
                    Add to Itinerary
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
              Ready to Build Your Itinerary?
            </h3>
            <p className="text-muted italic mb-6">
              Combine these activities with your chosen destinations
            </p>
            <Link href="/trips/create" className="primary">
              Start Planning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}