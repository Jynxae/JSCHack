import React, { useState, useEffect } from "react";
import { Layers } from "lucide-react";

const DebrisCard = ({ debris }) => {
  const formatNumber = (value, decimals = 2) => {
    const num = Number(value);
    return isNaN(num) ? "0" : num.toFixed(decimals);
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Layers className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">
            {debris.location || "Unknown Location"}
          </h2>
        </div>
      </div>
      <p className="text-gray-600 mt-2">
        {debris.description || "No description available"}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-gray-500">
          <div>
            <span className="font-medium text-gray-800">Velocity:</span>{" "}
            {formatNumber(debris.velocity)}°/hr
          </div>
          <div>
            <span className="font-medium text-gray-800">Direction:</span>{" "}
            {debris.direction || "Unknown"}
          </div>
        </div>
        <div className="text-gray-500">
          <div>
            <span className="font-medium text-gray-800">Doppler Shift:</span>{" "}
            {formatNumber(debris.dopplerShift, 6)}
          </div>
          <div>
            <span className="font-medium text-gray-800">Nearby Objects:</span>{" "}
            {debris.affectedSatellites || 0}
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <span className="font-medium text-gray-800">Discovered:</span>{" "}
        {debris.timestamp || "Unknown Date"}
      </div>
    </div>
  );
};

function RiskList() {
  const [debrisList, setDebrisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDebrisData = async () => {
      try {
        const response = await fetch("http://localhost:5171/api/debris/list");
        if (!response.ok) throw new Error("Failed to fetch debris data");
        const data = await response.json();
        setDebrisList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDebrisData();
    const interval = setInterval(fetchDebrisData, 300000);
    return () => clearInterval(interval);
  }, []);

  const StarField = () => {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 300}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: `${Math.random() * 0.7 + 0.3}`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <StarField />
        <div className="text-xl text-white animate-pulse z-10">
          Loading debris data...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <StarField />
        <div className="text-xl text-red-500 z-10">Error: {error}</div>
      </div>
    );

  return (
    <div
      className="min-h-screen w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-6 relative"
      style={{
        background: "linear-gradient(to bottom, #070F2B, #1B1A55, #535C91)",
      }}
    >
      <StarField />
      <div className="max-w-4xl w-full bg-gradient-to-r from-white via-gray-50 to-white shadow-xl rounded-lg p-8 relative z-10 mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
          <Layers size={32} className="text-blue-600" />
          Risk Assessment
        </h1>

        <div className="text-gray-500 text-sm mb-6 text-center">
          Total Objects: {debrisList.length} | Last Updated:{" "}
          {new Date().toLocaleString()}
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

export default RiskList;
