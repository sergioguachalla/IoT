-- Create the `user` table
CREATE TABLE USERS (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing unique identifier
    username VARCHAR(50) NOT NULL UNIQUE, -- Unique username
    name VARCHAR(100) NOT NULL,           -- First name
    lastname VARCHAR(100) NOT NULL,       -- Last name
    email VARCHAR(150) NOT NULL UNIQUE,   -- Unique email
    password VARCHAR(255) NOT NULL        -- Password (hashed)
);