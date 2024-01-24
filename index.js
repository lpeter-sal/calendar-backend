const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Create server of express
const app = express();

// Database
dbConnection();

// CORS
app.use( cors() );

//Public directory
app.use( express.static('public') );

//Read and parse of body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


// Listen requests
app.listen( process.env.PORT , () => {
    console.log(`Server running in port: ${ process.env.PORT }`);
});