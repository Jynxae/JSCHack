import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          About the Debris Tracker
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          The Debris Tracker is a project designed to monitor and predict the
          risks of space debris collision. Our mission is to ensure the safety
          of satellites, space stations, and other critical space assets by
          providing accurate risk assessments.
        </p>
        <p className="text-gray-600 text-lg mb-4">
          This application leverages cutting-edge APIs, predictive analytics,
          and real-time data visualization to deliver actionable insights for
          space debris management.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Features:
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Real-time debris tracking</li>
          <li>Collision risk predictions</li>
          <li>Interactive input forms for custom analyses</li>
          <li>Secure and scalable architecture</li>
        </ul>
        <div className="mt-8 text-center">
          <p className="text-gray-700 font-semibold">
            Together, we are making space safer for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
