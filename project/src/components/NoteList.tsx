import React from 'react';
import { Search, Plus, Clock, Trash2 } from 'lucide-react';
import type { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  searchQuery: string;
  onNoteSelect: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
  onSearchChange: (query: string) => void;
}

export function NoteList({
  notes,
  activeNoteId,
  searchQuery,
  onNoteSelect,
  onNewNote,
  onDeleteNote,
  onSearchChange,
}: NoteListProps) {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-screen overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button
          onClick={onNewNote}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Note
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${
              activeNoteId === note.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onNoteSelect(note.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 truncate flex-1">
                {note.title || 'Untitled'}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 truncate mb-2">{note.content}</p>
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(note.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}