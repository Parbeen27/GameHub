export default function StatCards({ data }) {
  const cards = [
    { label: "Total Users", value: data?.totalUsers, color: "bg-blue-500" },
    { label: "Active Users", value: data?.activeUsers, color: "bg-green-500" },
    { label: "Games Played", value: data?.totalGamesPlayed, color: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-5 border"
        >
          <p className="text-gray-500 text-sm">{c.label}</p>
          <h2 className="text-2xl font-bold mt-2">{c.value}</h2>

          <div className={`h-1 w-full mt-4 rounded ${c.color}`} />
        </div>
      ))}

    </div>
  );
}