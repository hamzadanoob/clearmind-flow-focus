
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created: Date;
}

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Project Ideas',
      content: 'Some exciting project ideas for the future...',
      tags: ['ideas', 'projects'],
      created: new Date(),
    },
    {
      id: '2',
      title: 'Meeting Notes',
      content: 'Key points from today\'s team meeting...',
      tags: ['meetings', 'work'],
      created: new Date(),
    },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      tags: [],
      created: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsCreating(true);
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, ...updates } : note
    ));
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote({ ...selectedNote, ...updates });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Notes
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Capture your thoughts and organize your ideas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button size="sm" onClick={createNewNote}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedNote?.id === note.id
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <h4 className="font-medium text-sm text-slate-800 dark:text-slate-100 truncate">
                    {note.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate">
                    {note.content || 'No content'}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selectedNote ? (
            <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20">
              <div className="space-y-4">
                <Input
                  value={selectedNote.title}
                  onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                  className="text-xl font-semibold border-0 bg-transparent p-0 focus:ring-0"
                  placeholder="Note title..."
                />
                
                <Textarea
                  value={selectedNote.content}
                  onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                  placeholder="Start writing your note..."
                  className="min-h-[400px] resize-none border-0 bg-transparent p-0 focus:ring-0"
                />

                <div className="flex flex-wrap gap-2">
                  {selectedNote.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-white/20 dark:border-slate-700/20 text-center">
              <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                Select a note to start editing or create a new one
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
