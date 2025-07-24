type Props = {
  from: string
  to: string
  onChange: (from: string, to: string) => void
  onCleanFilter: () => void
}

export default function DateFilter({ from, to, onChange, onCleanFilter }: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div>
        <label className="block text-sm font-medium">From</label>
        <input
          type="date"
          className="border px-2 py-1 rounded bg-gray-800 border-gray-700"
          value={from}
          onChange={e => onChange(e.target.value, to)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">To</label>
        <input
          type="date"
          className="border px-2 py-1 rounded bg-gray-800 border-gray-700"
          value={to}
          onChange={e => onChange(from, e.target.value)}
        />
      </div>
      {from && to && (
        <div className="flex items-end">
        <button 
          onClick={onCleanFilter} 
          className="border rounded bg-gray-800 border-gray-700 px-2 py-1"
        >
          Clear Filters
        </button>
      </div>
      )}
    </div>
  )
}