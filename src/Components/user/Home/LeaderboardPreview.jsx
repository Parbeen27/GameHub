import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from "../../../services/api"

export default function LeaderboardPreview() {
    const [leaders, setLeaders] = useState([])

    useEffect(() => {
        const fetchGames = async () => {
        try {
        const res = await api.get("/api/games/score/global-leaderboard")
        setLeaders(res.data)
      } catch (err) {
        console.log((err));
      }
    }
    fetchGames()

    },[]);
    useEffect(() => {
        const container = document.querySelector(".scroll-container")

        let scrollAmount = 0

        const interval = setInterval(() => {
            if(container){
                container.scrollLeft +=1
                scrollAmount +=1
                
                if(scrollAmount > container.scrollWidth){
                    container.scrollLeft = 0
                    scrollAmount = 0
                }
            }
        },30)
        return () => clearInterval(interval)
    },[])
  return (
    <div className='px-4 mt-6'>
        <h2 className='text-xl font-bold mb-4 text-gray-800'>
            🏆 Top Players
        </h2>

        <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-2'>
            {leaders.map((item,idx) => (
                <div key={idx} className={`min-w-200px bg-white rounded-xl shadow p-4 shrink-0 border ${
                    idx === 0 ? "border-yellow-400" :
                    idx === 1 ? "border-gray-400" :
                    idx === 2 ? "border-orange-400" : "border-transparent"
                }`}>
                    
                        <p className='text-lg font-bold'>
                            {idx === 0 && "🥇"}
                            {idx === 1 && "🥈"}
                            {idx === 2 && "🥉"}
                            {idx > 2 && `#${idx + 1}`}
                        </p>

                        <p className='font-semibold mt-1 text-gray-800'>
                            {item.username}
                        </p>
                    <p className='text-sm text-gray-500'>
                        {item.gamename}
                    </p>

                    <span className='font-bold text-lg mt-2 text-blue-600'>
                        {item.score}
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}
