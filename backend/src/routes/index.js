const express = require('express');
const router = express.Router();

// Placeholder routes
router.get('/status', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

module.exports = router;
