import React from 'react';

const Star = ({ style }) => (
  <div 
    className="absolute rounded-full bg-white animate-twinkle"
    style={{
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      ...style
    }}
  />
);

const StarField = () => {
  const stars = Array(200).fill(null).map((_, i) => ({
    top: `${Math.random() * 300}vh`,
    left: `${Math.random() * 100}vw`,
    animationDelay: `${Math.random() * 3}s`,
    opacity: Math.random() * 0.7 + 0.3
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((style, i) => (
        <Star key={i} style={style} />
      ))}
    </div>
  );
};

const About = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [backgroundColor, setBackgroundColor] = React.useState("#070F2B");

  React.useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(position / scrollHeight, 1);

      const colors = [
        { r: 7, g: 15, b: 43 },     // #070F2B (darkest)
        { r: 27, g: 26, b: 85 },    // #1B1A55
        { r: 83, g: 92, b: 145 },   // #535C91
        { r: 146, g: 144, b: 195 }, // #9290C3 (lightest)
      ];

      const index = Math.floor(scrollPercentage * (colors.length - 1));
      const color1 = colors[index];
      const color2 = colors[index + 1] || color1;
      const localPercentage = (scrollPercentage * (colors.length - 1)) % 1;

      const r = Math.round(color1.r + (color2.r - color1.r) * localPercentage);
      const g = Math.round(color1.g + (color2.g - color1.g) * localPercentage);
      const b = Math.round(color1.b + (color2.b - color1.b) * localPercentage);

      setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-[300vh] text-white relative"
      style={{
        background: backgroundColor,
        transition: "background 0.3s ease",
      }}
    >
      <StarField />
      
      {/* First Section */}
      <div className="h-screen flex items-center justify-center w-screen">
        <div className="text-center space-y-6 opacity-90">
          <h1 className="text-6xl font-bold tracking-tight">
            Space Debris Tracker
          </h1>
          <p className="text-xl font-light">
            Monitoring the cosmos, protecting our future
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-8 opacity-80 max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-semibold">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed">
            Leveraging cutting-edge technology to monitor and predict space debris risks,
            ensuring the safety of satellites and space missions. We provide real-time
            tracking and analysis to safeguard our orbital infrastructure.
          </p>
        </div>
      </div>

      {/* Third Section */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-12 opacity-90">
          <h2 className="text-3xl font-medium mb-8">
            Making Space Safer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg px-4">
            <div className="space-y-4">
              <div className="text-2xl font-semibold">Real-time Tracking</div>
              <p className="text-gray-300">Continuous monitoring of orbital debris</p>
            </div>
            <div className="space-y-4">
              <div className="text-2xl font-semibold">Risk Assessment</div>
              <p className="text-gray-300">Advanced collision probability analysis</p>
            </div>
            <div className="space-y-4">
              <div className="text-2xl font-semibold">Predictive Analytics</div>
              <p className="text-gray-300">AI-powered trajectory forecasting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;