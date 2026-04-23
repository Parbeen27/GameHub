import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";



export default function GamesChart({ data }) {

  return (
    <div className="bg-white p-4 rounded-xl shadow  h-80">
      <h2 className="font-semibold mb-3 text-gray-700">
        🎮 Game Plays
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalPlays" fill="#3b82f6" radius={[6,6,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
