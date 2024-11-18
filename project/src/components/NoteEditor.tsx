import React from 'react';
import type { Note } from '../types';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
}

export function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a note or create a new one</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      <input
        type="text"
        value={note.title}
        onChange={(e) =>
          onUpdateNote({ ...note, title: e.target.value, updatedAt: new Date().toISOString() })
        }
        placeholder="Note title"
        className="p-4 text-2xl font-semibold bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500"
      />
      <textarea
        value={note.content}
        onChange={(e) =>
          onUpdateNote({ ...note, content: e.target.value, updatedAt: new Date().toISOString() })
        }
        placeholder="Start writing..."
        className="flex-1 p-4 text-gray-800 bg-transparent resize-none focus:outline-none"
      />
    </div>
  );
}