const db = require("./index.js");
const faker = require("faker");

const noun = ['Lip Gloss', 'Eyeliner', 'Lipstick', 'Eyeshadow', 'Bronzer', 'Primer', 'Moisturizer', 'Cream', 'Blush', 'Gloss', 'Balm', 'Cleanser', 'Mascara', 'Powder', 'Setting Spray', 'Palette', 'Brush', 'Highlighter', 'Eye Cream', 'Concealer', 'Brow', 'Tint', 'Lash', 'Solution', 'Serum', 'Mask', 'Oil', 'Glow', 'Remover', 'Lip Liner', 'Shine', 'Paint', 'Lip', 'Pen', 'Nail Polish', 'Face Mask', 'Peel', 'Mist', 'Eraser', 'BB Cream', 'CC Cream', 'Eye Powder', 'Brow Stick', 'Brow Powder', 'Tinter', 'Pomade', 'Stain', 'Eye Pencil', 'Cover', 'Set', 'Trio', 'Duo', 'Makeup', 'Skincare']

const adj = ['Milky', 'Dewy', 'Shiny', 'Glossy', 'Moist', 'Super', 'Slick', 'Stick', 'Matte', 'Boy', 'Mettalic', 'Wonder', 'Hero', 'Daily', 'Cleansing', 'Wow', 'Cloud', 'Fluff', 'Deep', 'Intense', 'Glossier', 'Glide', 'Shine', 'Pro', 'Elite', 'Stretch', 'Perfect', 'Ideal', 'Prime', 'Bubble', 'Future', 'Fave', 'Day', 'Night', 'Glow', 'High Performance', '10/10', 'Filtered', 'Go Girl', 'Made For Me', 'Main', 'Super', 'Extreme', 'Excellent', 'Mild', 'Detoxifying', 'Sky', 'Star', '5/5', 'Power', 'Reviving', 'Essential', 'Blendable', 'Color-Blend', 'Girl', 'Shimmer']

const generateProduct = () => {
  let productList = {};
  productList.productItem = `${
    adj[Math.floor(Math.random() * Math.floor(adj.length))]
  } ${noun[Math.floor(Math.random() * Math.floor(noun.length))]}`;

  return productList.productItem;
};

const type = ["Skincare", "Makeup", "Body", "Fragrance"];

const generateType = () => {
  let typeObj = {};
  typeObj.productType = `${
    type[Math.floor(Math.random() * Math.floor(type.length))]
  }`;

  return typeObj.productType;
};

const seedMain = () => {
  for (let i = 0; i < 400; i++) {
    let item = generateProduct();
    let price = faker.commerce.price();
    let image = faker.image.fashion();
    let shade = faker.commerce.color();
    let type = generateType();
    let miniDesc = faker.lorem.sentence();
    let fullDesc = faker.lorem.paragraph();

    db.query(
      `INSERT INTO MainSuggest (suggItem, suggPrice, suggImage, suggShade, suggMiniDesc, suggDesc, suggType) VALUES ('${item}', ${price}, '${image}', '${shade}', '${miniDesc}', '${fullDesc}', '${type}')`,
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Seed Successful");
        }
      }
    );
  }
};

const seedQuickView = () => {
  for (let j = 0; j < 800; j++) {
    let qvImage = faker.image.fashion();
    db.query(`INSERT INTO QuickView (qvImage) VALUES ('${qvImage}')`);
  }
};

seedMain();
seedQuickView();

db.end();
