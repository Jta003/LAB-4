const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import routes
const contactRoutes = require('./routes/contact');
const feedbackRoutes = require('./routes/feedback');
const { readJsonFile } = require('./middleware/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------
// Rate limiting
// ---------------------

// Development mode: disable limiter for form submission
const isDev = process.env.NODE_ENV !== 'production';

let formLimiter;
let apiLimiter;

if (!isDev) {
    // Production: ใช้ limiter ปกติ
    apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: { success: false, message: 'Too many requests, please try again later' }
    });

    formLimiter = rateLimit({
        windowMs: 60 * 1000,
        max: 10,
        message: { success: false, message: 'Too many submissions, please try again later' }
    });
} else {
    // Dev: disable limiter
    apiLimiter = (req, res, next) => next();
    formLimiter = (req, res, next) => next();
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ใช้ limiter
app.use('/api', apiLimiter);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact & Feedback routes
app.use('/api/contact', formLimiter, contactRoutes);
app.use('/api/feedback', formLimiter, feedbackRoutes);

// API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Contact Form API Documentation',
        version: '1.0.0',
        endpoints: {
            'POST /api/contact': {
                description: 'Submit contact form',
                requiredFields: ['name', 'email', 'subject', 'message'],
                optionalFields: ['phone', 'company']
            },
            'GET /api/contact': {
                description: 'Get all contact submissions (admin)',
                parameters: { page: 'Page number', limit: 'Items per page' }
            },
            'POST /api/feedback': {
                description: 'Submit feedback',
                requiredFields: ['rating', 'comment'],
                optionalFields: ['email']
            },
            'GET /api/feedback/stats': { description: 'Get feedback statistics' }
        }
    });
});

// GET /api/status
app.get('/api/status', async (req, res) => {
    try {
        const contacts = await readJsonFile('contacts.json');
        const feedback = await readJsonFile('feedback.json');

        res.json({
            success: true,
            status: 'API is running',
            totalContacts: contacts.length,
            totalFeedback: feedback.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching API status' });
    }
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Contact Form API running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
    if (isDev) console.log('⚡ Development mode: rate limiter disabled for form submission');
});
