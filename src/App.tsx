import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import MapView from './pages/MapView';
import Alerts from './pages/Alerts';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;