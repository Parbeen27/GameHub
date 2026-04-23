import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";
export default function GameStatsTable() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    api.get("/api/analyst/games", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setData(res.data.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2>Game Stats</h2>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Game</th>
            <th>Plays</th>
            <th>Avg Score</th>
            <th>Max Score</th>
          </tr>
        </thead>

        <tbody>
          {data.map((g, i) => (
            <tr key={i}>
              <td>{g._id}</td>
              <td>{g.totalPlays}</td>
              <td>{g.avgScore.toFixed(1)}</td>
              <td>{g.maxScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
