COPY reviews (product_id, username, is_verified, title, review_text, score, review_date, found_helpful)
FROM './reviews.csv'
DELIMITER ','
CSV HEADER;