const express = require('express');
const app = express();
// Now you have an instance of Express


const port = process.env.PORT || 5000;

app.use('/', require('./routes'));

//Now we are gonna listen to traffic on that port:
app.listen(port, () => {console.log(`Running on port ${port}`)});


