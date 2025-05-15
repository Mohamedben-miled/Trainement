'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WorkoutTemplateSelector from '@/components/WorkoutTemplateSelector';
import { SpecializedTemplate } from '@/data/specializedTemplates';

export default function WorkoutTemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<SpecializedTemplate | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelectTemplate = (template: SpecializedTemplate) => {
    setSelectedTemplate(template);
    setShowConfirmation(true);
  };

  const handleConfirmTemplate = () => {
    // In a real app, we would save the selected template to the user's profile
    // For now, we'll just redirect to the workout program page
    router.push('/workout-program');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Workout Templates</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
            Choose from our collection of specialized workout templates designed by fitness professionals. 
            Select a template that matches your goals, experience level, and preferred training style.
          </p>
        </div>

        <WorkoutTemplateSelector onSelectTemplate={handleSelectTemplate} />
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Confirm Template Selection</h2>
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You've selected the <span className="font-semibold text-green-600 dark:text-green-400">{selectedTemplate.name}</span> template.
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">Template Details</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li><span className="font-medium">Style:</span> {selectedTemplate.category}</li>
                    <li><span className="font-medium">Split:</span> {selectedTemplate.split}</li>
                    <li><span className="font-medium">Level:</span> {selectedTemplate.level}</li>
                    <li><span className="font-medium">Days per week:</span> {selectedTemplate.schedule.length}</li>
                  </ul>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400">
                  Would you like to use this template for your workout program? You can customize it further after selection.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmTemplate}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
