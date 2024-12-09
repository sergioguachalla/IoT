-- Create the `users` table with a new column `group`
CREATE TABLE users (
    id SERIAL PRIMARY KEY,              -- Auto-incrementing unique identifier
    username VARCHAR(50) NOT NULL UNIQUE, -- Unique username
    name VARCHAR(100) NOT NULL,           -- First name
    lastname VARCHAR(100) NOT NULL,       -- Last name
    email VARCHAR(150) NOT NULL UNIQUE,   -- Unique email
    password VARCHAR(255) NOT NULL,       -- Password (hashed)
    "group" VARCHAR(100)                  -- Group information
);


-- Create the cars table 
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing unique identifier for each record
    user_id INTEGER NOT NULL,          -- Foreign key to associate the record with a user
    car_brand VARCHAR(255) NOT NULL,   -- Car brand
    car_model VARCHAR(255) NOT NULL,   -- Car model
    car_year VARCHAR(255) NOT NULL,    -- Car year
    car_color VARCHAR(255) NOT NULL,   -- Car color
    car_plate VARCHAR(255) NOT NULL,   -- Car plate
    created_at TIMESTAMP DEFAULT NOW(),-- Timestamp for when the record was created
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- Foreign key constraint

);

-- Create the parking records table
CREATE TABLE parking_records (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing unique identifier for each record
    user_id INTEGER NOT NULL,          -- Foreign key to associate the record with a user
    car_id INTEGER NOT NULL,           -- Foreign key to associate the record with a car
    latitude VARCHAR(255) NOT NULL,    -- Latitude of the parking location
    longitude VARCHAR(255) NOT NULL,   -- Longitude of the parking location
    location VARCHAR(255) NOT NULL,    -- Location where the car was parked
    parking_date TIMESTAMP DEFAULT NOW(),-- Timestamp for when the record was created
    start_time TIMESTAMP DEFAULT NOW(),              -- Start time of the parking
    end_time TIMESTAMP NULL,                 -- End time of the parking
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key constraint
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE     -- Foreign key constraint
);

-- Create the `records` table
CREATE TABLE records (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing unique identifier for each record
    user_id INTEGER NOT NULL,
    parking_record_id INTEGER NOT NULL,          -- Foreign key to associate the record with a user
    video_url VARCHAR(255) NOT NULL,   -- URL of the recorded video
    location VARCHAR(255) NOT NULL,    -- Location where the video was recorded
    created_at TIMESTAMP DEFAULT NOW(),-- Timestamp for when the record was created
    sensor_aprox INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key constraint
    FOREIGN KEY (parking_record_id) REFERENCES parking_records(id) ON DELETE CASCADE  -- Foreign key constraint

);







-- Insert Data

-- Admin
-- Insertar el usuario "admin" con la contraseña hasheada en la tabla `users`
INSERT INTO users (username, name, lastname, email, password, "group")
VALUES ('admin', 'Sergio', 'Guachalla', 'sergioguachalla@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'admin');

-- Insertar valores de usuarios de prueba
INSERT INTO users (username, name, lastname, email, password, "group") VALUES 
('user1', 'Carlos', 'Pérez', 'carlos.perez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user2', 'Ana', 'Gutiérrez', 'ana.gutierrez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user3', 'Luis', 'Martínez', 'luis.martinez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user4', 'María', 'López', 'maria.lopez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user5', 'José', 'Rodríguez', 'jose.rodriguez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user6', 'Lucía', 'Fernández', 'lucia.fernandez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user7', 'Miguel', 'González', 'miguel.gonzalez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user8', 'Elena', 'Morales', 'elena.morales@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user9', 'Javier', 'Ramírez', 'javier.ramirez@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user'),
('user10', 'Claudia', 'Torres', 'claudia.torres@gmail.com', '0ca876a570f4f151f64f1f77a2b55f64ed30d271bd9e5f482c16b7b4efb1c71ce22ccc49c4ba1a2558917bfecc82ea7e', 'user');
