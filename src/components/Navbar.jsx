import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          CodePaste
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white text-lg hover:text-blue-300 transition duration-300 ${
                isActive ? 'underline underline-offset-4' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-white text-lg hover:text-blue-300 transition duration-300 ${
                isActive ? 'underline underline-offset-4' : ''
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
