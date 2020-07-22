DROP DATABASE IF EXISTS suggesteditems;

CREATE DATABASE suggesteditems;

\c suggesteditems;

CREATE TABLE mainsuggest (
  id INT NOT NULL PRIMARY KEY,
  "suggItem" VARCHAR(255),
  "suggPrice" INT,
  "suggMiniPrice" decimal,
  "suggMain" VARCHAR(300),
  "suggHover" VARCHAR(300),
  "suggShade" INT,
  "suggBest" VARCHAR(10),
  "suggMiniDesc" VARCHAR(100),
  "suggType" VARCHAR(50),
  "suggDesc" VARCHAR(500)
);

CREATE TABLE quickview (
  id INT NOT NULL PRIMARY KEY,
  "qvImage" VARCHAR(255)
);

CREATE TABLE shades (
  id INT NOT NULL PRIMARY KEY,
  "shadeImage" VARCHAR(255)
);

COPY mainsuggest(id, "suggItem", "suggPrice", "suggMiniPrice", "suggMain", "suggHover", "suggShade", "suggBest", "suggMiniDesc", "suggType", "suggDesc")
FROM '/home/ubuntu/kimberly-service/db/mainSuggest.csv'
DELIMITER ',' CSV HEADER;

COPY quickview(id, "qvImage")
FROM '/home/ubuntu/kimberly-service/db/quickView.csv'
DELIMITER ',' CSV HEADER;

COPY shades(id, "shadeImage")
FROM '/home/ubuntu/kimberly-service/db/shades.csv'
DELIMITER ',' CSV HEADER;