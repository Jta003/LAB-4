// routes/feedback.js
const express = require('express');
const router = express.Router();

const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');
const { validateFeedback } = require('../middleware/validation');

const FEEDBACK_FILE = 'feedback.json';

// POST /api/feedback - บันทึกความคิดเห็น
router.post('/', validateFeedback, async (req, res) => {
    try {
        const newFeedback = await appendToJsonFile(FEEDBACK_FILE, req.body);
        if (!newFeedback) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save feedback'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: newFeedback
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/feedback/stats - ดึงสถิติ feedback
router.get('/stats', async (req, res) => {
    try {
        const allFeedback = await readJsonFile(FEEDBACK_FILE);

        if (allFeedback.length === 0) {
            return res.json({
                success: true,
                total: 0,
                averageRating: 0,
                ratingCounts: {}
            });
        }

        const total = allFeedback.length;
        const sumRatings = allFeedback.reduce((sum, f) => sum + (f.rating || 0), 0);
        const averageRating = +(sumRatings / total).toFixed(2);

        // นับจำนวนแต่ละ rating
        const ratingCounts = {};
        for (let i = 1; i <= 5; i++) ratingCounts[i] = 0;
        allFeedback.forEach(f => {
            if (f.rating >=1 && f.rating <=5) ratingCounts[f.rating]++;
        });

        res.json({
            success: true,
            total,
            averageRating,
            ratingCounts
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
