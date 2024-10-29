const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001; // Ensure this is set to 3001

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Database connection
const db = new Database(path.join(__dirname, '../database/restaurants.db'), { 
    verbose: console.log 
});

// Create tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        openingHours TEXT NOT NULL,
        location TEXT NOT NULL,
        specialties TEXT NOT NULL
    );
`);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});