const express = require('express');

const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger-output.json');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 8002;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is connected and server running on port ${port}`);
            console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
        });
    }

    
});



