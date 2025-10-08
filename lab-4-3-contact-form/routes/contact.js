// routes/contact.js
const express = require('express');
const router = express.Router();

const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');
const { validateContact } = require('../middleware/validation');

const CONTACT_FILE = 'contact.json';

// POST /api/contact - บันทึกข้อมูล contact form
router.post('/', validateContact, async (req, res) => {
    try {
        const newContact = await appendToJsonFile(CONTACT_FILE, req.body);
        if (!newContact) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save contact'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Contact submitted successfully',
            data: newContact
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/contact - ดึงข้อมูล contact ทั้งหมด (พร้อม pagination)
router.get('/', async (req, res) => {
    try {
        const allContacts = await readJsonFile(CONTACT_FILE);

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedContacts = allContacts.slice(startIndex, endIndex);

        res.json({
            success: true,
            total: allContacts.length,
            page,
            limit,
            data: paginatedContacts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
