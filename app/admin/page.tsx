"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface AnalyticsData {
  totalUsers: number;
  totalTrips: number;
  totalCities: number;
  totalActivities: number;
  monthlyStats: {
    month: string;
    users: number;
    trips: number;
    activities: number;
  }[];
  topCities: {
    name: string;
    country: string;
    visits: number;
  }[];
  activityCategories: {
    name: string;
    count: number;
    color: string;
  }[];
  userEngagement: {
    activeUsers: number;
    avgTripsPerUser: number;
    avgActivitiesPerTrip: number;
  };
}

// Mock analytics data
const mockAnalytics: AnalyticsData = {
  totalUsers: 1247,
  totalTrips: 2156,
  totalCities: 89,
  totalActivities: 5432,
  monthlyStats: [
    { month: "Jan", users: 120, trips: 180, activities: 450 },
    { month: "Feb", users: 145, trips: 210, activities: 520 },
    { month: "Mar", users: 167, trips: 245, activities: 610 },
    { month: "Apr", users: 189, trips: 280, activities: 720 },
    { month: "May", users: 201, trips: 310, activities: 780 },
    { month: "Jun", users: 225, trips: 345, activities: 850 },
  ],
  topCities: [
    { name: "Paris", country: "France", visits: 234 },
    { name: "Tokyo", country: "Japan", visits: 198 },
    { name: "Barcelona", country: "Spain", visits: 176 },
    { name: "Rome", country: "Italy", visits: 165 },
    { name: "New York", country: "USA", visits: 142 },
  ],
  activityCategories: [
    { name: "Sightseeing", count: 1456, color: "#A04000" },
    { name: "Food", count: 1234, color: "#D3B89E" },
    { name: "Culture", count: 987, color: "#8B4513" },
    { name: "Adventure", count: 876, color: "#C8B6A6" },
    { name: "Nightlife", count: 543, color: "#A0937D" },
    { name: "Nature", count: 336, color: "#8B7355" },
  ],
  userEngagement: {
    activeUsers: 892,
    avgTripsPerUser: 1.7,
    avgActivitiesPerTrip: 2.5,
  },
};

export default function AdminPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Loading analytics...
      </div>
    );
  }

  if (!data) return null;

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
            Travel Analytics
          </h1>
          <p className="text-lg text-muted italic font-serif">
            Platform insights and travel trends
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-xl font-bold text-primary">{data.totalUsers.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl mb-1">🗺️</div>
            <div className="text-xl font-bold text-primary">{data.totalTrips.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">Total Trips</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl mb-1">🏙️</div>
            <div className="text-xl font-bold text-primary">{data.totalCities}</div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">Cities</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xl font-bold text-primary">{data.totalActivities.toLocaleString()}</div>
            <div className="text-xs uppercase tracking-widest text-muted font-serif">Activities</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Growth */}
          <div className="book-card p-6">
            <h3 className="text-xl font-serif font-bold mb-6">Monthly Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c8b6a6" />
                <XAxis dataKey="month" stroke="#3e2723" />
                <YAxis stroke="#3e2723" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fdfcf0",
                    border: "1px solid #c8b6a6",
                    borderRadius: "4px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#a04000"
                  strokeWidth={2}
                  name="New Users"
                />
                <Line
                  type="monotone"
                  dataKey="trips"
                  stroke="#8b4513"
                  strokeWidth={2}
                  name="New Trips"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Categories */}
          <div className="book-card p-6">
            <h3 className="text-xl font-serif font-bold mb-6">Activity Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.activityCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ name, percent }) =>
                    `${name}${typeof percent === "number" ? ` ${(percent * 100).toFixed(0)}%` : ""}`
                  }
                >
                  {data.activityCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Cities */}
          <div className="book-card p-6">
            <h3 className="text-xl font-serif font-bold mb-6">Most Popular Cities</h3>
            <div className="space-y-4">
              {data.topCities.map((city, index) => (
                <div key={city.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{city.name}</p>
                      <p className="text-sm text-muted">{city.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{city.visits}</p>
                    <p className="text-xs text-muted">visits</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Engagement */}
          <div className="book-card p-6">
            <h3 className="text-xl font-serif font-bold mb-6">User Engagement</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {data.userEngagement.activeUsers.toLocaleString()}
                </div>
                <p className="text-sm text-muted uppercase tracking-widest">Active Users</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {data.userEngagement.avgTripsPerUser}
                  </div>
                  <p className="text-xs text-muted uppercase tracking-widest">Avg Trips/User</p>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {data.userEngagement.avgActivitiesPerTrip}
                  </div>
                  <p className="text-xs text-muted uppercase tracking-widest">Avg Activities/Trip</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-3">Platform Health</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>User Retention</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Session Time</span>
                    <span className="font-medium">12m 34s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-medium">24.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="mt-12 text-center">
          <div className="book-card p-6 max-w-md mx-auto">
            <h3 className="text-lg font-serif font-bold mb-4">Export Analytics</h3>
            <div className="flex gap-4 justify-center">
              <button className="secondary px-6 py-2">
                📊 CSV Export
              </button>
              <button className="secondary px-6 py-2">
                📈 PDF Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}