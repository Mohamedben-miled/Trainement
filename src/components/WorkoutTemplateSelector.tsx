'use client';

import { useState } from 'react';
import specializedTemplates, { SpecializedTemplate } from '@/data/specializedTemplates';

interface WorkoutTemplateSelectorProps {
  onSelectTemplate: (template: SpecializedTemplate) => void;
}

export default function WorkoutTemplateSelector({ onSelectTemplate }: WorkoutTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSplit, setSelectedSplit] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Get unique categories, splits, and levels
  const categories = Array.from(new Set(specializedTemplates.map(t => t.category)));
  const splits = Array.from(new Set(specializedTemplates.map(t => t.split)));
  const levels = Array.from(new Set(specializedTemplates.map(t => t.level)));

  // Filter templates based on selections
  const filteredTemplates = specializedTemplates.filter(template => {
    if (selectedCategory && template.category !== selectedCategory) return false;
    if (selectedSplit && template.split !== selectedSplit) return false;
    if (selectedLevel && template.level !== selectedLevel) return false;
    return true;
  });

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedSplit(null);
    setSelectedLevel(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Workout Program Templates</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose from our specialized workout templates designed for different goals and experience levels.
        </p>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Training Style
            </label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Styles</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Workout Split
            </label>
            <select
              value={selectedSplit || ''}
              onChange={(e) => setSelectedSplit(e.target.value || null)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Splits</option>
              {splits.map((split) => (
                <option key={split} value={split}>
                  {split.charAt(0).toUpperCase() + split.slice(1)} Split
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Experience Level
            </label>
            <select
              value={selectedLevel || ''}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Levels</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(selectedCategory || selectedSplit || selectedLevel) && (
          <button
            onClick={handleClearFilters}
            className="mt-4 text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Clear Filters
          </button>
        )}
      </div>

      {/* Template Cards */}
      <div className="p-6">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No templates found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your filters to find a suitable workout template.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{template.name}</h3>
                    <div className="flex space-x-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {template.category}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {template.split}
                      </span>
                    </div>
                  </div>
                  <span className="inline-block mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    {template.level.charAt(0).toUpperCase() + template.level.slice(1)} Level
                  </span>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>
                  
                  {showDetails === template.id ? (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Schedule</h4>
                        <div className="space-y-2">
                          {template.schedule.map((day, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-green-600 dark:text-green-400">{day.day}:</span> {day.focus}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Key Principles</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          {template.principles.map((principle, index) => (
                            <li key={index}>{principle}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <button
                        onClick={() => setShowDetails(null)}
                        className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mt-2"
                      >
                        Hide Details
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => setShowDetails(template.id)}
                        className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                      >
                        View Details
                      </button>
                      
                      <button
                        onClick={() => onSelectTemplate(template)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Select Template
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
