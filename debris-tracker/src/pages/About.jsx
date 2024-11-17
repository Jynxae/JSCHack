import React, { useEffect, useState } from "react";

const About = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#070F2B");

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Calculate the scroll percentage (0 to 1)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(position / scrollHeight, 1);

      // Colors in RGB format (reversed for dark to light)
      const colors = [
        { r: 7, g: 15, b: 43 },    // #070F2B (darkest)
        { r: 27, g: 26, b: 85 },   // #1B1A55
        { r: 83, g: 92, b: 145 },  // #535C91
        { r: 146, g: 144, b: 195 }, // #9290C3 (lightest)
      ];

      // Interpolating between the colors based on scroll percentage
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
      <div className="sticky top-[30vh] flex flex-col items-center w-screen">
        <div className="relative w-[300px] h-[300px] flex items-center"></div>
      </div>
    </div>
  );
};

export default About;
