const express = require('express');
const app = express();
const PORT = 3001;

// 🧑‍🎓 สร้างข้อมูลจำลอง students array เดียวกับใน http-server.js
const students = [
  { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรมคอมพิวเตอร์', year: 3 },
  { id: 2, name: 'สมศรี รักเรียน', major: 'เทคโนโลยีสารสนเทศ', year: 2 },
  { id: 3, name: 'อนันต์ คิดไว', major: 'วิศวกรรมคอมพิวเตอร์', year: 4 },
];

// Middleware
app.use(express.json());

// 🏠 Route GET / 
// ส่งข้อความต้อนรับและรายการ endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'ยินดีต้อนรับสู่ Express Server 🚀',
    endpoints: [
      'GET /students',
      'GET /students/:id',
      'GET /students/major/:major',
      'GET /stats',
    ],
  });
});

// 👨‍🎓 Route GET /students
// ส่งรายการนักศึกษาทั้งหมด
app.get('/students', (req, res) => {
  res.json(students);
});

// 🔍 Route GET /students/:id
// ส่งข้อมูลนักศึกษาตาม ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: `ไม่พบนักศึกษาที่มี ID = ${id}` });
  }
});

// 🧭 Route GET /students/major/:major  
// กรองนักศึกษาตามสาขา
app.get('/students/major/:major', (req, res) => {
  const { major } = req.params;
  const filtered = students.filter((s) => s.major.includes(major));

  if (filtered.length > 0) {
    res.json(filtered);
  } else {
    res.status(404).json({ error: `ไม่พบนักศึกษาสาขา "${major}"` });
  }
});

// 📊 Route GET /stats
// ส่งสถิติ เช่น จำนวนนักศึกษาทั้งหมด, จำนวนแต่ละสาขา
app.get('/stats', (req, res) => {
  const total = students.length;
  const majorCount = {};

  students.forEach((s) => {
    majorCount[s.major] = (majorCount[s.major] || 0) + 1;
  });

  res.json({
    total_students: total,
    majors: majorCount,
  });
});

// ⚠️ Middleware จัดการ 404
app.use((req, res) => {
  res.status(404).json({ error: 'ไม่พบหน้า (404 Not Found)' });
});

// 🚀 เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`🚀 Express Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET /');
  console.log('  GET /students'); 
  console.log('  GET /students/:id');
  console.log('  GET /students/major/:major');
  console.log('  GET /stats');
});
