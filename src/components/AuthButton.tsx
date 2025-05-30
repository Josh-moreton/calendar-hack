/**
 * Authentication Button Component
 * Displays login/signup options or user profile based on authentication state
 */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthButton: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!user) {
    // Not logged in - show login/signup buttons
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/40"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // Logged in - show user menu
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-blue-700 focus:outline-none"
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
          </div>
        )}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              <div className="font-medium truncate">
                {user.displayName || "User"}
              </div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </Link>
            <Link
              to="/connect"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Connect Devices
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
