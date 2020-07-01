DROP DATABASE IF EXISTS suggestedItems;

CREATE DATABASE suggestedItems;

USE suggestedItems;

CREATE TABLE MainSuggest (
  id INT NOT NULL AUTO_INCREMENT,
  suggItem VARCHAR(255),
  suggPrice INT,
  suggMiniPrice INT,
  suggMain VARCHAR(300),
  suggHover VARCHAR(300),
  suggShade INT,
  suggBest VARCHAR(10),
  suggMiniDesc VARCHAR(100),
  suggType VARCHAR(50),
  suggDesc VARCHAR(500),
  PRIMARY KEY (id)
);

CREATE TABLE QuickView (
  id INT NOT NULL AUTO_INCREMENT,
  qvImage VARCHAR(255),
  PRIMARY KEY (id)
  );

CREATE TABLE Shades (
  id INT NOT NULL AUTO_INCREMENT,
  shadeImage VARCHAR(255),
  PRIMARY KEY (id)
);

