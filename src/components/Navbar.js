import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-slate-950">
      {/* Mobile View */}
      <div className="sm:hidden flex justify-between items-center px-4 py-2">
        <div className="flex justify-center items-center">
          <img className="h-12" src={logo} alt="alt" />
          <h2 className="text-white font-bold text-2xl font-serif">
              SelfIOn
            </h2>
        </div>
        <div>
          <button
            onClick={() => setIsVisible((prev) => !prev)}
            className="text-gray-300 focus:text-white focus:outline-none hover:text-white"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex justify-between items-center px-10 py-4">
        <div className="flex justify-center items-center">
          <img className="h-20" src={logo} alt="alt" />
          <h2 className="text-white font-bold text-2xl font-serif">
              SelfIOn
            </h2>
        </div>
        <div className="text-white font-semibold text-xl">
          <Link className="mr-6" to="/">
            Home
          </Link>
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Mobile View - Dropdown */}
      <div className={isVisible ? "block" : "hidden sm:hidden"}>
        <div className="text-white px-4 py-2">
          <Link className="block py-1" to="/">
            Home
          </Link>
          <Link className="block py-1" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
