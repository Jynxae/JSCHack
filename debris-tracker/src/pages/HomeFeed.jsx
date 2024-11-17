import React from "react";

// Dummy data for feed posts
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
    <div className="min-h-screen w-screen bg-[#1B1A55] flex items-center justify-center p-6 -mt-12">
      <div className="max-w-4xl w-full bg-[#9290C3] shadow-md rounded-lg justify-center p-6">
        <h1 className="text-3xl font-bold text-[#1B1A55] mb-6 text-center">
          Orbit Spotting Feed
        </h1>
        <div className="space-y-4">
          {feedData.map((post) => (
            <div
              key={post.id}
              className="border-b border-gray-200 pb-4 last:border-none"
            >
              <h2 className="text-lg font-bold text-[#1B1A55]">
                {post.name}
              </h2>
              <p className="text-[#535C91] font-bold">{post.content}</p>
              <p className="text-sm text-black font-bold">{post.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;
