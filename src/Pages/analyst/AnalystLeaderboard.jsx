import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { GamesContext } from "../../Context/GameContext";
import { useAuth } from "../../Context/AuthContext";
import API from "../../services/api"
export default function AnalystLeaderboard() {
  const { games } = useContext(GamesContext);
  const { user } = useAuth()
  const [scores, setScores] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const gameID = games?.find(g => g._id)?._id
  const isInTop = scores.some(
    (item) => item.userId === user?.id
  )
  // 🔹 Fetch leaderboard
  const fetchLeaderboard = async (gameId = "") => {
    try {
      const url = gameId
        ? `/api/games/score/leaderboard/${gameId}`
        : "/api/games/score/global-leaderboard";
      
      const res = await axios.get(url);
      setScores(res.data);
      
    } catch (err) {
      console.log(err);
    }
  };


  // 🔹 Initial load
  useEffect(() => {
    fetchLeaderboard()
  }, []);

  // 🔹 Listen for score updates (Phaser → React)
  useEffect(() => {
    const refetch = () => {
      fetchLeaderboard(selectedGame);
    };

    window.addEventListener("scoreUpdated", refetch);

    return () => {
      window.removeEventListener("scoreUpdated", refetch);
    };
  }, [selectedGame]);

  // 🔹 Handle dropdown change
  const handleChange = (e) => {
    const gameId = e.target.value;
    setSelectedGame(gameId);
    fetchLeaderboard(gameId)
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">🏆 Leaderboard</h1>

      {/* 🎮 GAME FILTER */}
      <div className="mb-4 ">
        <select
          value={selectedGame}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Games</option>
          {games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>
      {/* 📊 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Player</th>
              <th className="p-3">Game</th>
              <th className="p-3">Score</th>
            </tr>
          </thead>

          <tbody>
            {scores.map((item, index) => {
              const isMe = item.userId === user?.id;
              return (
              <tr key={index} >
                <td className="p-3 ">{index + 1}</td>

                <td className="p-3">
                  {item.username}
                </td>

                <td className="p-3">
                  {item.gameName}
                </td>

                <td className="p-3 font-semibold">
                  {item.score}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
          
        {scores.length === 0 && (
          <p className="p-4 text-gray-500">No scores found</p>
        )}
      </div>
    </div>
  );
}