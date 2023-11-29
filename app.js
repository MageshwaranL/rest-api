const express = require('express');
const mysql = require('mysql');
const logger=require('morgan');
const app = express();
const port = 4041;


app.use(logger('dev'));
// Connect to MySQL

// Middleware to parse JSON
app.use(express.json());

// Define routes

// Get all items
app.get('/test', (req, res) => {
  res.json({result:'true'});
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
