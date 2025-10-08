const express = require('express');
const app = express();
const PORT = 3001;

// TODO: สร้างข้อมูลจำลอง students array เดียวกับใน http-server.js

// Middleware
app.use(express.json());

// TODO: Route GET / 
// ส่งข้อความต้อนรับและรายการ endpoints

// TODO: Route GET /students
// ส่งรายการนักศึกษาทั้งหมด

// TODO: Route GET /students/:id
// ส่งข้อมูลนักศึกษาตาม ID

// TODO: Route GET /students/major/:major  
// กรองนักศึกษาตามสาขา

// TODO: Route GET /stats
// ส่งสถิติ เช่น จำนวนนักศึกษาทั้งหมด, จำนวนแต่ละสาขา

// TODO: Middleware จัดการ 404
// ส่งข้อความ error ที่เหมาะสม

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students'); 
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});