-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    openingHours TEXT NOT NULL,
    location TEXT NOT NULL,
    specialties TEXT NOT NULL
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample restaurants if none exist
INSERT INTO restaurants (name, openingHours, location, specialties)
SELECT 'Pizza Paradise', '11:00 AM - 10:00 PM', '123 Pepperoni Street', '["Deep Dish Pizza","Garlic Knots"]'
WHERE NOT EXISTS (SELECT 1 FROM restaurants LIMIT 1);

INSERT INTO restaurants (name, openingHours, location, specialties)
SELECT 'Sushi Space', '12:00 PM - 9:00 PM', '456 Roll Road', '["Dragon Roll","Miso Soup"]'
WHERE NOT EXISTS (SELECT 1 FROM restaurants LIMIT 1);

INSERT INTO restaurants (name, openingHours, location, specialties)
SELECT 'Burger Bonanza', '10:00 AM - 11:00 PM', '789 Patty Place', '["Double Cheese Burger","Sweet Potato Fries"]'
WHERE NOT EXISTS (SELECT 1 FROM restaurants LIMIT 1);