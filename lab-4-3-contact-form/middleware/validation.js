// middleware/validation.js

// Contact form validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

    // Name: required, string, 2-100 chars
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
        errors.push('Name is required, must be a string, and 2-100 characters long.');
    }

    // Email: required, valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
        errors.push('Email is required and must be a valid email address.');
    }

    // Subject: required, 5-200 chars
    if (!subject || typeof subject !== 'string' || subject.trim().length < 5 || subject.trim().length > 200) {
        errors.push('Subject is required and must be 5-200 characters long.');
    }

    // Message: required, 10-1000 chars
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000) {
        errors.push('Message is required and must be 10-1000 characters long.');
    }

    // Phone: optional, if present must be 9-10 digits
    const phoneRegex = /^[0-9]{9,10}$/;
    if (phone && !phoneRegex.test(phone.trim())) {
        errors.push('Phone number must be 9-10 digits.');
    }

    // Company: optional, max 100 chars
    if (company && (typeof company !== 'string' || company.trim().length > 100)) {
        errors.push('Company must be at most 100 characters long.');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    // Sanitize data
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.subject = subject.trim();
    req.body.message = message.trim();
    if (phone) req.body.phone = phone.trim();
    if (company) req.body.company = company.trim();

    next();
};

// Feedback validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];

    // Rating: required, number 1-5
    const parsedRating = parseInt(rating);
    if (!rating || isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        errors.push('Rating is required and must be a number between 1 and 5.');
    }

    // Comment: required, 5-500 chars
    if (!comment || typeof comment !== 'string' || comment.trim().length < 5 || comment.trim().length > 500) {
        errors.push('Comment is required and must be 5-500 characters long.');
    }

    // Email: optional, if present must be valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.trim())) {
        errors.push('Email must be a valid email address.');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    // Sanitize data
    req.body.comment = comment.trim();
    if (email) req.body.email = email.trim().toLowerCase();
    req.body.rating = parsedRating;

    next();
};

module.exports = {
    validateContact,
    validateFeedback
};
