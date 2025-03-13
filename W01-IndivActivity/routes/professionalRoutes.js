const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professionalController');

// GET route to retrieve professional data
router.get('/professional', professionalController.getProfessional);

// POST route to create professional data 
router.post('/professional', professionalController.createProfessional);

module.exports = router;