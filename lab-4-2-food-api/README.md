# Food API Lab 4.2

## Installation
1. Clone repository
2. `npm install`
3. `node server.js` or `nodemon server.js`

## API Endpoints
- GET `/api/foods` - ดึงรายการอาหารทั้งหมด
- GET `/api/foods?search=keyword` - ค้นหาอาหาร
- GET `/api/foods?category=name` - กรองตามหมวด
- GET `/api/foods?maxSpicy=n` - กรองความเผ็ด
- GET `/api/foods?vegetarian=true` - อาหารมังสวิรัติ
- GET `/api/foods/:id` - ดึงข้อมูลอาหารตาม ID
- GET `/api/foods/random` - อาหารแบบสุ่ม
- GET `/api/stats` - สถิติอาหาร
- GET `/api/docs` - เอกสาร API

## Demo
เปิด `public/index.html` เพื่อทดสอบ API

## Logger
ทุก request จะแสดง method, URL และ timestamp บน console
