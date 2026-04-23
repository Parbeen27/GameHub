import axios from "axios";
import api from "../../../services/api";
export default function GameCard({ game, refresh }) {
  const token = localStorage.getItem("accessToken");

  const handleToggle = async () => {
    await api.patch(`/api/admin/games/${game._id}/toggle`,{},{
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    refresh();
  };

  return (
<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
  
  {/* Image */}
  <div className="relative">
    <img
      src={game.thumbnail}
      alt={game.name}
      className="h-40 w-full object-cover"
    />

    {/* Status Badge */}
    <span
      className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-semibold
        ${game.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
      `}
    >
      {game.isActive ? "Active" : "Inactive"}
    </span>
  </div>

  {/* Content */}
  <div className="p-4 space-y-2">
    <h3 className="font-semibold text-gray-800">{game.name}</h3>

    <p className="text-sm text-gray-600 line-clamp-2">
      {game.description}
    </p>

    {/* Actions */}
    <div className="flex justify-between items-center pt-2">
      <span className="text-xs text-gray-400">{game.genre}</span>

      <button
        onClick={handleToggle}
        className={`text-xs px-3 py-1 rounded-md transition
          ${
            game.isActive
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }
        `}
      >
        {game.isActive ? "Deactivate" : "Activate"}
      </button>
    </div>
  </div>
</div>
  );
}
