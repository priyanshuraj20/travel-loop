"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="book-card w-full max-w-md p-8 md:p-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-2">Login</h1>
          <p className="text-muted italic font-serif">Resume your journey</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-primary/10 border border-primary/20 text-primary text-sm text-center italic">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-serif mb-1 uppercase tracking-widest text-muted">Email Address</label>
            <input
              type="email"
              required
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-serif mb-1 uppercase tracking-widest text-muted">Password</label>
            <input
              type="password"
              required
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary w-full py-3 uppercase tracking-widest font-bold"
          >
            {loading ? "Authenticating..." : "Open Journal"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-6">
          <p className="text-sm text-muted mb-2 font-serif italic">New traveler?</p>
          <Link href="/signup" className="text-primary hover:text-accent font-bold uppercase tracking-widest text-xs">
            Begin Your Record
          </Link>
        </div>
      </div>
    </div>
  );
}
