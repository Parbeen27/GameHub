import { useEffect, useState } from "react";
import axios from "axios";
import StatCards from "../../Components/analytics/StatCards";
import UserGrowthChart from "../../Components/analytics/UserGrowthChart";
import GameStatsTable from "../../Components/analytics/GameStatsTable";
import PeakHoursChart from "../../Components/analytics/PeakHoursChart";
import api from "../../services/api"

export default function AnalystDashboard() {
  const [data, setData] = useState(null);

  const token = localStorage.getItem("accessToken");

  const fetchData = async () => {
    
    const res = await api.get("/api/analyst/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-3 md:ml-70">
    <div className="flex justify-between items-center mb-6 ">
         <h1 className="text-2xl font-bold">📈 Overview</h1>
         <select className="border px-3 py-2 rounded">
           <option>Last 7 days</option>
           <option>Last 30 days</option>
           <option>All time</option>
         </select>
       </div>
      <StatCards data={data}/>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

         <div className="bg-white p-4 rounded-xl shadow">
           <h2 className="font-semibold mb-3">User Growth</h2>
           <UserGrowthChart />
         </div>  
         <div className="bg-white p-4 rounded-xl shadow">
           <h2 className="font-semibold mb-3">Peak Activity</h2>
           <PeakHoursChart />
         </div>  
       </div>  
       {/* Table */}
       <div className="bg-white p-4 rounded-xl shadow mt-6">
         <h2 className="font-semibold mb-3">Game Performance</h2>
         <GameStatsTable />
         </div>

      </div>
  )
}
