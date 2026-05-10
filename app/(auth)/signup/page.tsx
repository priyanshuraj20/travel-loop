"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      router.push("/login?signup=success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="book-card w-full max-w-md p-8 md:p-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-2">Register</h1>
          <p className="text-muted italic font-serif">Start a new chapter</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-primary/10 border border-primary/20 text-primary text-sm text-center italic">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-serif mb-1 uppercase tracking-widest text-muted">Full Name</label>
            <input
              type="text"
              required
              className="w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-serif mb-1 uppercase tracking-widest text-muted">Email Address</label>
            <input
              type="email"
              required
              className="w-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-serif mb-1 uppercase tracking-widest text-muted">Password</label>
            <input
              type="password"
              required
              className="w-full"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary w-full py-3 uppercase tracking-widest font-bold"
          >
            {loading ? "Recording..." : "Join the Journal"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-6">
          <p className="text-sm text-muted mb-2 font-serif italic">Already recorded?</p>
          <Link href="/login" className="text-primary hover:text-accent font-bold uppercase tracking-widest text-xs">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
