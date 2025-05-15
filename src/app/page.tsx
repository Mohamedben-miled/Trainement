'use client';

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          AI Gym Coach
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="flex items-center justify-center gap-2">
            <Link href="/login" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              Login
            </Link>
            <Link href="/register" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              Register
            </Link>
          </div>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-green-50 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-green-200 after:via-green-300 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-green-700 before:dark:opacity-10 after:dark:from-green-900 after:dark:via-green-600 after:dark:opacity-40 before:lg:h-[360px]">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM9 14H7v-2h2v2zm-4-2H3v-2h2v2zm10-8a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">AI Gym Coach</h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">Your personalized workout program generator</p>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Personalized Programs</h3>
              <p className="text-gray-600 dark:text-gray-400">Tailored workout plans based on your goals, experience, and preferences.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor your improvements with detailed charts and analytics.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600 dark:text-gray-400">AI-powered recommendations based on proven training principles.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md">
              Get Started
            </Link>
            <Link href="/about" className="bg-white hover:bg-gray-50 text-green-700 border border-green-500 font-bold py-3 px-8 rounded-lg transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-green-400 dark:border-green-600">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-16">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Personalized Programs
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Workouts tailored to your goals, experience, and schedule.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Safety First
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Intelligent algorithms to prevent overtraining and injuries.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Adaptive Training
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Programs that evolve based on your feedback and progress.
          </p>
        </div>
      </div>
    </main>
  );
}
