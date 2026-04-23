import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AnalystUsers() {
  const [growth, setGrowth] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios.get("/api/analyst/users/growth", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setGrowth(res.data.data));
  }, []);

  return (
    <div className="space-y-6 md:ml-70">

      <h1 className="text-2xl font-bold">👥 User Analytics</h1>

      {/* Growth Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="mb-3 font-semibold">User Growth</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growth}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
