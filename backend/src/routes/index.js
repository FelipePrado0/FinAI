const express = require('express');
const router = express.Router();

// Placeholder routes
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/status', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login); // Mostly for testing or specific flows
router.get('/auth/me', authMiddleware, authController.me);

module.exports = router;
