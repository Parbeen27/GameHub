import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function PeakHoursChart() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios.get("/api/analyst/games/peaktime", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setData(res.data.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2>Peak Hours</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="plays" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}