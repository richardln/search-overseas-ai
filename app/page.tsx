// app/page.tsx
import React from 'react';

export default function Page() {
  return (
    <div className="container">
      {/* 搜索栏部分 */}
      <div className="search-section">
        <h1>出海通AI商务助手</h1>
        <p>(越南版，其他国家陆续开放中)</p>
        <input type="text" placeholder="请输入您的商务需求或合作机会，AI助手即刻为您服务！" />
        <button>搜索</button>
      </div>

      {/* 新添加的板块 */}
      <div className="sections">
        <h2>推荐板块</h2>
        <div className="section-cards">
          <div className="section-card">
            <h3>工业园区</h3>
            <p>探索各大工业园区的信息，寻找最佳投资机会。</p>
            <button>了解更多</button>
          </div>
          <div className="section-card">
            <h3>当地政府</h3>
            <p>了解各地政府的政策与合作机会，助力企业发展。</p>
            <button>了解更多</button>
          </div>
          <div className="section-card">
            <h3>企业服务</h3>
            <p>寻找适合的企业服务合作伙伴，为您的业务发展提供支持。</p>
            <button>了解更多</button>
          </div>
        </div>
      </div>

      {/* 其他页面内容 */}
    </div>
  );
}
