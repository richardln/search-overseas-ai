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
      console.log(data);  // 添加log，查看返回数据

      // 确保返回的数据是数组，如果是其他类型则处理为字符串或空数组
      if (data.result) {
        // 假设返回的是字符串或者数组，进行相应处理
        setResponse([{ name: '结果', description: data.result }]);  // 显示结果
      } else {
        setResponse([]);  // 如果没有结果，清空
      }
    } catch (error) {
      setResponse([]);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">出海通AI商务助手</h1>
      <p className="text-sm text-gray-500 mb-6">（越南版，其他国家陆续开放中）</p>
      <div className="flex w-full max-w-xl gap-2 mb-6">
       <textarea
  className="flex-grow border border-gray-300 rounded px-4 py-2"
  placeholder="请简述您的商务需求或者合作机会，AI助手即刻为您服务！"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  rows={4}  // 设置初始行数
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
          <h2 className="font-bold text-xl mb-4">AI助手：</h2>
          <div className="space-y-4">
            {response.map((item, index) => (
              <div key={index}>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 如果没有数据 */}
      {response.length === 0 && !loading && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <p>欢迎使用“出海通AI商务助手”。我们致力于为企业提供智能化的海外市场拓展解决方案，帮助您快速找到合适的商业伙伴和合作机会。</p>
        </div>
      )}
    </main>
  );
}
