COPY products (name)
FROM '/Users/stephenliao/hr/reviews-service/database/pg/products.csv'
DELIMITER ','
CSV HEADER;