COPY reviews (product_id, user_id, title, text, score, date, found_helpful)
FROM '/Users/stephenliao/hr/reviews-service/database/pg/reviews.csv'
DELIMITER ','
CSV HEADER;