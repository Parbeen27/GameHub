import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../../services/api";

export default function UserGrowthChart() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    api.get("/api/analyst/users/growth", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setData(res.data.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2>User Growth</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
