import { TeamStatsData } from "@/app/types"

export default function TeamStats({ data }: { data: TeamStatsData }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{data.teamName}</h2>
      <p className="mb-4">Total Coins: <strong>{data.totalCoins || 0}</strong></p>

      {!data.members || data.members.length === 0 ? 
        <div className="text-center text-gray-400">
           <p>No members found</p>
        </div>
        : (
          <ul className="space-y-2">
            {data.members.map((member) => (
              <li key={member.userId} className="border p-2 rounded">
                <div className="flex justify-between">
                  <span>{member.name}</span>
                  <span>{member.coins} coins ({member.percentage}%)</span>
                </div>
              </li>
            ))}
          </ul>
        )}

    </div>
  )
}
