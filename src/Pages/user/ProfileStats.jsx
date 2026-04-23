import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import Charts from '../../Components/user/ProfileStats/Charts';

export default function ProfileStats() {
  const [data, setData] = useState(null);
  const { user,dark,setDark } = useAuth();
  const userId = user.id;
  

  const fetchdata = async() => {
    const res = await api.get(`/api/games/score/user/${userId}`)
    setData(res.data)
  }
  useEffect(() => {
    if (!userId) return;
    fetchdata()
    
  },[]);

  if (!data) return <p className="mt-16">Loading...</p>;

  const totalGames = data.totalGames;
  const bestScore = data.bestScore;
  const totalScore = data.scores.reduce((s, x) => s + x.score, 0);
  const avgScore = (totalScore / data.scores.length).toFixed(2);
  const worstScore = Math.min(...data.scores.map(s => s.score));

  return (
    <div className={dark ? "dark" : ""}>    
      <div className="p-6 bg-white dark:bg-gray-900 shadow mt-16 text-black dark:text-white">

      <h2 className="text-xl font-bold mb-6">📊 My Stats</h2>

      {/* 🔹 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Games</p>
          <p className="text-lg font-bold text-black">{totalGames}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Best</p>
          <p className="text-lg font-bold text-black">{bestScore}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-lg font-bold text-black">{totalScore}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Avg</p>
          <p className="text-lg font-bold text-black">{avgScore}</p>
        </div>

        <div className="p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Worst</p>
          <p className="text-lg font-bold text-black">{worstScore}</p>
        </div>

      </div>

      {/* 🔹 Game-wise breakdown */}
      <h3 className="font-semibold mb-2">🎮 Game History</h3>

      <div>
        {data.scores.map((s, i) => (
          <div
            key={i}
            className="flex justify-between border-b py-2"
          >
            <span>{s.gameId?.name}</span>
            <span className="font-medium">{s.score}</span>
          </div>
        ))}

        <Charts data = {data}/>
      </div>

    </div>
    </div>

  );
}
