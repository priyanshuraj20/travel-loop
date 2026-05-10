"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  language: string;
  travelStyle: string;
  profileImage?: string;
}

const travelStyles = [
  { value: "luxury", label: "Luxury Traveler", icon: "👑" },
  { value: "adventure", label: "Adventure Seeker", icon: "⛺" },
  { value: "cultural", label: "Culture Explorer", icon: "🏛️" },
  { value: "relaxation", label: "Relaxation Enthusiast", icon: "🏖️" },
  { value: "budget", label: "Budget Explorer", icon: "🧭" },
  { value: "gastronomic", label: "Food Lover", icon: "🍽️" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "ja", label: "日本語" },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: session?.user?.name || "Traveler",
    email: session?.user?.email || "",
    bio: "Passionate traveler exploring the world's hidden gems and cultural treasures.",
    location: "New York, USA",
    language: "en",
    travelStyle: "cultural",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [savedCities] = useState([
    { id: "1", name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=100&h=100&fit=crop" },
    { id: "2", name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop" },
    { id: "3", name: "Barcelona", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=100&h=100&fit=crop" },
  ]);

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="text-sm text-muted hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl mb-4 font-serif font-bold text-foreground">
            My Travel Profile
          </h1>
          <p className="text-lg text-muted italic font-serif">
            Your personal travel identity and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="book-card p-6 text-center sticky top-4">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={profile.profileImage || ""}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-2 border-border"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    ✏️
                  </button>
                )}
              </div>
              <h2 className="text-xl font-serif font-bold mb-2">{profile.name}</h2>
              <p className="text-muted text-sm mb-4">{profile.location}</p>
              <p className="text-sm text-muted italic line-clamp-3">{profile.bio}</p>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg">
                    {travelStyles.find(s => s.value === profile.travelStyle)?.icon}
                  </span>
                  <span className="text-sm font-medium">
                    {travelStyles.find(s => s.value === profile.travelStyle)?.label}
                  </span>
                </div>
                <p className="text-xs text-muted uppercase tracking-widest">
                  Travel Style
                </p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="book-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold">Basic Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-muted">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <p className="text-muted">{profile.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={3}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-muted">{profile.bio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-muted">{profile.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="book-card p-6">
              <h3 className="text-xl font-serif font-bold mb-6">Travel Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Travel Style</label>
                  {isEditing ? (
                    <select
                      value={profile.travelStyle}
                      onChange={(e) => handleInputChange("travelStyle", e.target.value)}
                      className="w-full"
                    >
                      {travelStyles.map((style) => (
                        <option key={style.value} value={style.value}>
                          {style.icon} {style.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {travelStyles.find(s => s.value === profile.travelStyle)?.icon}
                      </span>
                      <span className="text-muted">
                        {travelStyles.find(s => s.value === profile.travelStyle)?.label}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Language</label>
                  {isEditing ? (
                    <select
                      value={profile.language}
                      onChange={(e) => handleInputChange("language", e.target.value)}
                      className="w-full"
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-muted">
                      {languages.find(l => l.value === profile.language)?.label}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Saved Cities */}
            <div className="book-card p-6">
              <h3 className="text-xl font-serif font-bold mb-6">Saved Destinations</h3>

              {savedCities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted italic">No saved cities yet</p>
                  <Link href="/search/cities" className="ink-link text-sm mt-2 inline-block">
                    Discover cities
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {savedCities.map((city) => (
                    <div key={city.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                      <Image
                        src={city.image}
                        alt={city.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{city.name}</p>
                        <p className="text-xs text-muted">{city.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="book-card p-6">
              <h3 className="text-xl font-serif font-bold mb-6">Account Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted">Receive trip updates and recommendations</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium">Privacy</p>
                    <p className="text-sm text-muted">Make profile visible to other travelers</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>

                <div className="pt-4">
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button onClick={handleSave} className="primary">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}