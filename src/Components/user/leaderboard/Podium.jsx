import React from 'react'

export default function Podium({ scores = [] }) {
    if (scores.length < 3) return null;

    const [first, second, third] = scores;
  return (
    <div className='flex justify-center items-end gap-6 mb-8'>

        <PodiumCard
          user={second.username}
          score={second.score}
          rank={2}
        />

        <PodiumCard
          user={first.username}
          score={first.score}
          rank={1}
          big
        />

        <PodiumCard
          user={third.username}
          score={third.score}
          rank={3}
        />
    </div>
  )
}

function PodiumCard({ user, score, rank, big }){
    return (
        <div className={`flex flex-col items-center justify-end p-4 rounded-xl shadow
            ${big ? "bg-yellow-300 h-40" : "bg-gray-200 h-32"}`}>
                <p className='text-lg font-bold'>
                    {rank === 1 && "🥇"}
                    {rank === 2 && "🥈"}
                    {rank === 3 && "🥉"}
                </p>

                <p className='font-semibold'>{user}</p>
                <p className='text-sm'>{score}</p>
            </div>
    )
}