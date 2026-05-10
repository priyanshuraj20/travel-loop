"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CreateTripFormData {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelStyle: string;
  estimatedBudget: number;
  coverImageFile?: File;
}

const travelStyles = [
  {
    id: "luxury",
    label: "Luxury",
    icon: "👑",
    description: "High-end comfort & exclusivity",
  },
  {
    id: "adventure",
    label: "Adventure",
    icon: "⛺",
    description: "Active & adrenaline-filled",
  },
  {
    id: "cultural",
    label: "Cultural",
    icon: "🏛️",
    description: "History & heritage exploration",
  },
  {
    id: "relaxation",
    label: "Relaxation",
    icon: "🏖️",
    description: "Beach & wellness retreats",
  },
  {
    id: "budget",
    label: "Budget",
    icon: "🧭",
    description: "Backpacking & indie travel",
  },
  {
    id: "gastronomic",
    label: "Food",
    icon: "🍽️",
    description: "Culinary discoveries",
  },
];

export default function CreateTripPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null,
  );

  const [formData, setFormData] = useState<CreateTripFormData>({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelStyle: "adventure",
    estimatedBudget: 2500,
  });

  const steps = [
    { title: "Trip Name", description: "What's your journey called?" },
    { title: "Destination", description: "Where are you headed?" },
    { title: "Travel Dates", description: "When does your adventure begin?" },
    { title: "Cover Image", description: "Set the mood with an image" },
    { title: "Travel Style", description: "What's your travel vibe?" },
    { title: "Budget", description: "Set your estimated budget" },
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim().length > 2;
      case 1:
        return formData.destination.trim().length > 2;
      case 2:
        return (
          formData.startDate &&
          formData.endDate &&
          formData.startDate < formData.endDate
        );
      case 3:
        return true;
      case 4:
        return !!formData.travelStyle;
      case 5:
        return formData.estimatedBudget > 0;
      default:
        return false;
    }
  };

  const handleInputChange = (field: keyof CreateTripFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange("coverImageFile", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      setError("Please complete this step before proceeding");
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid()) {
      setError("Please complete all steps");
      return;
    }

    setLoading(true);
    try {
      const tripData = {
        name: formData.name,
        description: `${formData.travelStyle} trip to ${formData.destination}`,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        travelStyle: formData.travelStyle,
        estimatedBudget: formData.estimatedBudget,
      };

      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error("Failed to create trip");
      }

      const newTrip = await response.json();
      router.push(`/trips/${newTrip.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const getDayCount = () => {
    if (formData.startDate && formData.endDate) {
      return Math.ceil(
        (new Date(formData.endDate).getTime() -
          new Date(formData.startDate).getTime()) /
          (1000 * 60 * 60 * 24),
      );
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/trips"
            className="text-sm text-muted hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to Trips
          </Link>
          <h1 className="text-4xl font-serif font-bold mb-2 text-foreground">
            Plan Your Journey
          </h1>
          <p className="text-muted">
            Let's create your next unforgettable adventure
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 px-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative flex-1"
              >
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold transition-all duration-300 z-10 ${
                    index <= currentStep
                      ? "bg-primary text-white shadow-md"
                      : "bg-border text-muted"
                  }`}
                >
                  {index + 1}
                </div>
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-1 transition-all duration-300 ${
                      index < currentStep ? "bg-primary" : "bg-border"
                    }`}
                    style={{ marginLeft: "20%", width: "60%" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              {steps[currentStep].title}
            </h2>
            <p className="text-muted mt-2 text-sm">
              {steps[currentStep].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="book-card p-8 mb-8 min-h-80 flex flex-col justify-center animate-fade-in">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-muted mb-3">
                  Trip Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Summer in Europe 2024"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full text-lg p-3 border border-border rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  autoFocus
                />
              </div>
              <p className="text-xs text-muted italic">
                Give your trip a memorable name that captures its essence
              </p>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-muted mb-3">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g., Paris, France"
                  value={formData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  className="w-full text-lg p-3 border border-border rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  autoFocus
                />
              </div>
              <p className="text-xs text-muted italic">
                Be specific - include city and country
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted mb-3">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    className="w-full p-3 border border-border rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted mb-3">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    className="w-full p-3 border border-border rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              {formData.startDate && formData.endDate && (
                <div className="bg-primary/5 border border-primary/20 rounded p-3">
                  <p className="text-sm text-primary font-serif font-bold">
                    {getDayCount()} days of adventure await
                  </p>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/2 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                  id="cover-image"
                />
                <label htmlFor="cover-image" className="block cursor-pointer">
                  {coverImagePreview ? (
                    <div className="space-y-3">
                      <img
                        src={coverImagePreview}
                        alt="Preview"
                        className="w-40 h-40 object-cover mx-auto rounded shadow-sm"
                      />
                      <p className="text-sm text-muted">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-4xl">📸</p>
                      <p className="text-sm font-bold text-foreground">
                        Click to upload
                      </p>
                      <p className="text-xs text-muted">
                        or drag and drop your image
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleInputChange("travelStyle", style.id)}
                    className={`p-4 rounded border-2 transition-all text-center transform hover:scale-105 ${
                      formData.travelStyle === style.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-page/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{style.icon}</div>
                    <div className="text-sm font-bold text-foreground">
                      {style.label}
                    </div>
                    <div className="text-xs text-muted">
                      {style.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-muted mb-3">
                  Estimated Budget (USD)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="100"
                    value={formData.estimatedBudget}
                    onChange={(e) =>
                      handleInputChange(
                        "estimatedBudget",
                        parseInt(e.target.value),
                      )
                    }
                    className="flex-1 h-2 bg-border rounded accent-primary cursor-pointer"
                  />
                  <input
                    type="number"
                    value={formData.estimatedBudget}
                    onChange={(e) =>
                      handleInputChange(
                        "estimatedBudget",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="w-28 p-2 text-right border border-border rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded p-4 space-y-2">
                <p className="text-sm text-foreground">
                  Budget:{" "}
                  <span className="font-bold text-primary text-lg">
                    ${formData.estimatedBudget.toLocaleString()}
                  </span>
                </p>
                <p className="text-xs text-muted">
                  You can adjust this as you plan your trip
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm animate-pulse">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-2.5 border rounded text-sm font-bold uppercase tracking-widest transition-all ${
              currentStep === 0
                ? "border-border text-muted opacity-50 cursor-not-allowed"
                : "border-primary text-primary hover:bg-primary/5 active:scale-95"
            }`}
          >
            Back
          </button>

          <div className="text-xs text-muted font-serif">
            Step {currentStep + 1} of {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-6 py-2.5 rounded text-sm font-bold uppercase tracking-widest transition-all ${
                isStepValid()
                  ? "bg-primary text-white hover:bg-accent shadow-md hover:shadow-lg active:scale-95"
                  : "bg-border text-muted opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className={`px-6 py-2.5 rounded text-sm font-bold uppercase tracking-widest transition-all ${
                !isStepValid() || loading
                  ? "bg-border text-muted opacity-50 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-accent shadow-md hover:shadow-lg active:scale-95"
              }`}
            >
              {loading ? "Creating..." : "Begin Journey"}
            </button>
          )}
        </div>

        <p className="text-center text-xs text-muted italic font-serif">
          Every great journey begins with a single step
        </p>
      </div>
    </div>
  );
}
