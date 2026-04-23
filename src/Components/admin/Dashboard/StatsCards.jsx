import { Users, Gamepad2, Ban } from "lucide-react";
import { motion } from "motion/react"
export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <Card
        title="Total Users"
        value={stats.totalUsers || 0}
        icon={<Users className="text-blue-600" />}
        color="blue"
      />

      <Card
        title="Total Games"
        value={stats.totalGames || 0}
        icon={<Gamepad2 className="text-green-600" />}
        color="green"
      />

      <Card
        title="Blocked Users"
        value={stats.blockedUsers || 0}
        icon={<Ban className="text-red-600" />}
        color="red"
      />

    </div>
  );
}

function Card({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div
      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between"
    >
      {/* Left */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <motion.p 
        initial={{ opacity: 0, y: 10}}
        animate={{ opacity: 1, y:0}}
        className="text-2xl font-bold text-gray-800">{value}</motion.p>
      </div>

      {/* Icon */}
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}
