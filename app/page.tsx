'use client'

import React, { useState } from 'react'

export default function Page() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    if (!query) return

    try {
      const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.results)
    } catch (error) {
      console.error('搜索失败:', error)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">出海通AI商务助手</h1>
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="请输入搜索关键词..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border px-4 py-2 rounded shadow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          搜索
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((item, index) => (
            <div key={index} className="border rounded p-4 shadow-sm">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.type}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
