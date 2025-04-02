'use client';
import { useState } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<any[]>([]);  // 初始化为数组
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

      // 确保返回的数据是数组，如果是其他类型则处理为字符串或空数组
      if (Array.isArray(data.result)) {
        setResponse(data.result);
      } else {
        setResponse([]);  // 如果不是数组，则清空结果
      }
    } catch (error) {
      setResponse([]);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">出海投资商务通AI智能搜索</h1>
      <p className="text-sm text-gray-500 mb-6">（越南版，其他国家陆续开放中）</p>
      <div className="flex w-full max-w-xl gap-2 mb-6">
        <input
          className="flex-grow border border-gray-300 rounded px-4 py-2"
          placeholder="例如：我是钛白粉的供应商，想找越南的当地的涂料企业..."
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

      {/* 搜索结果展示 */}
      {response.length > 0 && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <h2 className="font-bold text-xl mb-4">搜索结果：</h2>
          <div className="space-y-4">
            {response.map((item, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 如果没有数据 */}
      {response.length === 0 && !loading && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <p>没有找到相关结果。</p>
        </div>
      )}
    </main>
  );
}


