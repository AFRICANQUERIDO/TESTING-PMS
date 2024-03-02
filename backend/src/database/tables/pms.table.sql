CREATE TABLE Users
(
    user_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    isDeleted BIT default 0,
    isAdmin BIT default 0,
    isWelcomed BIT Default 0
)

-- ALTER TABLE Users ADD isWelcomed BIT Default 0


SELECT *
FROM Users

UPDATE Users SET isWelcomed = 0
UPDATE  Users SET isAdmin = 1 WHERE email ='janengene12@gmail.com'
