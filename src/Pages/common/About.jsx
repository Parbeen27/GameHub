import React from 'react'
import { useAuth } from "../../Context/AuthContext"
function About() {
  const { dark, setDark } = useAuth()
  return (
    <div className={dark ? "dark" : ""}>
    <div className="min-h-screen bg-gray-300 dark:bg-gray-900 pt-20 px-4">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            🎮 About This Platform
          </h1>
          <p className="text-gray-500 mt-2">
            A full-stack gaming analytics and management system
          </p>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            📌 Project Overview
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This project is a full-stack web application built for managing
            browser-based games, tracking player performance, and providing
            analytics for admins and analysts. It supports role-based access
            control and real-time game interaction using modern web technologies.
          </p>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            🚀 Key Features
          </h2>

          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>✔ Role-based authentication (Admin, Analyst, User)</li>
            <li>✔ Game management system (CRUD operations)</li>
            <li>✔ Phaser-based interactive games</li>
            <li>✔ Real-time leaderboard system</li>
            <li>✔ Analytics dashboard with charts</li>
            <li>✔ Activity logging for admin actions</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            🛠 Tech Stack
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm dark:text-white">
            <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-center">
              React.js
            </span>
            <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-center">
              Node.js
            </span>
            <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-center">
              Express.js
            </span>
            <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-center">
              MongoDB
            </span>
            <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-center">
              Tailwind CSS
            </span>
            <span className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-center">
              Phaser.js
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm pb-6">
          Built as a final year BCA major project 🚀
        </div>

      </div>
    </div>
    </div>
  );
}

export default About