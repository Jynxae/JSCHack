import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

const DebrisCard = ({ debris }) => {
  // Safely convert values to numbers and handle potential null/undefined
  const formatNumber = (value, decimals = 2) => {
    const num = Number(value);
    return isNaN(num) ? '0' : num.toFixed(decimals);
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white mb-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Layers className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">{debris.location || 'Unknown Location'}</h2>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{debris.description || 'No description available'}</p>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-gray-500">
          <div>Velocity: {formatNumber(debris.velocity)}°/hr</div>
          <div>Direction: {debris.direction || 'Unknown'}</div>
        </div>
        <div className="text-gray-500">
          <div>Doppler Shift: {formatNumber(debris.dopplerShift, 6)}</div>
          <div>Nearby Objects: {debris.affectedSatellites || 0}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Discovered: {debris.timestamp || 'Unknown Date'}
      </div>
    </div>
  );
};

function DebrisList() {
  const [debrisList, setDebrisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDebrisData = async () => {
      try {
        const response = await fetch('http://localhost:5171/api/debris/list');
        if (!response.ok) throw new Error('Failed to fetch debris data');
        const data = await response.json();
        setDebrisList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDebrisData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchDebrisData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading debris data...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="text-xl text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
          <Layers size={32} className="text-blue-600" />
          Space Debris Catalog
        </h1>
        
        <div className="text-gray-500 text-sm mb-6 text-center">
          Total Objects: {debrisList.length} | Last Updated: {new Date().toLocaleString()}
        </div>

        {debrisList.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No debris objects found in the database
          </div>
        ) : (
          <div className="space-y-4">
            {debrisList.map((debris) => (
              <DebrisCard key={debris.id} debris={debris} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DebrisList;