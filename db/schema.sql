DROP DATABASE IF EXISTS suggestedItems;

CREATE DATABASE suggestedItems;

USE suggestedItems;

CREATE TABLE MainSuggest (
  id INT NOT NULL AUTO_INCREMENT,
  suggItem VARCHAR(50),
  suggPrice INT,
  suggImage VARCHAR(100),
  suggShade VARCHAR(25),
  suggSize VARCHAR(50),
  suggMiniDesc VARCHAR(255),
  suggType VARCHAR(50),
  suggDesc VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE QuickView (
  id INT NOT NULL AUTO_INCREMENT,
  qvItem INT,
  qvImage VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (qvItem) REFERENCES MainSuggest(id)
);


