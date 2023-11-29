const express = require('express');
const router = express.Router();
const slideshowStatusController = require('../Controllers/SlideshowStatusController');

router.get('/', slideshowStatusController.getSlideshowStatus);
router.put('/', slideshowStatusController.updateSlideshowStatus);

module.exports = router;
