'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useProgressStore } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the form validation schema
const progressSchema = z.object({
  date: z.string(),
  weight: z.number().min(30, { message: 'Weight must be at least 30 kg' }),
  bodyFat: z.number().min(3).max(50).optional(),
  chest: z.number().min(50).max(200).optional(),
  waist: z.number().min(50).max(200).optional(),
  hips: z.number().min(50).max(200).optional(),
  arms: z.number().min(20).max(100).optional(),
  thighs: z.number().min(30).max(100).optional(),
});

type ProgressFormData = z.infer<typeof progressSchema>;

export default function TrackProgressPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { entries, addEntry, updateEntry, deleteEntry } = useProgressStore();
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProgressFormData>({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      weight: 70,
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

  // Load selected entry data into form
  useEffect(() => {
    if (selectedEntry) {
      const entry = entries.find(e => e.id === selectedEntry);
      if (entry) {
        setValue('date', entry.date);
        setValue('weight', entry.weight);
        if (entry.bodyFat) setValue('bodyFat', entry.bodyFat);
        if (entry.measurements?.chest) setValue('chest', entry.measurements.chest);
        if (entry.measurements?.waist) setValue('waist', entry.measurements.waist);
        if (entry.measurements?.hips) setValue('hips', entry.measurements.hips);
        if (entry.measurements?.arms) setValue('arms', entry.measurements.arms);
        if (entry.measurements?.thighs) setValue('thighs', entry.measurements.thighs);
      }
    }
  }, [selectedEntry, entries, setValue]);

  const onSubmit = (data: ProgressFormData) => {
    if (selectedEntry) {
      // Update existing entry
      updateEntry(selectedEntry, {
        date: data.date,
        weight: data.weight,
        bodyFat: data.bodyFat,
        measurements: {
          chest: data.chest,
          waist: data.waist,
          hips: data.hips,
          arms: data.arms,
          thighs: data.thighs,
        }
      });
      setSelectedEntry(null);
    } else {
      // Add new entry
      addEntry({
        id: `progress-${Date.now()}`,
        date: data.date,
        weight: data.weight,
        bodyFat: data.bodyFat,
        measurements: {
          chest: data.chest,
          waist: data.waist,
          hips: data.hips,
          arms: data.arms,
          thighs: data.thighs,
        }
      });
    }

    // Reset form
    reset({
      date: new Date().toISOString().split('T')[0],
      weight: 70,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this progress entry?')) {
      deleteEntry(id);
      if (selectedEntry === id) {
        setSelectedEntry(null);
        reset({
          date: new Date().toISOString().split('T')[0],
          weight: 70,
        });
      }
    }
  };

  const handleCancel = () => {
    setSelectedEntry(null);
    reset({
      date: new Date().toISOString().split('T')[0],
      weight: 70,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Prepare data for weight chart
  const weightChartData = [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      weight: entry.weight
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Track Your Progress</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Entry Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedEntry ? 'Update Progress Entry' : 'Add New Progress Entry'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  {...register('date')}
                  className="w-full p-2 border rounded-md"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register('weight', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Body Fat % (optional)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register('bodyFat', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.bodyFat && <p className="text-red-500 text-sm mt-1">{errors.bodyFat.message}</p>}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Measurements (cm, optional)</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Chest</label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('chest', { valueAsNumber: true })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Waist</label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('waist', { valueAsNumber: true })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Hips</label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('hips', { valueAsNumber: true })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Arms</label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('arms', { valueAsNumber: true })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Thighs</label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('thighs', { valueAsNumber: true })}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                {selectedEntry && (
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
                  {selectedEntry ? 'Update Entry' : 'Add Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Progress Charts */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
            
            {weightChartData.length > 0 ? (
              <div className="h-64 relative">
                {/* Simple chart visualization */}
                <div className="absolute inset-0 flex items-end">
                  {weightChartData.map((point, index) => (
                    <div 
                      key={index} 
                      className="flex-1 flex flex-col items-center justify-end h-full"
                    >
                      <div 
                        className="w-full bg-blue-500 rounded-t-sm"
                        style={{ 
                          height: `${Math.max(
                            10, 
                            (point.weight - Math.min(...weightChartData.map(d => d.weight)) + 5) / 
                            (Math.max(...weightChartData.map(d => d.weight)) - Math.min(...weightChartData.map(d => d.weight)) + 10) * 100
                          )}%` 
                        }}
                      ></div>
                      <span className="text-xs mt-1 transform -rotate-45 origin-top-left">{point.date}</span>
                    </div>
                  ))}
                </div>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
                  <span className="text-xs">{Math.max(...weightChartData.map(d => d.weight))} kg</span>
                  <span className="text-xs">{Math.min(...weightChartData.map(d => d.weight))} kg</span>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Add weight entries to see your progress chart</p>
              </div>
            )}
          </div>
          
          {/* Progress History */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <h2 className="text-xl font-semibold p-6 pb-4">Progress History</h2>
            
            {sortedEntries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Weight</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Body Fat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {entry.weight} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {entry.bodyFat ? `${entry.bodyFat}%` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedEntry(entry.id)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No progress entries yet. Start tracking your progress!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
