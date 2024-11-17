import React from "react";
import { Link } from "react-router-dom";
import CarinaNebulaBanner from "../../assets/CarinaNebulaBanner.png";

function Navbar() {
  return (
    <div
      className="relative w-full h-80 bg-cover bg-center"
      style={{
        backgroundImage: `url(${CarinaNebulaBanner})`,
      }}
    >
      {/* Navbar Section */}
      <nav className="absolute top-0 left-0 w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-12 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Debris Tracker</h1>
          <ul className="flex space-x-24 justify-items-center pr-72">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link to="/risk" className="text-gray-600 hover:text-gray-900">
                Risk Page
              </Link>
            </li>
            <li>
              <Link
                to="/input-form"
                className="text-gray-600 hover:text-gray-900"
              >
                Input Form
              </Link>
            </li>
            <li>
              <Link
                to="/home-feed"
                className="text-gray-600 hover:text-gray-900"
              >
                Home Feed
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
