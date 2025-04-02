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
      {response && (
        <div className="mt-6 max-w-xl w-full bg-white shadow p-4 border border-gray-200 rounded">
          <h2 className="font-bold text-xl mb-4">搜索结果：</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">1. Vietnam Titanium Dioxide Joint Stock Company (VTIC)</h3>
              <p>VTIC 提供各种规格和等级的钛白粉产品，广泛应用于涂料、塑料、纸张等行业。</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">2. Vietnam National Chemical Group (Vinachem)</h3>
              <p>Vinachem 是越南国内化工集团，旗下拥有多家化工企业，包含生产钛白粉的工厂。</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">3. Vietnam Titanium Dioxide Co., Ltd. (VTDC)</h3>
              <p>VTDC 是一家专业生产钛白粉的公司，产品质量稳定，深受客户好评。</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">4. Vietnam Chemicals Company (VCC)</h3>
              <p>VCC 提供多种化工产品，包括钛白粉。提供定制化的产品和服务。</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
