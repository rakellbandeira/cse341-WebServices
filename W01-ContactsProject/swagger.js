const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing the contacts information',
    version: '1.0.0'
  },
  host: 'contactproject-m2ax.onrender.com/',
  schemes: ['https'],
  tags: [
    {
      name: 'Contacts',
      description: 'Endpoints for managing contacts'
    }
  ],
  definitions: {
    Contact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    },
    ContactResponse: {
      _id: '67d4a78d737ebb5ade87ec59',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    },
    NewContactID: {
      id: '67d4a78d737ebb5ade87ec59'
    }
  }
};

const outputFile = './swagger-output.json';

const routes = ['./server.js', './routes/index.js', './routes/contact.js'];

swaggerAutogen(outputFile, routes, doc);