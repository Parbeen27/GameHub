import { useContext } from "react"
import { GamesContext } from "../../Context/GameContext"
import TopBar from "../../Components/user/Home/TopBar"
import { useNavigate } from "react-router-dom"
import LeaderboardPreview from "../../Components/user/Home/LeaderboardPreview"
import { useAuth } from "../../Context/AuthContext"


function Home() {
  const {games, loading} = useContext(GamesContext)
  const navigate = useNavigate()
  const { dark, setDark} = useAuth()
  
  if(loading){
    return (
      <div className="h-screen flex items-center justify-center">
        Loading games
      </div>
    )
  }
  return (
    <div className={dark ? "dark" : ""}>
    <div className=' bg-gray-300 dark:bg-gray-900 text-black dark:text-white min-h-screen pt-16 '>
    
      <div className="max-w-7xl mx-auto">
        <LeaderboardPreview/>
      </div>
      <div className="max-w-7xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-4 ">🎮 Games</h1>
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 ">
        {games.map((game) => (
          <button key={game._id} className="transform cursor-pointer active:scale-95 transition duration-300" 
          onClick={()=>{
            navigate(`/game/${game._id}`)
          }}>
            <TopBar img={game.img} game={game.name} desc={game.description} img={game.thumbnail}/></button>
        ))}
      </div>
    </div>
    </div>
    </div>
  )
}

export default Home