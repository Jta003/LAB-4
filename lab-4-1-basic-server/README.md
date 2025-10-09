# 🧪 Lab 4.1: สร้างเซิร์ฟเวอร์แรกด้วย Node.js

## 🎯 เป้าหมาย
สร้าง HTTP Server พื้นฐานด้วย Node.js และเปรียบเทียบการทำงานกับ Express.js

---

## 📁 โครงสร้างโปรเจกต์

```
lab-4-1-basic-server/
├── package.json
├── README.md
├── http-server.js          ← เซิร์ฟเวอร์พื้นฐาน (ใช้ http module)
├── express-server.js       ← เซิร์ฟเวอร์แบบ Express.js
└── comparison.md           ← เขียนสรุปเปรียบเทียบโดยนักศึกษา
```

---

## ⚙️ การติดตั้ง (Installation)

1. เปิด Terminal และเข้าสู่โฟลเดอร์โปรเจกต์

   ```bash
   cd lab-4-1-basic-server
   ```

2. ติดตั้ง dependencies ที่จำเป็น

   ```bash
   npm install
   ```

---

## 🚀 การรันเซิร์ฟเวอร์ (Run Servers)

### 🔹 รัน HTTP Server (พอร์ต 3000)

```bash
npm run start:http
```

หรือใช้ **nodemon** สำหรับโหมดพัฒนา (auto reload)

```bash
npm run dev:http
```

เมื่อรันสำเร็จ จะเห็นข้อความใน Terminal:

```
🌐 HTTP Server running on http://localhost:3000
Available endpoints:
  GET /
  GET /students
  GET /students/:id
  GET /students/major/:major
```

### 🔹 รัน Express Server (พอร์ต 3001)

```bash
npm run start:express
```

หรือใช้โหมด dev

```bash
npm run dev:express
```

เมื่อรันสำเร็จ จะเห็นข้อความใน Terminal:

```
🚀 Express Server running on http://localhost:3001
Available endpoints:
  GET /
  GET /students
  GET /students/:id
  GET /students/major/:major
  GET /stats
```

---

## 🧭 การทดสอบ (Testing)

สามารถทดสอบได้หลายวิธี:

### ✅ 1. ผ่านเบราว์เซอร์
เปิด URL เหล่านี้:

- [http://localhost:3000/](http://localhost:3000/) — หน้าหลักของ HTTP Server  
- [http://localhost:3000/students](http://localhost:3000/students) — ดูรายชื่อนักศึกษาทั้งหมด  
- [http://localhost:3000/students/1](http://localhost:3000/students/1) — ดูข้อมูลนักศึกษาตาม ID  
- [http://localhost:3000/students/major/วิศวกรรม](http://localhost:3000/students/major/วิศวกรรม) — ดูนักศึกษาตามสาขา  

สำหรับ Express server เปลี่ยนเป็นพอร์ต `3001`

- [http://localhost:3001/stats](http://localhost:3001/stats) — ดูสถิตินักศึกษา

---

### ✅ 2. ผ่าน Postman หรือ cURL

ตัวอย่างการทดสอบด้วย **cURL**:

```bash
curl http://localhost:3000/students
curl http://localhost:3001/students/major/วิศวกรรม
```


---

## 🧩 หมายเหตุ
- พอร์ต 3000 สำหรับ HTTP server  
- พอร์ต 3001 สำหรับ Express server  
- หากรันพร้อมกัน ให้เปิด 2 Terminal แยก  
- ใช้ `Ctrl + C` เพื่อหยุดเซิร์ฟเวอร์  

---

## 🧠 สรุป
Lab นี้ช่วยให้นักศึกษาเข้าใจพื้นฐานการสร้างเว็บเซิร์ฟเวอร์ด้วย Node.js  
และเห็นความแตกต่างระหว่างการเขียนโค้ดด้วย **http module** แบบดั้งเดิม  
กับการใช้ **Express.js** ที่ช่วยให้การพัฒนาเว็บง่ายและเร็วขึ้น 🚀

---

👨‍💻 ผู้พัฒนา: *[67543210066-6 นายศุภโชค แสงจันทร์]*  
📅 วิชา: Web Application Development  

