const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 读取并解析 JSON 数据
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// 简单的查询功能：根据行业和地点来筛选数据
app.get('/search', (req, res) => {
  const { industry, location } = req.query;

  if (!industry || !location) {
    return res.status(400).json({ message: "Industry and Location are required" });
  }

  // 根据行业和地点进行匹配
  const results = data.filter(item => 
    item.industry.toLowerCase().includes(industry.toLowerCase()) &&
    item.location.toLowerCase().includes(location.toLowerCase())
  );

  // 返回结果
  res.json(results);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

