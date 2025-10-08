const express = require('express');
const app = express();
const PORT = 3001;

// ข้อมูลจำลอง students array
const students = [
    { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรม', year: 3 },
    { id: 2, name: 'สมหญิง เรียบร้อย', major: 'คอมพิวเตอร์', year: 2 },
    { id: 3, name: 'สมปอง มีสุข', major: 'วิศวกรรม', year: 4 },
    { id: 4, name: 'สมศรี แสนดี', major: 'คณิตศาสตร์', year: 1 }
];

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // CORS
    next();
});

// Route GET /
app.get('/', (req, res) => {
    res.json({
        message: 'ยินดีต้อนรับสู่ Student API (Express)',
        endpoints: [
            'GET /students',
            'GET /students/:id',
            'GET /students/major/:major',
            'GET /stats'
        ]
    });
});

// Route GET /students
app.get('/students', (req, res) => {
    res.json(students);
});

// Route GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: 'ไม่พบข้อมูลนักศึกษาตาม ID นี้' });
    }
});

// Route GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
    const majorParam = req.params.major;
    const filtered = students.filter(s => s.major === majorParam);
    res.json(filtered);
});

// Route GET /stats
app.get('/stats', (req, res) => {
    const totalStudents = students.length;
    const majorCounts = students.reduce((acc, student) => {
        acc[student.major] = (acc[student.major] || 0) + 1;
        return acc;
    }, {});

    res.json({
        totalStudents,
        majorCounts
    });
});

// Middleware จัดการ 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route นี้ไม่ถูกต้อง' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students'); 
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});
