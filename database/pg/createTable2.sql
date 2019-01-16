CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  is_verified BOOLEAN NOT NULL,
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  score INTEGER NOT NULL,
  date DATE NOT NULL,
  found_helpful INTEGER NOT NULL
);