"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-xl font-bold tracking-tight uppercase">Travel Loop</span>
        </Link>

        <nav className="flex items-center gap-6">
          {status === "loading" ? (
            <span className="text-xs italic font-serif text-muted">Consulting annals...</span>
          ) : session ? (
            <>
              <Link href="/dashboard" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                My Journal
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors font-bold"
              >
                Close Record
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="primary text-xs uppercase tracking-widest font-bold">
                Begin Journey
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
