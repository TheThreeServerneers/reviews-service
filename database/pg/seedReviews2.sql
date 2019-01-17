COPY reviews (review_id, product_id, product_name, user_id, username, is_verified, title, review_text, score, review_date, found_helpful)
FROM '/Users/stephenliao/hr/reviews-service/database/cassandra/reviews.csv'
DELIMITER ','
CSV HEADER;