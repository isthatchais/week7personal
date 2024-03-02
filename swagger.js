const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Patient Tracker API'
    },
    host: 'week7personal.onrender',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//build swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc)