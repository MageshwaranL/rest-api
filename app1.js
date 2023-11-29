const express = require('express');
const mysql = require('mysql');
const logger=require('morgan');
const app = express();
const port = 4041;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'company',
});

app.use(logger('dev'));
// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware to parse JSON
app.use(express.json());

// Define routes

// Get all items
app.get('/company', (req, res) => {
  const query = 'SELECT * FROM company';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ans:results});
    }
  });
});

// Get a specific item by ID
app.get('/company/:id', (req, res) => {
  const companyId = req.params.id;
  const query = 'SELECT * FROM company WHERE id = ?';
  db.query(query, [companyId], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).send('Company not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new item
app.post('/company', (req, res) => {
  const { name,place,city } = req.body;
  const query = 'INSERT INTO company (name, place,city) VALUES (?, ?, ?)';
  db.query(query, [name, place, city], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success:"true" });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
