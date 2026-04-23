

import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const GamesContext = createContext()

export default function GameContext({ children }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("/api/games")
        setGames(res.data)
      } catch (err) {
        console.log((err));
      }
      setLoading(false)
    }

    fetchGames()
  },[])

  return (
    <GamesContext.Provider value={{ games, loading}}>
         {children}
    </GamesContext.Provider>
  )
}
