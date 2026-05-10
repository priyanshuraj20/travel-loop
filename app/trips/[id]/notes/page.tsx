"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  day?: number;
  title?: string;
}

// Mock notes data
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Arrival in Paris",
    content: "Landed at CDG after a long flight. The city looks even more beautiful than I imagined. The architecture, the people, the energy - it's all so vibrant. Can't wait to explore tomorrow!",
    createdAt: "2024-07-01T10:30:00Z",
    day: 1,
  },
  {
    id: "2",
    title: "Eiffel Tower Experience",
    content: "Visited the Eiffel Tower today. The views from the top are absolutely breathtaking. We went up at sunset and watched the city lights come on. Magical experience. The crowds were manageable in the morning.",
    createdAt: "2024-07-02T18:45:00Z",
    day: 2,
  },
  {
    id: "3",
    title: "Louvre Reflections",
    content: "Spent the entire day at the Louvre. Mona Lisa was smaller than expected but the Venus de Milo was stunning. The museum is overwhelming in its size and collection. Need to come back for the Egyptian wing.",
    createdAt: "2024-07-03T20:15:00Z",
    day: 3,
  },
  {
    id: "4",
    title: "Seine River Cruise",
    content: "Evening cruise on the Seine was perfect. The bridges, the buildings, the lights reflecting on the water - pure romance. We had champagne and watched the sun set. Best decision of the trip so far.",
    createdAt: "2024-07-04T22:00:00Z",
    day: 4,
  },
  {
    id: "5",
    title: "Travel to Barcelona",
    content: "Took the high-speed train to Barcelona this morning. The French countryside was gorgeous. Now settling into our hotel in the Gothic Quarter. The architecture here is so different from Paris - more colorful and ornate.",
    createdAt: "2024-07-05T16:20:00Z",
    day: 5,
  },
];

export default function TripNotesPage() {
  const params = useParams();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState({ title: "", content: "" });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotes(mockNotes);
    }, 500);
  }, [params.id]);

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      day: Math.max(...notes.map(n => n.day || 0), 0) + 1,
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: "", content: "" });
    setIsAddingNote(false);
  };

  const handleEditNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setEditingNote(noteId);
      setEditContent({ title: note.title || "", content: note.content });
    }
  };

  const handleSaveEdit = () => {
    setNotes(prev => prev.map(note =>
      note.id === editingNote
        ? { ...note, title: editContent.title, content: editContent.content }
        : note
    ));
    setEditingNote(null);
    setEditContent({ title: "", content: "" });
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(prev => prev.filter(note => note.id !== noteId));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href={`/trips/${params.id}`}
            className="text-sm text-muted hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to Trip
          </Link>
          <h1 className="text-4xl md:text-5xl mb-4 font-serif font-bold text-foreground">
            Travel Journal
          </h1>
          <p className="text-lg text-muted italic font-serif">
            Document your memories and reflections
          </p>
        </div>

        {/* Add Note Button */}
        <div className="mb-8 text-center">
          {!isAddingNote && (
            <button
              onClick={() => setIsAddingNote(true)}
              className="primary text-lg px-8 py-4"
            >
              ✍️ Write New Entry
            </button>
          )}
        </div>

        {/* Add Note Form */}
        {isAddingNote && (
          <div className="book-card p-6 mb-8">
            <h3 className="text-xl font-serif font-bold mb-4">New Journal Entry</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Entry title..."
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                className="w-full"
              />
              <textarea
                placeholder="Write your thoughts, memories, and reflections..."
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="w-full"
              />
              <div className="flex gap-4">
                <button onClick={handleAddNote} className="primary">
                  Save Entry
                </button>
                <button
                  onClick={() => {
                    setIsAddingNote(false);
                    setNewNote({ title: "", content: "" });
                  }}
                  className="secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-6">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <div className="book-card p-8 max-w-md mx-auto">
                <p className="text-xl italic font-serif text-muted mb-4">
                  Your journal is empty
                </p>
                <p className="text-sm text-muted mb-6">
                  Start documenting your travel experiences and memories
                </p>
                <button
                  onClick={() => setIsAddingNote(true)}
                  className="primary"
                >
                  Write First Entry
                </button>
              </div>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="book-card p-6">
                {editingNote === note.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editContent.title}
                      onChange={(e) => setEditContent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full text-xl font-serif font-bold"
                    />
                    <textarea
                      value={editContent.content}
                      onChange={(e) => setEditContent(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                      className="w-full"
                    />
                    <div className="flex gap-4">
                      <button onClick={handleSaveEdit} className="primary">
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingNote(null)}
                        className="secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold mb-1">
                          {note.title}
                        </h3>
                        <p className="text-sm text-muted">
                          {formatDate(note.createdAt)}
                          {note.day && ` • Day ${note.day}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditNote(note.id)}
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      {note.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3 text-muted leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Journal Stats */}
        {notes.length > 0 && (
          <div className="mt-12 book-card p-6 text-center">
            <h3 className="text-xl font-serif font-bold mb-4">Journal Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-primary">{notes.length}</div>
                <div className="text-xs uppercase tracking-widest text-muted">Entries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {notes.reduce((sum, note) => sum + note.content.split(' ').length, 0)}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted">Words</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {Math.max(...notes.map(n => n.day || 0))}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted">Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}