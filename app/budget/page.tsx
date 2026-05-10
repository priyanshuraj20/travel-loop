"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  color: string;
}

interface BudgetData {
  totalBudget: number;
  totalSpent: number;
  categories: BudgetCategory[];
  dailyAverage: number;
  alerts: string[];
}

// Mock data
const mockBudgetData: BudgetData = {
  totalBudget: 3500,
  totalSpent: 2100,
  categories: [
    { name: "Transport", spent: 800, budget: 1400, color: "#A04000" },
    { name: "Accommodation", spent: 700, budget: 1225, color: "#D3B89E" },
    { name: "Activities", spent: 400, budget: 525, color: "#8B4513" },
    { name: "Food", spent: 150, budget: 350, color: "#C8B6A6" },
    { name: "Miscellaneous", spent: 50, budget: 175, color: "#A0937D" },
  ],
  dailyAverage: 150,
  alerts: [
    "Transport budget is 43% over allocated amount",
    "Consider reducing accommodation costs to stay within budget",
  ],
};

const COLORS = ["#A04000", "#D3B89E", "#8B4513", "#C8B6A6", "#A0937D"];

export default function BudgetPage() {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBudgetData(mockBudgetData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Calculating your expenses...
      </div>
    );
  }

  if (!budgetData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="book-card p-8 text-center">
          <p className="text-xl italic font-serif text-muted mb-4">
            No budget data found
          </p>
          <Link href="/trips/create" className="ink-link">
            Create a new trip
          </Link>
        </div>
      </div>
    );
  }

  const remainingBudget = budgetData.totalBudget - budgetData.totalSpent;
  const budgetUtilization =
    (budgetData.totalSpent / budgetData.totalBudget) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 fade-in">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Financial Ledger</h1>
        <p className="text-lg text-muted italic font-serif">
          Track your spending and stay within budget
        </p>
      </header>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="book-card p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            ${budgetData.totalSpent.toLocaleString()}
          </div>
          <div className="text-sm uppercase tracking-widest text-muted font-serif">
            Total Spent
          </div>
          <div className="mt-2 text-xs text-muted">
            of ${budgetData.totalBudget.toLocaleString()} budget
          </div>
        </div>

        <div className="book-card p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            ${remainingBudget.toLocaleString()}
          </div>
          <div className="text-sm uppercase tracking-widest text-muted font-serif">
            Remaining
          </div>
          <div className="mt-2 text-xs text-muted">
            {((remainingBudget / budgetData.totalBudget) * 100).toFixed(1)}%
            left
          </div>
        </div>

        <div className="book-card p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            ${budgetData.dailyAverage}
          </div>
          <div className="text-sm uppercase tracking-widest text-muted font-serif">
            Daily Average
          </div>
          <div className="mt-2 text-xs text-muted">per day spent</div>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="book-card p-8 mb-12">
        <h2 className="text-2xl mb-6">Overall Budget Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-sm uppercase tracking-widest text-muted font-serif">
            <span>Progress</span>
            <span>{budgetUtilization.toFixed(1)}%</span>
          </div>
          <div className="h-4 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${Math.min(100, budgetUtilization)}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted">
              Spent: ${budgetData.totalSpent.toLocaleString()}
            </span>
            <span className="text-muted">
              Budget: ${budgetData.totalBudget.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Pie Chart */}
        <div className="book-card p-8">
          <h2 className="text-2xl mb-6">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData.categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="spent"
              >
                {budgetData.categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Spent"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="book-card p-8">
          <h2 className="text-2xl mb-6">Budget vs Actual</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData.categories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `$${value}`,
                  name === "spent" ? "Spent" : "Budget",
                ]}
              />
              <Bar dataKey="budget" fill="#D3B89E" name="budget" />
              <Bar dataKey="spent" fill="#A04000" name="spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="book-card p-8 mb-12">
        <h2 className="text-2xl mb-6">Detailed Breakdown</h2>
        <div className="space-y-6">
          {budgetData.categories.map((category, index) => {
            const utilization = (category.spent / category.budget) * 100;
            const isOverBudget = category.spent > category.budget;

            return (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{category.name}</span>
                  <div className="text-right">
                    <div className="text-sm">
                      ${category.spent} / ${category.budget}
                    </div>
                    <div
                      className={`text-xs uppercase tracking-widest font-serif ${isOverBudget ? "text-red-600" : "text-muted"}`}
                    >
                      {utilization.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-out rounded-full ${
                      isOverBudget ? "bg-red-500" : "bg-primary"
                    }`}
                    style={{ width: `${Math.min(100, utilization)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Alerts */}
      {budgetData.alerts.length > 0 && (
        <div className="book-card p-8 mb-12 border-l-4 border-l-red-500">
          <h2 className="text-2xl mb-6 text-red-600">Budget Alerts</h2>
          <div className="space-y-3">
            {budgetData.alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="text-muted italic font-serif">{alert}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Link href="/dashboard" className="secondary">
          Back to Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/itinerary" className="secondary">
            View Itinerary
          </Link>
          <Link href="/packing" className="primary">
            Packing List
          </Link>
        </div>
      </div>
    </div>
  );
}
