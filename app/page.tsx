'use client';
import { useState } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // 发送搜索请求
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),  // 传递查询参数
      });
      const data = await res.json();
      
      // 设置响应结果
      if (data.result) {
        setResponse(data.result);  // 将API返回的结果展示
      } else {
        setResponse('未找到相关结果。');  // 没有数据时给出提示
      }
    } catch (error) {
      setResponse('发生错误，请稍后再试。');
    }
    setLoading(false);
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
          onChange={(e) => setQuery(e.target.value)}  // 更新查询内容
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
      {response && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <h2 className="font-bold text-xl mb-4">搜索结果：</h2>
          
          {/* 动态渲染返回的结果 */}
          <div className="space-y-4">
            {/* 检查response格式，动态渲染 */}
            {typeof response === 'string' ? (
              <p>{response}</p>  // 如果是字符串，直接显示
            ) : (
              // 如果是对象或者数组，可以根据数据结构渲染不同
              response.map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
}

