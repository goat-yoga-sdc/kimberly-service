const db = require("./index.js");
const faker = require("faker");
// const config = require("../config/config.json");
const aws = require('aws-sdk');
const assert = require('assert');

const noun = ['Lip Gloss', 'Eyeliner', 'Lipstick', 'Eyeshadow', 'Bronzer', 'Primer', 'Moisturizer', 'Cream', 'Blush', 'Gloss', 'Balm', 'Cleanser', 'Mascara', 'Powder', 'Setting Spray', 'Palette', 'Brush', 'Highlighter', 'Eye Cream', 'Concealer', 'Brow', 'Tint', 'Lash', 'Solution', 'Serum', 'Mask', 'Oil', 'Glow', 'Remover', 'Lip Liner', 'Shine', 'Paint', 'Lip', 'Pen', 'Nail Polish', 'Face Mask', 'Peel', 'Mist', 'Eraser', 'BB Cream', 'CC Cream', 'Eye Powder', 'Brow Stick', 'Brow Powder', 'Tinter', 'Pomade', 'Stain', 'Eye Pencil', 'Cover', 'Set', 'Trio', 'Duo', 'Makeup', 'Skincare']

const adj = ['Milky', 'Dewy', 'Shiny', 'Glossy', 'Moist', 'Super', 'Slick', 'Stick', 'Matte', 'Boy', 'Mettalic', 'Wonder', 'Hero', 'Daily', 'Cleansing', 'Wow', 'Cloud', 'Fluff', 'Deep', 'Intense', 'Glossier', 'Glide', 'Shine', 'Pro', 'Elite', 'Stretch', 'Perfect', 'Ideal', 'Prime', 'Bubble', 'Future', 'Fave', 'Day', 'Night', 'Glow', 'High Performance', '10/10', 'Filtered', 'Go Girl', 'Made For Me', 'Main', 'Super', 'Extreme', 'Excellent', 'Mild', 'Detoxifying', 'Sky', 'Star', '5/5', 'Power', 'Reviving', 'Essential', 'Blendable', 'Color-Blend', 'Girl', 'Shimmer']



const generateProduct = () => {
  let productList = {};
  productList.productItem = `${
    adj[Math.floor(Math.random() * Math.floor(adj.length))]
  } ${noun[Math.floor(Math.random() * Math.floor(noun.length))]}`;

  return productList.productItem;
};


const createNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const createType = () => {
  let types = ['makeup', 'skincare', 'body']
  return types[Math.floor(Math.random() * 3)]
}

const generateMainSuggestDocs = function(number){
  let mainSuggestDocs = [];

  for (var j = 0; j < number; j++) {
    let item = generateProduct();
    let price = createNumber (8, 40);
    let miniprice = price / 2;
    let bestseller = faker.random.boolean();
    let suggMain = "https://picsum.photos/300/300";
    let suggHover = "https://picsum.photos/200/300";
    let type = createType();
    let miniDesc = faker.lorem.words();
    let fullDesc = faker.lorem.paragraph();
    let shade = createNumber(1, 9);

    let newDoc = {
      suggItem: item,
      suggPrice: price,
      suggMiniPrice: miniprice,
      suggMain: suggMain,
      suggHover: suggHover,
      suggShade: shade,
      suggMiniDesc: miniDesc,
      suggDesc: fullDesc,
      suggType: type,
      suggBest: bestseller,
    }

    mainSuggestDocs.push(newDoc)
  }
  return mainSuggestDocs;
}

const generateQuickViewDocs = function(number){
  let quickViewDocs = [];

  for (let i = 0; i < number; i++) {
    let newDoc = {
      qvImage: "https://picsum.photos/200/300"
    }
    quickViewDocs.push(newDoc);
  }
  return quickViewDocs;
}

const generateShadesDocs = function(number){
  let shadesDocs = [];
  for (let i = 0; i < number; i++) {
    let newDoc = {
      shadeImage: "https://picsum.photos/50/50"
    }
    shadesDocs.push(newDoc);
  }
  return shadesDocs;
}


module.exports = {
  insertDocumentsMainSuggest: function(db, callback) {

    const collection = db.collection('MainSuggest');

    let mainSuggArr = generateMainSuggestDocs(40);

    collection.insertMany(mainSuggArr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log("Inserted 40 documents into the MainSuggest");
        callback(null, result);
      }
    });
  },

  insertDocumentsQuickView: function(db, callback) {

    const collection = db.collection('QuickView');
    let quickViewArr = generateQuickViewDocs(40);
    collection.insertMany(quickViewArr, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log("Inserted 40 documents into the QuickView");
        callback(null, result);
      }
    });
  },

  insertDocumentsShades: function(db, callback) {

    const collection = db.collection('Shades');
    let shadesDocs = generateShadesDocs(20);
    collection.insertMany(shadesDocs, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log("Inserted 20 documents into the Shades");
        callback(null, result);
      }
    });
  }
}