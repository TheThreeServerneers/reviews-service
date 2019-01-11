USE reviews;
COPY reviews (review_id, product_id, product_name, user_id, user_name, is_verified, title, text, score, date, found_helpful)
FROM 'reviews.csv'
WITH header = true; 