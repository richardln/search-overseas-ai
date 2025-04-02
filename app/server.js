const express = require('express');
const fs = require('fs');
const cors = require('cors'); // ✅ 新增

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // ✅ 新增

const loadData = () => {
  const rawData = fs.readFileSync('./data.json');
  return JSON.parse(rawData);
};

app.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const data = loadData();

  const results = data.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );

  res.json({ results });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
