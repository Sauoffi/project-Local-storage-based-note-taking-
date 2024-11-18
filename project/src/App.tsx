import React, { useState, useEffect } from 'react';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import type { Note } from './types';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  const handleNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <NoteList
        notes={filteredNotes}
        activeNoteId={activeNoteId}
        searchQuery={searchQuery}
        onNoteSelect={setActiveNoteId}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
        onSearchChange={setSearchQuery}
      />
      <NoteEditor note={activeNote} onUpdateNote={handleUpdateNote} />
    </div>
  );
}

export default App;