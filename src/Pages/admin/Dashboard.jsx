
import { useEffect, useState } from "react";
import axios from "axios";
import GamesChart from "../../Components/admin/Dashboard/GameChart";
import { GamesPie } from "../../Components/admin/Dashboard/GamesPie";
import StatsCards from "../../Components/admin/Dashboard/StatsCards"
import Activitylog from "../../Components/admin/Dashboard/Activitylog";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([])
  const token = localStorage.getItem("accessToken")
  const fetchGames = async() => {
    try {
      const res = await axios.get("/api/admin/stats/games",{
            headers: { Authorization: `Bearer ${token}`},
            withCredentials: true
        })
      setChartData(res.data);
      console.log(res.data);
      
    } catch (err) {
      console.log(err);
    }
  }
  const fetchUsersStats = async () => {
    try {
      const res = await axios.get("/api/admin/stats/users",{
            headers: { Authorization: `Bearer ${token}`},
            withCredentials: true
        })
       setStats(res.data);
       
    } catch (err) {
      console.log(err);
      
    }
  }

  const fecthLogs = async () => {
    try {
      const res = await axios.get("/api/admin",{
      headers: {
        Authorization: `Bearer ${token}`},
        withCredentials: true
    })
    setLogs(res.data)
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(() => {
    fetchGames();
    fetchUsersStats();
    fecthLogs()
  }, []);

return (
  <div className="p-4 md:ml-64 space-y-6 bg-gray-50 min-h-screen">

    {/* Header */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        📊 Admin Dashboard
      </h1>
      <p className="text-sm text-gray-500">
        Overview of users, games, and analytics
      </p>
    </div>

    {/* Stats */}
    <StatsCards stats={stats} />

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GamesChart data={chartData} />
      <GamesPie data={chartData} />
    </div>

    <Activitylog logs={logs}/>

  </div>
);
}

