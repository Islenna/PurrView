require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');

app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.DB_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/pet.routes')(app);

const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API title',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Path to the API docs
};
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT || 8000, () => {
    console.log("Server's up.");
});
