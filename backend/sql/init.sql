USE worldview;
CREATE TABLE servers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
INSERT INTO servers (name) VALUES ('Test Server');

CREATE USER 'flask_user'@'localhost' IDENTIFIED BY 'Flaskpass';
GRANT ALL PRIVILEGES ON worldview.* TO 'flask_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;