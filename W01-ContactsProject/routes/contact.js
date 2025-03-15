const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.get('/', contactController.getAll);
router.get('/:id', contactController.getSingle);

module.exports = router;