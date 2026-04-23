import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { GamesContext } from "../../Context/GameContext";
import Podium from "../../Components/user/leaderboard/Podium";
import { useAuth } from "../../Context/AuthContext";
import {api} from "../../services/api"
export default function LeaderboardPage() {
  const { games } = useContext(GamesContext);
  const [myRank,setMyRank] = useState(null)
  const {dark, setDark} = useAuth()
  const { user } = useAuth()
  const [scores, setScores] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const myRef = useRef(null)
  const token = localStorage.getItem("accessToken")
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
      
      const res = await api.get(url);
      setScores(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMyRank = async (gameId = "") => {
    try {
      const url = gameId
      ? `/api/games/score/my-rank/${gameId}`
      : "/api/games/score/my-rank";
      
      const res = await api.get(url,{
        headers: {
          Authorization: `Bearer ${token}`
        },withCredentials: true
      })
      
      setMyRank(res.data)
    }catch (err) {
  console.log(err);
}
  }
  const fetchAll = async (gameId = "") => {
    await Promise.all([
      fetchLeaderboard(),
      fetchMyRank(gameId)
    ])
  }

  // 🔹 Initial load
  useEffect(() => {
    fetchAll(gameID)
  }, []);

  useEffect(() => {
  if (myRef.current) {
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}, [scores.length]); // only when data actually changes
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
    <div className={dark ? "dark" : ""}>
    <div className="p-6 min-h-screen bg-gray-300 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">🏆 Leaderboard</h1>

      {/* 🎮 GAME FILTER */}
      <div className="mb-4 ">
        <select
          value={selectedGame}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg bg-white text-black"
        >
          <option value="">All Games</option>
          {games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>
      <Podium scores={scores}/>
      {myRank && !isInTop && (
        <div className="mb-4 p-4 bg-blue-100 rounded-lg">
          <p className="font-semibold">
            Your Rank: #{myRank.rank?? "Unranked"}
          </p>
          <p>Your Best Score: {myRank.score}</p>
        </div>
      )}
      {/* 📊 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden text-black">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 ">
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
              <tr key={index} ref={isMe ? myRef : null} className={`border-t ${isMe ? "bg-yellow-300 font-bold sticky bottom-0":""}`}>
                <td className="p-3 ">{index + 1}</td>

                <td className="p-3">
                  {item.username}

                  {isMe && (
                    <span className="text-xs bg-yellow-400 px-2 py-1 rounded">
                      You
                    </span>
                  )}
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
    </div>
  );
}
