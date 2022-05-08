const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip')

router.post('/book', tripController.book_trip);

module.exports = router;