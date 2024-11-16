import React from "react";

// Dummy data for risk assessment
const riskData = {
  highRisk: [
    {
      id: 1,
      location: "Orbit 450km",
      description: "Multiple debris clusters detected with high collision probability",
      riskLevel: "high",
      probability: 85,
      timestamp: "2024-11-16 10:45 AM",
      affectedSatellites: 3
    },
    {
      id: 2,
      location: "Orbit 600km",
      description: "Large space debris approaching operational satellites",
      riskLevel: "high",
      probability: 75,
      timestamp: "2024-11-16 09:30 AM",
      affectedSatellites: 2
    },
  ],
  mediumRisk: [
    {
      id: 3,
      location: "Orbit 300km",
      description: "Small debris cluster forming, monitoring required",
      riskLevel: "medium",
      probability: 45,
      timestamp: "2024-11-15 5:20 PM",
      affectedSatellites: 1
    },
  ],
  lowRisk: [
    {
      id: 4,
      location: "Orbit 800km",
      description: "Minor debris detected, well outside operational orbits",
      riskLevel: "low",
      probability: 15,
      timestamp: "2024-11-15 1:45 PM",
      affectedSatellites: 0
    },
    {
      id: 5,
      location: "Orbit 750km",
      description: "Tracked debris on stable trajectory, no immediate concern",
      riskLevel: "low",
      probability: 10,
      timestamp: "2024-11-15 11:30 AM",
      affectedSatellites: 0
    },
  ],
};

const RiskCard = ({ risk }) => {
  const getBgColor = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-50 border-red-200";
      case "medium":
        return "bg-yellow-50 border-yellow-200";
      case "low":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextColor = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return "text-red-700";
      case "medium":
        return "text-yellow-700";
      case "low":
        return "text-green-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getBgColor(risk.riskLevel)} mb-4`}>
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{risk.location}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTextColor(risk.riskLevel)}`}>
          {risk.probability}% Risk
        </span>
      </div>
      <p className="text-gray-600 mt-2">{risk.description}</p>
      <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
        <span>{risk.timestamp}</span>
        <span>Affected Satellites: {risk.affectedSatellites}</span>
      </div>
    </div>
  );
};

function RiskFeed() {
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Risk Assessment Dashboard
        </h1>

        {riskData.highRisk.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              High Priority Risks ({riskData.highRisk.length})
            </h2>
            {riskData.highRisk.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        )}

        {riskData.mediumRisk.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">
              Medium Priority Risks ({riskData.mediumRisk.length})
            </h2>
            {riskData.mediumRisk.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        )}

        {riskData.lowRisk.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Low Priority Risks ({riskData.lowRisk.length})
            </h2>
            {riskData.lowRisk.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RiskFeed;