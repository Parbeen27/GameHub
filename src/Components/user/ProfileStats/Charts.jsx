import React from 'react'
import {
    LineChart,Line,BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid
} from "recharts"
export default function Charts({data}) {
    const chartData = data.scores.map((s,i) => ({
        name: s.gameId?.name || `Game ${i + 1}`,
        score: s.score
    }))
  return (
    <div className="mt-8">
        <h3 className="font-semibold mb-3">📈 Score Trend</h3>
    
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#22c55e" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
