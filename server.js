const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // phục vụ file index.html

const DB_FILE = 'db.json';

// Đọc dữ liệu sinh viên
app.get('/students', async (req, res) => {
  const data = await fs.readJson(DB_FILE);
  res.json(data);
});

// Thêm sinh viên
app.post('/students', async (req, res) => {
  const data = await fs.readJson(DB_FILE);
  data.push(req.body);
  await fs.writeJson(DB_FILE, data);
  res.json({ message: 'Đã thêm sinh viên!' });
});

// Server chạy
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
