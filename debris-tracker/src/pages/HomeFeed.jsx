import React from "react";
import longstars from "../assets/longstars.jpg"

const feedData = [
  {
    id: 1,
    name: "Alice Johnson",
    content:
      "Spotted a debris cluster near orbit 300km. Significant risk detected.",
    timestamp: "2024-11-16 10:45 AM",
  },
  {
    id: 2,
    name: "Bob Smith",
    content:
      "Observed a clean orbit near the 500km range. Clear for satellites.",
    timestamp: "2024-11-16 09:30 AM",
  },
  {
    id: 3,
    name: "Charlie Kim",
    content: "Potential collision risk detected near 700km. Alerts sent.",
    timestamp: "2024-11-15 5:20 PM",
  },
  {
    id: 4,
    name: "Diana Lee",
    content:
      "Unusual debris pattern spotted near 250km. Investigating further.",
    timestamp: "2024-11-15 1:45 PM",
  },
];

function HomeFeed() {
  return (
    <div
      className="min-h-screen w-screen text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #070F2B, #1B1A55, #535C91)",
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      <div className="flex items-center justify-center p-6 relative z-10 mt-16">
        <div
          className="max-w-4xl w-full bg-gradient-to-r from-white via-gray-50 to-white bg-opacity-90 shadow-xl rounded-lg p-8 animate-fadeIn"
          style={{ animation: "fadeIn 1s ease-in" }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Orbit Spotting Feed
          </h1>
          <div className="space-y-6">
            {feedData.map((post) => (
              <div
                key={post.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" stroke="none"></circle>
                    <path
                      d="M9 12l2 2l4-4"
                      stroke="white"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  {post.name}
                </h2>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <p className="text-sm text-gray-500 mt-4">{post.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;
