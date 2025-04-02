Skip to content
Richard's projects
Richard's projects

Hobby

search-overseas-ai

6tag01l4q

Changelog
Help
Docs

Source
Output
app/page.tsx

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
  rows={2}  // 设置初始行数
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
            <div className="mt-6 max-w-xl w-full bg-white shadow p-4 rounded">
          <p>欢迎使用“出海通AI商务助手”。我们致力于为企业提供智能化的海外市场拓展解决方案，帮助您快速找到合适的商业伙伴和合作机会。</p>
        </div>
      )}
    </main>
  );
}
search-overseas-ai – Deployment Source – Vercel
23:07:40
