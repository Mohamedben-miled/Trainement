'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useNotesStore } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the form validation schema
const noteSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  tags: z.string().optional()
});

type NoteFormData = z.infer<typeof noteSchema>;

export default function NotesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: ''
    }
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  // Load selected note data into form
  useEffect(() => {
    if (selectedNote) {
      const note = notes.find(n => n.id === selectedNote);
      if (note) {
        setValue('title', note.title);
        setValue('content', note.content);
        setValue('tags', note.tags.join(', '));
      }
    }
  }, [selectedNote, notes, setValue]);

  const onSubmit = (data: NoteFormData) => {
    // Process tags
    const tags = data.tags 
      ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) 
      : [];

    if (selectedNote) {
      // Update existing note
      updateNote(selectedNote, {
        title: data.title,
        content: data.content,
        tags
      });
    } else {
      // Add new note
      addNote({
        id: `note-${Date.now()}`,
        date: new Date().toISOString(),
        title: data.title,
        content: data.content,
        tags
      });
    }

    // Reset form and selection
    reset({
      title: '',
      content: '',
      tags: ''
    });
    setSelectedNote(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
      if (selectedNote === id) {
        setSelectedNote(null);
        reset({
          title: '',
          content: '',
          tags: ''
        });
      }
    }
  };

  const handleCancel = () => {
    setSelectedNote(null);
    reset({
      title: '',
      content: '',
      tags: ''
    });
  };

  // Filter notes based on search term and selected tag
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm 
      ? note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesTag = selectedTag
      ? note.tags.includes(selectedTag)
      : true;
    
    return matchesSearch && matchesTag;
  });

  // Sort notes by date (newest first)
  const sortedNotes = [...filteredNotes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fitness Journal</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notes List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Notes</h2>
              <button
                onClick={() => {
                  setSelectedNote(null);
                  reset({
                    title: '',
                    content: '',
                    tags: ''
                  });
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                + New Note
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            {allTags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedTag === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {sortedNotes.length > 0 ? (
                sortedNotes.map(note => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note.id)}
                    className={`p-3 rounded-md cursor-pointer ${
                      selectedNote === note.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {note.content}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {notes.length === 0
                    ? 'No notes yet. Create your first note!'
                    : 'No notes match your search.'}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Note Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedNote ? 'Edit Note' : 'New Note'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full p-2 border rounded-md"
                  placeholder="Note title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  {...register('content')}
                  rows={12}
                  className="w-full p-2 border rounded-md"
                  placeholder="Write your thoughts, goals, or reflections..."
                ></textarea>
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  {...register('tags')}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g. motivation, nutrition, goals"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas (e.g. "nutrition, goals, progress")
                </p>
              </div>
              
              <div className="flex justify-between pt-4">
                {selectedNote && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedNote)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
                
                <div className="flex space-x-2">
                  {selectedNote && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {selectedNote ? 'Update Note' : 'Save Note'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
