CREATE DATABASE ethiotech

CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email  VARCHAR UNIQUE,
  password VARCHAR,
  role VARCHAR,  
  picture varchar,
  department VARCHAR,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Services (
  id SERIAL PRIMARY KEY,
  title VARCHAR UNIQUE NOT NULL,
  body VARCHAR NOT NULL,
  picture VARCHAR,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  picture VARCHAR,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  status BOOLEAN,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  key_offerings VARCHAR NOT NULL,
  logo VARCHAR,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  picture VARCHAR,
  author_name VARCHAR,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  picture VARCHAR,
  location VARCHAR,
  start_date DATE,
  end_date DATE,
  status BOOLEAN,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS trainings (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  picture VARCHAR,
  location VARCHAR,
  start_date DATE,
  end_date DATE,
  phases JSONB,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  picture VARCHAR,
  company VARCHAR,
  location VARCHAR,
  department VARCHAR,
  employment_type VARCHAR,
  workplace_type VARCHAR,
  compansation VARCHAR,
  salary DECIMAL,
  start_date DATE,
  end_date DATE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS jobApplications (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  address VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  field_of_study VARCHAR,
  gpa DECIMAL,
  name_of_previous_company VARCHAR,
  total_years_of_experience INTEGER,
  available_start_date DATE,
  resume VARCHAR,
  cover_letter VARCHAR,
  expected_salary INTEGER,
  prospectus_confirmation BOOLEAN,
  job_id INTEGER,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  email VARCHAR,
  phone VARCHAR,
  address VARCHAR,
  map_location VARCHAR,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  enrolled_for VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  enrolled_for_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (enrolled_for_id) REFERENCES events (id),
  FOREIGN KEY (enrolled_for_id) REFERENCES trainings (id)
);