'use client';
import { useState } from 'react';

export default function Page() {
  // State hooks
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<any[]>([]); // 存储搜索结果
  const [loading, setLoading] = useState(false); // 控制加载状态

  // 搜索处理函数
  const handleSearch = async () => {
    setLoading(true);  // 启动加载状态
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await res.json();  // 获取返回的数据

      // 检查数据是否符合预期格式
      if (data && data.result && Array.isArray(data.result)) {
        setResponse(data.result);  // 更新搜索结果
      } else {
        setResponse([]);  // 如果结果格式不正确，则清空
      }
    } catch (error) {
      console.error('Error during API call:', error);
      setResponse([]);  // 发生错误时清空结果
    } finally {
      setLoading(false);  // 关闭加载状态
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">出海投资商务通AI智能搜索</h1>
      <p className="text-sm text-gray-500 mb-6">（越南版，其他国家陆续开放中）</p>
      
      {/* 搜索框 */}
      <div className="flex w-full max-w-xl gap-2 mb-6">
        <input
          className="flex-grow border border-gray-300 rounded px-4 py-2"
          placeholder="例如：我是钛白粉的供应商，想找越南的当地的涂料企业..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // 更新查询
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
                <h3 className="font-semibold text-lg">{item.name || '未命名企业'}</h3>
                <p>{item.description || '暂无描述'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 如果没有找到结果 */}
      {response.length === 0 && !loading && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <p>没有找到相关结果。</p>
        </div>
      )}

      {/* 如果正在加载 */}
      {loading && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <p>正在加载结果，请稍等...</p>
        </div>
      )}
    </main>
  );
}
