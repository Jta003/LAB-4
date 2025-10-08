# การเปรียบเทียบ HTTP Server vs Express Server

## 1️⃣ HTTP Server (Node.js พื้นฐาน)

**ข้อดี:**
- ใช้งานได้ทันที ไม่ต้องติดตั้ง library เพิ่มเติม  
- เข้าใจ flow ของ request/response ใน Node.js อย่างละเอียด  
- เหมาะกับการเรียนรู้พื้นฐาน HTTP protocol  

**ข้อเสีย:**
- ต้องจัดการ routing ด้วยตนเอง (parse URL, check path, method)  
- การเพิ่ม feature ใหม่ (เช่น middleware, body parsing, CORS) ต้องเขียนเอง  
- โค้ดมักยาวและซ้ำซ้อนเมื่อโปรเจคใหญ่ขึ้น  

**ตัวอย่าง code:**
```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/students' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(students));
  }
});

server.listen(3000, () => console.log('HTTP Server running on port 3000'));
```

## 2️⃣ Express Server

**ข้อดี:**
- มี routing built-in, middleware และ JSON parsing
- โค้ดสั้น อ่านง่าย และจัดการ project ขนาดใหญ่ได้ดี
- สามารถเพิ่ม feature เช่น CORS, logging, authentication ได้ง่าย

**ข้อเสีย:**
- ต้องติดตั้ง library เพิ่ม (`npm install express`)
- ซับซ้อนกว่าการใช้ HTTP server พื้นฐานเล็กน้อยสำหรับโปรเจคเล็กมาก

**ตัวอย่าง code:**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(3001, () => console.log('Express Server running on port 3001'));
```