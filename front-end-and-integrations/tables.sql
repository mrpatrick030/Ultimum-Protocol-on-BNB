CREATE TABLE ultimumbnbblog (
  id SERIAL PRIMARY KEY,
  image_link VARCHAR(5000) NOT NULL,
  video_link VARCHAR(5000) NOT NULL,
  title VARCHAR(500) NOT NULL,
  date VARCHAR(500) NOT NULL,
  description VARCHAR(20000) NOT NULL,
  category VARCHAR(500) NOT NULL
)

CREATE TABLE ultimumbnbadmin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    gender VARCHAR(100) NOT NULL,
    secretkey VARCHAR(50) NOT NULL DEFAULT 'ultimumbnbadmin001$xyz'
)

CREATE TABLE ultimumbnbchat (
  ID SERIAL PRIMARY KEY,
  lender VARCHAR(100) NOT NULL, 
  borrower VARCHAR(100) NOT NULL, 
  message VARCHAR(500) NOT NULL,
  sender VARCHAR(100) NOT NULL,
  loanid VARCHAR(100) NOT NULL,
  datetime VARCHAR(100) NOT NULL
)


