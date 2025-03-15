const router = require('express').Router();

router.get('/', (req, res) =>{ res.send('Welcome to the Contacts API');});


router.get('/Week01Project', (req, res) => {
    res.send('Welcome to the Week01Project');
});

router.use('/contact', require('./contact'));


module.exports = router;