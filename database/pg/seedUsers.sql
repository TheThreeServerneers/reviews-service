COPY users (name, is_verified)
FROM '/Users/stephenliao/hr/reviews-service/database/pg/users.csv'
DELIMITER ','
CSV HEADER;