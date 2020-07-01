const db = require("./index.js");
const faker = require("faker");
const config = require("../config/config.json");
const aws = require('aws-sdk');

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


(async function () {
  try {
      aws.config.setPromisesDependency();
      aws.config.update({
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secretKey,
        region: 'us-west-1'
      });
      const s3 = new aws.S3();

      for (var i = 0; i < 8; i++) {
      const makeupResponse = await s3.listObjectsV2({
        Bucket: 'makeupp-products'
      }).promise()
      .then((results)=> {
        for (var j = 0; j < results.Contents.length; j+=2) {
          let item = generateProduct();
          let price = createNumber (8, 40);
          let miniprice = price / 2;
          let bestseller = faker.random.boolean();
          let suggMain = "https://makeupp-products.s3-us-west-1.amazonaws.com/"+ results.Contents[j].Key;
          let suggHover = "https://makeupp-products.s3-us-west-1.amazonaws.com/"+ results.Contents[j+1].Key;
          let type = 'makeup';
          let miniDesc = faker.lorem.words();
          let fullDesc = faker.lorem.paragraph();
          let shade = createNumber(1, 9);
          db.query(
            `INSERT INTO MainSuggest (suggItem, suggPrice, suggMiniPrice, suggMain, suggHover, suggShade, suggMiniDesc, suggDesc, suggType, suggBest) VALUES ('${item}', ${price}, ${miniprice}, '${suggMain}', '${suggHover}', '${shade}', '${miniDesc}', '${fullDesc}', '${type}', '${bestseller}')`,
            (err, result) => {
              if (err) { console.error(err);
              } else {
                console.log("Makeup Seeding Successful");
              }
            }
          );
        }
      })
      const skincareResponse = await s3.listObjectsV2({
        Bucket: 'skincare-products'
      }).promise()
      .then((results) => {

        for (var k = 0; k < results.Contents.length; k+=2) {
          let item = generateProduct();
          let price = createNumber (8, 40);
          let miniprice = price / 2;
          let bestseller = faker.random.boolean();
          let suggMain = "https://skincare-products.s3-us-west-1.amazonaws.com/"+ results.Contents[k].Key;
          let suggHover = "https://skincare-products.s3-us-west-1.amazonaws.com/"+ results.Contents[k+1].Key;
          let type = 'skincare';
          let miniDesc = faker.lorem.words();
          let fullDesc = faker.lorem.paragraph();
          db.query(`INSERT INTO MainSuggest (suggItem, suggPrice, suggMiniPrice, suggMain, suggHover, suggMiniDesc, suggDesc, suggType, suggBest) VALUES ('${item}', ${price}, ${miniprice}, '${suggMain}', '${suggHover}', '${miniDesc}', '${fullDesc}', '${type}', '${bestseller}')`,
            (err, result) => {
              if (err) {
                console.error(err);
              } else {
                console.log("Skincare Seeding Successful");
              }
            }
          );
        }
      })

      const bodyResponse = await s3.listObjectsV2({
        Bucket: 'body-products'
      }).promise()
      .then((results) => {

        for(var l = 0; l < results.Contents.length; l+=2) {
          let item = generateProduct();
          let price = createNumber(8, 40);
          let miniprice = price / 2;
          let bestseller = faker.random.boolean();
          let suggMain = "https://body-products.s3-us-west-1.amazonaws.com/"+ results.Contents[l].Key;
          let suggHover = "https://body-products.s3-us-west-1.amazonaws.com/"+ results.Contents[l+1].Key;
          let type = 'body';
          let miniDesc = faker.lorem.words();
          let fullDesc = faker.lorem.paragraph();
          db.query(`INSERT INTO MainSuggest (suggItem, suggPrice, suggMiniPrice, suggMain, suggHover, suggMiniDesc, suggDesc, suggType, suggBest) VALUES ('${item}', ${price}, ${miniprice}, '${suggMain}', '${suggHover}', '${miniDesc}', '${fullDesc}', '${type}', '${bestseller}')`,
            (err, result) => {
              if (err) {
                console.error(err);
              } else {
                console.log("Body Seeding Successful");
              }
            }
          );
        }
      })
    }
  const qvResponse = await s3.listObjectsV2({
    Bucket: 'quick-view'
  }).promise()
  .then((results) => {
    results.Contents.map((result) => {
      let image = "https://quick-view.s3-us-west-1.amazonaws.com/"+ result.Key;
      db.query(`INSERT INTO QuickView (qvImage) VALUES ('${image}')`, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log('QuickView Seeding Successful')
        }
      })
    })
  })

  const response = await s3.listObjectsV2({
    Bucket: 'shade-swatch'
  }).promise()
  .then((results) => {
    results.Contents.map((result) => {
      let image = "https://shade-swatch.s3-us-west-1.amazonaws.com/"+ result.Key;
      db.query(`INSERT INTO Shades (shadeImage) VALUES ('${image}')`, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Swatch Seeding Successful')
        }
      })
    })
  })

  } catch (e) {
    console.error(e);
    }
  }
)();