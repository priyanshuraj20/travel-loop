import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Loop - Your Autumn Journey",
  description: "Plan and manage your travels with a classic touch.",
};

import { Providers } from "./components/providers";
import Header from "./components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans selection:bg-primary/20">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
        </Providers>
        <footer className="py-8 text-center text-muted text-sm border-t border-border mt-auto">
          <p className="font-serif italic">
            Recorded in the annals of time. &copy; {new Date().getFullYear()}{" "}
            Travel Loop
          </p>
        </footer>
      </body>
    </html>
  );
}
