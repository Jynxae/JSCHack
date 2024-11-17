import React from "react";
import Navbar from "./navbar"; // Import your Navbar component

function Layout({ children }) {
  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />
      {/* Main content below the Navbar */}
      <div className="pt-80">{children}</div>
    </div>
  );
}

export default Layout;
