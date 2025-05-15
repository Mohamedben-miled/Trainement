import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper function to get the user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
}

// Helper function to update the user profile
export async function updateUserProfile(userId: string, profile: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userId);
  
  if (error) {
    throw error;
  }
  
  return data;
}

// Helper function to create a workout program
export async function createWorkoutProgram(program: any) {
  const { data, error } = await supabase
    .from('workout_programs')
    .insert(program)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data;
}

// Helper function to get a user's workout programs
export async function getUserWorkoutPrograms(userId: string) {
  const { data, error } = await supabase
    .from('workout_programs')
    .select('*')
    .eq('userId', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return data;
}

// Helper function to save workout feedback
export async function saveWorkoutFeedback(feedback: any) {
  const { data, error } = await supabase
    .from('workout_feedback')
    .insert(feedback)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data;
}
