import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts"
export default function Charts({ data = []}) {
    const data = [
        { name: "Active", value: users.filter(u => !u.isBlocked).length  },
        { name: "Blocked", value: users.filter(u => u.isBlocked).length  },
    ]

    const COLORS = ["#22c55e", "#ef4444"]
  return (
    <div className="bg-white p-6 rounded-xl shadow h-80">
        <h3 className="mb-4 font-semibold">User Status</h3>

        <div className="w-full h-75">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={data} dataKey="value" outerRadius={100}>
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]}/>
                    ))}
                </Pie>
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
        </div>
    </div>
  )
}
