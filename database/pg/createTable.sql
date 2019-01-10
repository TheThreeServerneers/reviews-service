CREATE TABLE IF NOT EXISTS products (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  is_verified boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id serial PRIMARY KEY,
  product_id integer REFERENCES products,
  user_id integer REFERENCES users,
  title varchar(255) NOT NULL,
  text text NOT NULL,
  score integer NOT NULL,
  date date NOT NULL,
  found_helpful integer NOT NULL
);