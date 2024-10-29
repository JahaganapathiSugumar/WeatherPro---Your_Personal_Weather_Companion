import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

export default function Alerts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    latitude: '',
    longitude: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
          fetchLocationName(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setMessage({ type: 'error', text: 'Unable to retrieve your location' });
        }
      );
    } else {
      setMessage({ type: 'error', text: 'Geolocation is not supported by your browser' });
    }
  };

  const fetchLocationName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=24eda372ca98c1a40cde6e83fa7cd3b5`
      );
      const data = await response.json();
      if (data.length > 0) {
        setFormData(prev => ({
          ...prev,
          location: data[0].name
        }));
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Successfully subscribed to weather alerts!' });
        setFormData({
          name: '',
          email: '',
          location: '',
          latitude: '',
          longitude: ''
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to subscribe' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to the server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-2">Weather Alerts</h2>
          <p className="text-white/80 mb-6">Get notified about weather changes in your area</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                Location
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your location"
                />
                <button
                  type="button"
                  onClick={handleLocationDetect}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <MapPin size={20} />
                </button>
              </div>
            </div>

            {message.text && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                'Subscribe to Alerts'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}