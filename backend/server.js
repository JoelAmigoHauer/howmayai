const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_name TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        guests INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

// Basic test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Get all restaurants
app.get('/api/restaurants', (req, res) => {
    try {
        const restaurants = db.prepare('SELECT * FROM restaurants').all();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new reservation
app.post('/api/reservations', (req, res) => {
    const { restaurant_name, customer_name, date, time, guests } = req.body;
    
    try {
        const stmt = db.prepare(`
            INSERT INTO reservations (restaurant_name, customer_name, date, time, guests)
            VALUES (?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(restaurant_name, customer_name, date, time, guests);
        
        res.json({
            message: 'Reservation created successfully',
            reservationId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insert sample restaurants if none exist
const checkAndInsertRestaurants = db.prepare(`
    INSERT INTO restaurants (name, openingHours, location, specialties)
    SELECT ?, ?, ?, ?
    WHERE NOT EXISTS (SELECT 1 FROM restaurants LIMIT 1)
`);

const sampleRestaurants = [
    {
        name: "Pizza Paradise",
        openingHours: "11:00 AM - 10:00 PM",
        location: "123 Pepperoni Street",
        specialties: JSON.stringify(["Deep Dish Pizza", "Garlic Knots"])
    },
    {
        name: "Sushi Space",
        openingHours: "12:00 PM - 9:00 PM",
        location: "456 Roll Road",
        specialties: JSON.stringify(["Dragon Roll", "Miso Soup"])
    },
    {
        name: "Burger Bonanza",
        openingHours: "10:00 AM - 11:00 PM",
        location: "789 Patty Place",
        specialties: JSON.stringify(["Double Cheese Burger", "Sweet Potato Fries"])
    }
];

sampleRestaurants.forEach(restaurant => {
    checkAndInsertRestaurants.run(
        restaurant.name,
        restaurant.openingHours,
        restaurant.location,
        restaurant.specialties
    );
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close();
    console.log('Database connection closed');
    process.exit(0);
});