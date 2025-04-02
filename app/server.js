const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// 解析 JSON 请求体
app.use(express.json());

// 读取数据
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// 根路由，测试服务器是否正常工作
app.get('/', (req, res) => {
  res.send('Server is running');
});

// 搜索路由，根据用户请求过滤数据
app.post('/search', (req, res) => {
  const { query } = req.body;  // 获取请求中的查询词
  if (!query) {
    return res.status(400).send({ message: 'Query is required' });
  }

  // 简单的搜索逻辑：查找匹配的项目
  const results = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  res.json(results);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
