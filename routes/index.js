const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    res.sendFile('../index.html');
})

module.exports = router;