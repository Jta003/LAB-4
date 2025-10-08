const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// ฟังก์ชันช่วย filter ตาม query parameters
const filterFoods = (foods, query) => {
    let result = [...foods];
    const { search, category, maxSpicy, vegetarian, available, maxPrice } = query;

    if (search) {
        const lowerSearch = search.toLowerCase();
        result = result.filter(f => f.name.toLowerCase().includes(lowerSearch) || f.description.toLowerCase().includes(lowerSearch));
    }
    if (category) {
        result = result.filter(f => f.category.toLowerCase() === category.toLowerCase());
    }
    if (maxSpicy) {
        const spicy = parseInt(maxSpicy);
        result = result.filter(f => f.spicyLevel <= spicy);
    }
    if (vegetarian !== undefined) {
        const isVeg = vegetarian === 'true';
        result = result.filter(f => f.vegetarian === isVeg);
    }
    if (available !== undefined) {
        const isAvailable = available === 'true';
        result = result.filter(f => f.available === isAvailable);
    }
    if (maxPrice) {
        const price = parseFloat(maxPrice);
        result = result.filter(f => f.price <= price);
    }

    return result;
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();
        foods = filterFoods(foods, req.query);

        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: req.query.search || null,
                category: req.query.category || null,
                maxSpicy: req.query.maxSpicy || null,
                vegetarian: req.query.vegetarian || null,
                available: req.query.available || null,
                maxPrice: req.query.maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});



// GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    const foods = loadFoods();
    const category = req.params.category.toLowerCase();
    const filtered = foods.filter(f => f.category.toLowerCase() === category);

    if (filtered.length === 0) {
        return res.status(404).json({
            success: false,
            message: `No foods found in category "${req.params.category}"`
        });
    }

    res.json({
        success: true,
        data: filtered,
        total: filtered.length
    });
});

// GET /api/foods/random - ต้องมาก่อน /:id
router.get('/random', (req, res) => {
    let foods = loadFoods();
    foods = filterFoods(foods, req.query);

    if (foods.length === 0) {
        return res.status(404).json({ success: false, message: 'No foods available' });
    }

    const randomIndex = Math.floor(Math.random() * foods.length);
    res.json({ success: true, data: foods[randomIndex] });
});

// GET /api/foods/:id
router.get('/:id', (req, res) => {
    const foods = loadFoods();
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid food id'
        });
    }

    const food = foods.find(f => f.id === id);

    if (!food) {
        return res.status(404).json({
            success: false,
            message: `Food with id ${id} not found`
        });
    }

    res.json({
        success: true,
        data: food
    });
});
module.exports = router;
