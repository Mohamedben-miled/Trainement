'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-10 border-b-2 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM9 14H7v-2h2v2zm-4-2H3v-2h2v2zm10-8a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
                </svg>
                AI Gym Coach
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-green-500 text-green-700 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/about')
                    ? 'border-green-500 text-green-700 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                }`}
              >
                About
              </Link>
              <Link
                href="/workout-templates"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/workout-templates')
                    ? 'border-green-500 text-green-700 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                }`}
              >
                Templates
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/dashboard')
                        ? 'border-green-500 text-green-700 dark:text-green-400'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/workout-program"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/workout-program')
                        ? 'border-green-500 text-green-700 dark:text-green-400'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                    }`}
                  >
                    Workouts
                  </Link>
                  <Link
                    href="/workout-templates"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/workout-templates')
                        ? 'border-green-500 text-green-700 dark:text-green-400'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                    }`}
                  >
                    Templates
                  </Link>
                  <Link
                    href="/track-progress"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/track-progress')
                        ? 'border-green-500 text-green-700 dark:text-green-400'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                    }`}
                  >
                    Progress
                  </Link>
                  <Link
                    href="/notes"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/notes')
                        ? 'border-green-500 text-green-700 dark:text-green-400'
                        : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-700'
                    }`}
                  >
                    Journal
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 dark:text-gray-300 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 00-1 1v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 12.586V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm5 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm4 0a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                    </svg>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/')
                ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/about')
                ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>

          {isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/dashboard')
                    ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/workout-program"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/workout-program')
                    ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Workouts
              </Link>
              <Link
                href="/workout-templates"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/workout-templates')
                    ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="/log-workout"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/log-workout')
                    ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Log Workout
              </Link>
              <Link
                href="/track-progress"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/track-progress')
                    ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Progress
              </Link>
              <Link
                href="/notes"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/notes')
                    ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Journal
              </Link>
              <Link
                href="/profile"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/profile')
                    ? 'border-green-500 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:text-green-700 dark:hover:text-green-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4 space-x-3">
            {isAuthenticated ? (
              <>
                <span className="block text-gray-700 dark:text-gray-300 px-3 py-2 text-base font-medium">
                  {user?.name}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm5 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm4 0a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                  </svg>
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-md text-base font-medium flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
