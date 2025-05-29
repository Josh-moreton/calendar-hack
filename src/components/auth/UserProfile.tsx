/**
 * User Profile Component
 * Allows users to view and edit their profile information
 */

import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import supabase from "../../lib/supabase";

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    full_name: user?.email || "", // Use email as fallback since full_name doesn't exist on AppUser
    avatar_url: "", // Initialize as empty string
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      // Get the current user from Supabase auth
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser?.user) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", authUser.user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Get the current user from Supabase auth
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser?.user) throw new Error("No authenticated user");

      // Update auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        },
      });

      if (authError) throw authError;

      // Update profile table
      const { error: profileError } = await supabase
        .from("user_profiles")
        .upsert({
          id: authUser.user.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          email: user?.email,
          updated_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      setMessage("Profile updated successfully!");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={profile.full_name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label
            htmlFor="avatar_url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Avatar URL
          </label>
          <input
            id="avatar_url"
            name="avatar_url"
            type="url"
            value={profile.avatar_url}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};
