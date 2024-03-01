const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODBURL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });


        // Check if the database exists and create it if it doesn't
        const db = mongoose.connection.db;
        const databaseExists = await db.admin().listDatabases();
        const databaseName = process.env.MONGODBURL.split('/').pop();

        if (!databaseExists.databases.find(db => db.name === databaseName)) {
            await db.createCollection('purrview'); // Creating a sample collection
            console.log(`Database '${databaseName}' created successfully`);
        } else {
            console.log(`Connection to '${databaseName}' successful.`);
        }
    } catch (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Terminate the application process if unable to connect to the database
    }
};

// Call the connectToDatabase function to establish the database connection
connectToDatabase();
