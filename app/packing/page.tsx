"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  isChecked: boolean;
}

interface PackingCategory {
  name: string;
  items: PackingItem[];
}

// Mock data
const initialCategories: PackingCategory[] = [
  {
    name: "Clothing",
    items: [
      { id: "1", name: "T-shirts", category: "Clothing", isChecked: true },
      { id: "2", name: "Jeans", category: "Clothing", isChecked: false },
      { id: "3", name: "Underwear", category: "Clothing", isChecked: true },
      { id: "4", name: "Socks", category: "Clothing", isChecked: true },
      { id: "5", name: "Jacket", category: "Clothing", isChecked: false },
      { id: "6", name: "Swimwear", category: "Clothing", isChecked: false },
    ],
  },
  {
    name: "Documents",
    items: [
      { id: "7", name: "Passport", category: "Documents", isChecked: true },
      { id: "8", name: "Visa", category: "Documents", isChecked: false },
      {
        id: "9",
        name: "Travel Insurance",
        category: "Documents",
        isChecked: false,
      },
      {
        id: "10",
        name: "Driver's License",
        category: "Documents",
        isChecked: true,
      },
      {
        id: "11",
        name: "Credit Cards",
        category: "Documents",
        isChecked: true,
      },
      {
        id: "12",
        name: "Hotel Reservations",
        category: "Documents",
        isChecked: false,
      },
    ],
  },
  {
    name: "Electronics",
    items: [
      { id: "13", name: "Phone", category: "Electronics", isChecked: true },
      { id: "14", name: "Charger", category: "Electronics", isChecked: true },
      {
        id: "15",
        name: "Headphones",
        category: "Electronics",
        isChecked: false,
      },
      { id: "16", name: "Camera", category: "Electronics", isChecked: false },
      {
        id: "17",
        name: "Power Adapter",
        category: "Electronics",
        isChecked: false,
      },
      {
        id: "18",
        name: "Portable Battery",
        category: "Electronics",
        isChecked: false,
      },
    ],
  },
  {
    name: "Toiletries",
    items: [
      { id: "19", name: "Toothbrush", category: "Toiletries", isChecked: true },
      { id: "20", name: "Toothpaste", category: "Toiletries", isChecked: true },
      { id: "21", name: "Shampoo", category: "Toiletries", isChecked: false },
      { id: "22", name: "Deodorant", category: "Toiletries", isChecked: false },
      { id: "23", name: "Sunscreen", category: "Toiletries", isChecked: false },
      {
        id: "24",
        name: "First Aid Kit",
        category: "Toiletries",
        isChecked: false,
      },
    ],
  },
];

export default function PackingPage() {
  const [categories, setCategories] = useState<PackingCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Clothing");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(initialCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleItem = (itemId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        items: category.items.map((item) =>
          item.id === itemId ? { ...item, isChecked: !item.isChecked } : item,
        ),
      })),
    );
  };

  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: selectedCategory,
      isChecked: false,
    };

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.name === selectedCategory
          ? { ...category, items: [...category.items, newItem] }
          : category,
      ),
    );

    setNewItemName("");
  };

  const removeItem = (itemId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        items: category.items.filter((item) => item.id !== itemId),
      })),
    );
  };

  const getTotalItems = () => {
    return categories.reduce(
      (total, category) => total + category.items.length,
      0,
    );
  };

  const getPackedItems = () => {
    return categories.reduce(
      (total, category) =>
        total + category.items.filter((item) => item.isChecked).length,
      0,
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center italic font-serif text-muted fade-in">
        Organizing your packing list...
      </div>
    );
  }

  const totalItems = getTotalItems();
  const packedItems = getPackedItems();
  const progressPercentage =
    totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 fade-in">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">Packing Checklist</h1>
        <p className="text-lg text-muted italic font-serif">
          Never forget the essentials on your journey
        </p>

        {/* Progress Overview */}
        <div className="mt-8 book-card p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Packing Progress</span>
            <span className="text-sm uppercase tracking-widest text-muted font-serif">
              {packedItems} / {totalItems} items
            </span>
          </div>
          <div className="h-3 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-muted">
            {progressPercentage.toFixed(1)}% complete
          </div>
        </div>
      </header>

      {/* Add New Item */}
      <div className="book-card p-6 mb-8">
        <h2 className="text-2xl mb-4">Add New Item</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter item name..."
            className="flex-grow"
            onKeyPress={(e) => e.key === "Enter" && addItem()}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-border bg-page/30 rounded"
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={addItem} className="primary">
            Add Item
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryPacked = category.items.filter(
            (item) => item.isChecked,
          ).length;
          const categoryTotal = category.items.length;
          const categoryProgress =
            categoryTotal > 0 ? (categoryPacked / categoryTotal) * 100 : 0;

          return (
            <div key={category.name} className="book-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">{category.name}</h2>
                <div className="text-sm uppercase tracking-widest text-muted font-serif">
                  {categoryPacked} / {categoryTotal} packed
                </div>
              </div>

              {/* Category Progress */}
              <div className="h-2 bg-secondary/30 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${categoryProgress}%` }}
                ></div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded transition-all duration-300 ${
                      item.isChecked
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-page/30 border border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          item.isChecked
                            ? "bg-primary border-primary"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {item.isChecked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                      <span
                        className={`transition-all duration-300 ${
                          item.isChecked
                            ? "line-through text-muted"
                            : "text-foreground"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted hover:text-red-500 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-12">
        <Link href="/dashboard" className="secondary">
          Back to Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/itinerary" className="secondary">
            View Itinerary
          </Link>
          <Link href="/budget" className="primary">
            Budget Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
