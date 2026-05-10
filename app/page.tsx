import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 px-4 flex flex-col items-center text-center bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] border-b border-border">
        <div className="max-w-3xl fade-in">
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight">Every Journey is a <br/><span className="italic text-primary">New Chapter</span></h1>
          <p className="text-xl md:text-2xl font-serif italic text-muted mb-10">
            Document your travels in a timeless digital journal. Plan itineraries, track budgets, and preserve memories with a classic touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="primary text-lg px-10 py-4 uppercase tracking-widest font-bold">Begin Your First Entry</button>
            </Link>
            <Link href="/login">
              <button className="secondary text-lg px-10 py-4 uppercase tracking-widest font-bold">Resume Previous Record</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl w-full py-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="book-card p-10 flex flex-col items-center text-center">
          <div className="w-16 h-px bg-primary/30 mb-8"></div>
          <h3 className="text-2xl mb-4 uppercase tracking-wide">Elegant Planning</h3>
          <p className="text-muted font-serif italic">Craft detailed itineraries with a distraction-free interface designed for focus.</p>
        </div>

        <div className="book-card p-10 flex flex-col items-center text-center">
          <div className="w-16 h-px bg-primary/30 mb-8"></div>
          <h3 className="text-2xl mb-4 uppercase tracking-wide">Budget Ledger</h3>
          <p className="text-muted font-serif italic">Keep your finances in order with our summarized financial views and category breakdowns.</p>
        </div>

        <div className="book-card p-10 flex flex-col items-center text-center">
          <div className="w-16 h-px bg-primary/30 mb-8"></div>
          <h3 className="text-2xl mb-4 uppercase tracking-wide">World Discovery</h3>
          <p className="text-muted font-serif italic">Find inspiration from popular destinations and save them to your personal collection.</p>
        </div>
      </section>

      {/* Aesthetic Divider */}
      <div className="w-full flex justify-center py-12">
        <div className="w-32 h-px bg-border relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
            <span className="text-primary text-xl font-serif">V</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="w-full py-24 px-4 bg-page text-center border-y border-border">
        <h2 className="text-4xl mb-6 italic font-serif">"The world is a book and those who do not travel read only one page."</h2>
        <p className="text-muted uppercase tracking-widest font-bold text-sm mb-10">— Augustine of Hippo</p>
        <Link href="/signup" className="ink-link text-xl font-bold uppercase tracking-widest">Start Your Personal Record Today</Link>
      </section>
    </div>
  );
}
