import React, { useState, useEffect } from 'react';
import { Loader2, Info } from 'lucide-react';

function HomeFeed() {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const response = await fetch('http://localhost:5171/api/feed/latest');
        if (!response.ok) throw new Error('Failed to fetch feed data');
        const data = await response.json();
        setFeedData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedData();
    // Refresh every minute
    const interval = setInterval(fetchFeedData, 60000);
    return () => clearInterval(interval);
  }, []);

  const FeedCard = ({ post }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-500"
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
          {post.DebrisID && (
            <span className="text-sm font-normal text-blue-600">
              - {post.extraInfo.name}
            </span>
          )}
        </h2>
        <span className="text-sm text-gray-500">{post.timestamp}</span>
      </div>

      <p className="text-gray-600 mt-2">{post.content}</p>

      {post.DebrisID && (
        <div className="mt-4 bg-blue-50 p-3 rounded-md">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Info size={16} />
            <span className="font-medium">Debris Details</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
            <div>Description: {post.extraInfo.description}</div>
            <div>Location: {post.extraInfo.location}</div>
            <div>Velocity: {post.extraInfo.velocity}</div>
            <div>Direction: {post.extraInfo.direction}</div>
            {post.extraInfo.dopplerShift !== 'Unknown' && (
              <div>Doppler Shift: {post.extraInfo.dopplerShift}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-screen text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #070F2B, #1B1A55, #535C91)",
      }}>
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
        <div className="max-w-4xl w-full bg-gradient-to-r from-white via-gray-50 to-white bg-opacity-90 shadow-xl rounded-lg p-8 animate-fadeIn"
          style={{ animation: "fadeIn 1s ease-in" }}>
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Space Debris Observations
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">
              Error loading feed: {error}
            </div>
          ) : feedData.length === 0 ? (
            <div className="text-gray-500 text-center p-4">
              No observations found
            </div>
          ) : (
            <div className="space-y-6">
              {feedData.map((post) => (
                <FeedCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;