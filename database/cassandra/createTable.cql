USE reviews;
CREATE TABLE IF NOT EXISTS reviews (
  review_id int,
  product_id int,
  product_name text,
  user_id int,
  user_name text,
  is_verified boolean,
  title text,
  text text,
  score int,
  date date,
  found_helpful int,
  PRIMARY KEY (product_id)
);