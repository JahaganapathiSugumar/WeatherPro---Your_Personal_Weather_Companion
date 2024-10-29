import { ArrowRight, Sun, Cloud, Wind, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Your Personal Weather Companion</h1>
          <p className="text-xl mb-12">
            Get accurate, real-time weather updates and forecasts for any location worldwide. 
            Stay prepared with WeatherPro's comprehensive weather intelligence.
          </p>
          
          <div className="flex justify-center space-x-4 mb-20">
            <Link 
              to="/forecast" 
              className="bg-white text-blue-500 dark:bg-gray-800 dark:text-blue-400 px-8 py-3 rounded-full font-semibold flex items-center hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              Check Weather <ArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-20">
            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl">
              <div className="text-center">
                <Sun className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                <p className="text-sm opacity-80">Get instant weather information with our live updates system</p>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl">
              <div className="text-center">
                <Cloud className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accurate Forecasts</h3>
                <p className="text-sm opacity-80">Plan ahead with our precise 24-hour weather predictions</p>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl">
              <div className="text-center">
                <Wind className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Wind Patterns</h3>
                <p className="text-sm opacity-80">Track wind speed and direction with detailed measurements</p>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl">
              <div className="text-center">
                <Droplets className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Humidity Levels</h3>
                <p className="text-sm opacity-80">Monitor humidity levels to plan your day better</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}