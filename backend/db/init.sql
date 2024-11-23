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


-- Create the `records` table
CREATE TABLE records (
    id SERIAL PRIMARY KEY,             -- Auto-incrementing unique identifier for each record
    user_id INTEGER NOT NULL,          -- Foreign key to associate the record with a user
    video_url VARCHAR(255) NOT NULL,   -- URL of the recorded video
    location VARCHAR(255) NOT NULL,    -- Location where the video was recorded
    created_at TIMESTAMP DEFAULT NOW(),-- Timestamp for when the record was created
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE  -- Foreign key constraint
);
