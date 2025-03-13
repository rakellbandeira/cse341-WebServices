const Professional = require('../models/professional');

// Get professional data
exports.getProfessional = async (req, res) => {
  try {
    // To find the first professional in the database
    const professional = await Professional.findOne();
    
    if (!professional) {
      return res.status(404).json({ message: 'Professional data not found' });
    }
    
    res.json(professional);
  } catch (error) {
    console.error('Error fetching professional data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create professional data 
exports.createProfessional = async (req, res) => {
  try {
    const newProfessional = new Professional(req.body);
    const savedProfessional = await newProfessional.save();
    
    res.status(201).json(savedProfessional);
  } catch (error) {
    console.error('Error creating professional data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};