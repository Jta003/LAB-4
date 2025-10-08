const express = require('express');
const cors = require('cors');
const path = require('path');

// TODO: import foodRoutes จาก './routes/foods'
const foodRoutes = require('./routes/foods');
// TODO: import logger middleware จาก './middleware/logger'
const logger = require('./middleware/logger');

const app = express(); // ต้องสร้าง app ก่อนใช้ middleware
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// TODO: ใช้ logger middleware
app.use(logger);

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            documentation: '/api/docs'
        }
    });
});

// TODO: ใช้ foodRoutes สำหรับ '/api/foods'
app.use('/api/foods', foodRoutes);

// TODO: สร้าง route GET /api/docs
// ส่งข้อมูล API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Food API Documentation',
        version: '1.0.0',
        endpoints: [
            { method: 'GET', path: '/api/foods', description: 'Get all foods' },
            { method: 'GET', path: '/api/foods?search=keyword', description: 'Search foods by keyword' },
            { method: 'GET', path: '/api/foods?category=name', description: 'Filter foods by category' },
            { method: 'GET', path: '/api/foods?maxSpicy=n', description: 'Filter foods by spiciness' },
            { method: 'GET', path: '/api/foods?vegetarian=true', description: 'Filter vegetarian foods' },
            { method: 'GET', path: '/api/stats', description: 'Get statistics about foods' }
        ]
    });
});

// TODO: สร้าง route GET /api/stats  
// ส่งสถิติต่างๆ เช่น จำนวนเมนูทั้งหมด, จำนวนแต่ละหมวด, etc.
app.get('/api/stats', (req, res) => {
    // สมมติเป็นตัวอย่างสถิติ
    res.json({
        totalFoods: 100,            // TODO: replace with real count
        categories: {
            แกง: 20,               // TODO: replace with real category counts
            ผัด: 30,
            ของหวาน: 10
        },
        spicyLevels: {
            1: 15,
            2: 25,
            3: 10
        },
        vegetarianCount: 40
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});
