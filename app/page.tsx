'use client'

import { useEffect, useState } from "react"
import TeamStats from "@/components/TeamStats"
import DateFilter from "@/components/DateFilter"

export default function Home() {
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState<any>([])
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0)

  const fetchStats = async (id: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/teams/${id}/stats`)
      const json = await res.json()
      setData(json)
      setSelectedTeamId(id)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeaderboard = async (id: number) => {
    const res = await fetch(`/api/teams/${id}/leaderboard?from=${from}&to=${to}`)
    const json = await res.json()
    setData(json)
    setSelectedTeamId(id)
  }

  const fetchTeams = async () => {
    const res = await fetch("/api/teams")
    const json = await res.json()
    setTeams(json)
    fetchStats(json[0].id)
  }

  const handleCleanFilter = () => {
    setFrom("")
    setTo("")
    fetchStats(selectedTeamId)
  }

  const handleClickTeam = (id: number) => {
    if (from && to && !isNaN(Date.parse(from)) && !isNaN(Date.parse(to))) {
      return fetchLeaderboard(id)
    } 

    fetchStats(id)
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    if (from && to && !isNaN(Date.parse(from)) && !isNaN(Date.parse(to))) {
      fetchLeaderboard(selectedTeamId)
    }
  }, [from, to])

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team Stats</h1>
      <DateFilter from={from} to={to} onChange={(f, t) => { setFrom(f); setTo(t); }} onCleanFilter={handleCleanFilter} /> 
      <div className="flex gap-2 mb-4 max-w-full overflow-x-auto scrollbar-hide">
        {teams.map((team: any) => (
          <button 
            key={team.id} 
            onClick={() => handleClickTeam(team.id)} 
            className={`border p-2 rounded ${selectedTeamId === team.id ? "bg-blue-700 text-white" : "bg-gray-800 border-gray-700"}`}
          >
            {team.name}
          </button>
        ))}
      </div>
      <div className="border p-4 rounded bg-gray-800 border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Team Stats</h2>
        {loading && <p>Loading...</p>}
        {data && <TeamStats data={data} />}
      </div>
    </main>
  )
}
