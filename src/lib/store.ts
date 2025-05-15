import { create } from 'zustand';

// Define the User type
interface User {
  id: string;
  email: string;
  name: string;
}

// Define the Auth state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create the auth store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Define the WorkoutLog type
interface WorkoutLog {
  id: string;
  date: string;
  workoutId: string;
  workoutName: string;
  exercises: ExerciseLog[];
  notes: string;
  perceivedExertion: number;
  energyLevel: number;
}

interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
}

interface SetLog {
  weight: number;
  reps: number;
  completed: boolean;
}

// Define the Progress type
interface ProgressEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photoUrl?: string;
}

// Define the Notes type
interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

// Define the Workout Log state
interface WorkoutLogState {
  logs: WorkoutLog[];
  addLog: (log: WorkoutLog) => void;
  updateLog: (id: string, log: Partial<WorkoutLog>) => void;
  deleteLog: (id: string) => void;
}

// Create the workout log store
export const useWorkoutLogStore = create<WorkoutLogState>((set) => ({
  logs: [],
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  updateLog: (id, updatedLog) =>
    set((state) => ({
      logs: state.logs.map((log) =>
        log.id === id ? { ...log, ...updatedLog } : log
      ),
    })),
  deleteLog: (id) =>
    set((state) => ({
      logs: state.logs.filter((log) => log.id !== id),
    })),
}));

// Define the Progress state
interface ProgressState {
  entries: ProgressEntry[];
  addEntry: (entry: ProgressEntry) => void;
  updateEntry: (id: string, entry: Partial<ProgressEntry>) => void;
  deleteEntry: (id: string) => void;
}

// Create the progress store
export const useProgressStore = create<ProgressState>((set) => ({
  entries: [],
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
  updateEntry: (id, updatedEntry) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
    })),
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
}));

// Define the Notes state
interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

// Create the notes store
export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}));
