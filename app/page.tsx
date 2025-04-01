'use client';

import { useState } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.result);
    } catch (error) {
      setResponse('发生错误，请稍后再试。');
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">出海商务通AI智能搜索</h1>
      <p className="text-sm text-gray-500 mb-6">（越南，其他国家陆续开放中）</p>

      <div className="flex w-full max-w-xl gap-2">
        <input
          className="flex-grow border border-gray-300 rounded px-4 py-2"
          placeholder="我是做钛白粉的，想找越南采购商..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? '搜索中...' : '搜索'}
        </button>
      </div>

      {response && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
