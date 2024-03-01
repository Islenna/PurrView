require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.DB_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/mongoose.config');
//Routes go here: require('./routes/your.routes')(app); 
app.listen(process.env.PORT || 8000, () => {
    console.log("Server's up.");
});
