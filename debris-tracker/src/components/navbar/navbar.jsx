import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoNoTitle.png";

function Navbar() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-12 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="logo" className="w-24"></img>
            <h1 className="text-xl font-bold text-gray-800">
              <Link to="/" className="text-gray-800 hover:text-gray-900">
                Debris Tracker
              </Link>
            </h1>
          </div>

          <ul className="flex space-x-16">
            <li>
              <Link
                to="/risk"
                className="text-gray-600 font-bold hover:text-gray-900"
              >
                Risk Page
              </Link>
            </li>
            <li>
              <Link
                to="/input-form"
                className="text-gray-600 font-bold hover:text-gray-900"
              >
                Input Form
              </Link>
            </li>
            <li>
              <Link
                to="/home-feed"
                className="text-gray-600 font-bold hover:text-gray-900"
              >
                Home Feed
              </Link>
            </li>
          </ul>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-gray-800 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-900"
          >
            Log In
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
