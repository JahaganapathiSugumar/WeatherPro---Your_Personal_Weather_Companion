import { Sun, Moon, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface Props {
  weather: WeatherData;
}

export default function WeatherDetails({ weather }: Props) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Main Weather Display */}
      <div className="flex flex-col items-center justify-center text-white">
        <WeatherIcon code={weather.weather[0].icon} size={96} className="mb-4" />
        <h2 className="text-6xl font-bold mb-2">{Math.round(weather.main.temp)}°C</h2>
        <p className="text-2xl font-medium capitalize mb-1">{weather.weather[0].description}</p>
        <p className="text-lg opacity-80">Feels like {Math.round(weather.main.feels_like)}°C</p>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Sun className="w-6 h-6 text-yellow-400" />
            <Moon className="w-6 h-6 text-blue-200" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-white/60">Sunrise & Sunset</p>
            <p className="text-sm font-medium text-white">{formatTime(weather.sys.sunrise)}</p>
            <p className="text-sm font-medium text-white">{formatTime(weather.sys.sunset)}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Wind className="w-6 h-6 text-blue-300 mb-2" />
          <p className="text-sm text-white/60">Wind Speed</p>
          <p className="text-lg font-medium text-white">{weather.wind.speed} m/s</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Droplets className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-sm text-white/60">Humidity</p>
          <p className="text-lg font-medium text-white">{weather.main.humidity}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Eye className="w-6 h-6 text-gray-300 mb-2" />
          <p className="text-sm text-white/60">Visibility</p>
          <p className="text-lg font-medium text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Gauge className="w-6 h-6 text-indigo-300 mb-2" />
          <p className="text-sm text-white/60">Pressure</p>
          <p className="text-lg font-medium text-white">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}