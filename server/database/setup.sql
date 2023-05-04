DROP TABLE IF EXISTS post;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    post_date VARCHAR (50) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
);


