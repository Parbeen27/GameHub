import React, { useEffect, useState } from 'react'
import GameForm from '../../Components/admin/Games/GameForm'
import GameList from '../../Components/admin/Games/GameList'
import axios from 'axios'

export default function Games() {
    const [games, setGames] = useState([])
    const token = localStorage.getItem("accessToken")
    const fetchGames = async () => {
        const res = await axios("/api/admin/games",{
            headers: {
                Authorization: `Bearer ${token}`
            },withCredentials: true
        })
        setGames(res.data)
        
    }
    useEffect(() => {
        fetchGames()
    },[])
  return (
    <div className='p-5  flex flex-col gap-3 items-center w-full'>
        <h1 className='font-bold'>Games</h1>

        <GameForm onSuccess={fetchGames}/>

        <GameList games={games} refresh={fetchGames}/>
    </div>
  )
}
