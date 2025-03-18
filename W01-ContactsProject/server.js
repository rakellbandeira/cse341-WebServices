//test
const express = require('express');

const mongodb = require('./data/database');

const app = express();
// Now you have an instance of Express


const port = process.env.PORT || 8000;

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        //Now we are gonna listen to traffic on that port:
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});

    }

    
})



