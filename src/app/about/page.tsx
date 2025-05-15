import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About AI Gym Coach</h1>
      
      <div className="max-w-3xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            AI Gym Coach was created with a simple mission: to make personalized, science-based workout programs accessible to everyone, regardless of their fitness level or experience.
          </p>
          <p className="text-lg">
            We believe that everyone deserves a workout program that's tailored to their unique needs, goals, and limitations. By leveraging artificial intelligence, we're able to create customized programs that adapt and evolve as you progress.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">The Science Behind Our Programs</h2>
          <p className="text-lg mb-4">
            Our workout programs are built on established exercise science principles and best practices. We consider factors like:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg mb-4">
            <li>Progressive overload to ensure continuous improvement</li>
            <li>Proper exercise selection based on your goals and experience</li>
            <li>Balanced training to prevent muscle imbalances</li>
            <li>Appropriate volume and intensity to maximize results while minimizing injury risk</li>
            <li>Strategic rest and recovery to prevent overtraining</li>
          </ul>
          <p className="text-lg">
            Our AI continuously learns from user feedback and the latest research to improve its recommendations.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Safety First Approach</h2>
          <p className="text-lg mb-4">
            Safety is our top priority. Our system is designed to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg mb-4">
            <li>Account for your injury history and physical limitations</li>
            <li>Monitor for signs of overtraining and nervous system fatigue</li>
            <li>Provide alternative exercises when needed</li>
            <li>Adjust workout intensity based on your feedback</li>
            <li>Include proper warm-up and cool-down protocols</li>
          </ul>
          <p className="text-lg">
            While our AI provides personalized recommendations, we always encourage users to consult with healthcare professionals before starting any new exercise program, especially if you have pre-existing health conditions.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-4 text-lg">
            <li>
              <strong>Create your profile</strong>
              <p>Tell us about your fitness goals, experience level, schedule, and any physical limitations.</p>
            </li>
            <li>
              <strong>Get your personalized program</strong>
              <p>Our AI generates a customized workout program based on your profile information.</p>
            </li>
            <li>
              <strong>Follow your workouts</strong>
              <p>Access detailed workout instructions, including sets, reps, and rest periods.</p>
            </li>
            <li>
              <strong>Provide feedback</strong>
              <p>After each workout, let us know how it went. This helps our AI adjust your program.</p>
            </li>
            <li>
              <strong>Track your progress</strong>
              <p>Monitor your improvements over time and see how your program evolves.</p>
            </li>
          </ol>
        </section>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to start your fitness journey?</h2>
          <Link href="/register" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
