import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api"
export default function AnalystGames() {
  const [games, setGames] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    api.get("/api/analyst/games", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setGames(res.data.data));
  }, []);

  return (
    <div className="space-y-6 md:ml-70">

      <h1 className="text-2xl font-bold">🎮 Game Analytics</h1>

      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Game</th>
              <th>Plays</th>
              <th>Avg Score</th>
              <th>Max Score</th>
            </tr>
          </thead>

          <tbody>
            {games.map((g, i) => (
              <tr key={i} className="border-b">
                <td>{g._id}</td>
                <td>{g.totalPlays}</td>
                <td>{g.avgScore.toFixed(1)}</td>
                <td>{g.maxScore}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
