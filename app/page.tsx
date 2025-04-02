'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <main className="min-h-screen p-10 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">出海通 AI 智能搜索</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border border-gray-300 p-2 rounded"
          placeholder="请输入关键词，如 越南 工业园区 企业服务"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          搜索
        </button>
      </div>

      <div>
        {results.map((item: any, idx) => (
          <div key={idx} className="border rounded p-4 mb-2 shadow-sm">
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.type}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
