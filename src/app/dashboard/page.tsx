'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore, useWorkoutLogStore, useProgressStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { logs } = useWorkoutLogStore();
  const { entries: progressEntries } = useProgressStore();
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Get the most recent workout log
  const latestWorkout = logs.length > 0 
    ? logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] 
    : null;

  // Get the most recent progress entry
  const latestProgress = progressEntries.length > 0 
    ? progressEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] 
    : null;

  // Calculate streak (consecutive days with workouts)
  const calculateStreak = () => {
    if (logs.length === 0) return 0;
    
    const sortedDates = logs
      .map(log => new Date(log.date).toISOString().split('T')[0])
      .sort()
      .reverse(); // Most recent first
    
    let streak = 1;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Check if the most recent workout was today or yesterday
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
      return 0;
    }
    
    // Count consecutive days
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i]);
      const next = new Date(sortedDates[i + 1]);
      const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const workoutStreak = calculateStreak();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Athlete'}</h1>
          <p className="text-gray-600 dark:text-gray-400">Let's continue your fitness journey</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            href="/workout-program" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Today's Workout
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Workout Streak</h2>
          <div className="flex items-end">
            <span className="text-4xl font-bold text-blue-600">{workoutStreak}</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">days</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {workoutStreak > 0 
              ? 'Keep up the great work!' 
              : 'Complete a workout today to start your streak!'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Workouts Completed</h2>
          <div className="flex items-end">
            <span className="text-4xl font-bold text-green-600">{logs.length}</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">total</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {logs.length > 0 
              ? `Last workout: ${new Date(latestWorkout?.date || '').toLocaleDateString()}` 
              : 'No workouts logged yet'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Current Weight</h2>
          <div className="flex items-end">
            <span className="text-4xl font-bold text-purple-600">
              {latestProgress?.weight || '--'}
            </span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">kg</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {latestProgress 
              ? `Last updated: ${new Date(latestProgress.date).toLocaleDateString()}` 
              : 'No weight data recorded yet'}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link 
          href="/log-workout" 
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow-md p-6 transition-colors"
        >
          <h3 className="font-semibold mb-2">Log Workout</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Record your latest workout session</p>
        </Link>
        
        <Link 
          href="/track-progress" 
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow-md p-6 transition-colors"
        >
          <h3 className="font-semibold mb-2">Track Progress</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Update your measurements and photos</p>
        </Link>
        
        <Link 
          href="/notes" 
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow-md p-6 transition-colors"
        >
          <h3 className="font-semibold mb-2">Fitness Journal</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Add notes about your fitness journey</p>
        </Link>
        
        <Link 
          href="/profile" 
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg shadow-md p-6 transition-colors"
        >
          <h3 className="font-semibold mb-2">Update Profile</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Modify your fitness goals and preferences</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {logs.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {logs
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 5)
              .map((log) => (
                <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{log.workoutName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(log.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full">
                        Exertion: {log.perceivedExertion}/10
                      </span>
                    </div>
                  </div>
                  {log.notes && (
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                      {log.notes.length > 100 ? `${log.notes.substring(0, 100)}...` : log.notes}
                    </p>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">No workout logs yet. Start logging your workouts!</p>
            <Link 
              href="/log-workout" 
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Log Your First Workout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
