import GameCard from "./GameCard";

export default function GameList({ games, refresh }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2 md:ml-4">
      {games.map((game) => (
        <GameCard key={game._id} game={game} refresh={refresh} />
      ))}
    </div>
  );
}