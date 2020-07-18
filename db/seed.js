const fs = require('fs');
const faker = require("faker");

const writeMainSuggest = fs.createWriteStream('mainSuggest.csv');
writeMainSuggest.write('id, suggItem, suggPrice, suggMiniPrice, suggMain, suggHover, suggShade, suggBest, suggMiniDesc, suggType, suggDesc\n', 'utf8');

const writeQuickView = fs.createWriteStream('quickView.csv');
writeQuickView.write('id, qvImage\n', 'utf8');

const writeShades = fs.createWriteStream('shades.csv');
writeShades.write('id, shadeImage\n', 'utf8');


const noun = ['Lip Gloss', 'Eyeliner', 'Lipstick', 'Eyeshadow', 'Bronzer', 'Primer', 'Moisturizer', 'Cream', 'Blush', 'Gloss', 'Balm', 'Cleanser', 'Mascara', 'Powder', 'Setting Spray', 'Palette', 'Brush', 'Highlighter', 'Eye Cream', 'Concealer', 'Brow', 'Tint', 'Lash', 'Solution', 'Serum', 'Mask', 'Oil', 'Glow', 'Remover', 'Lip Liner', 'Shine', 'Paint', 'Lip', 'Pen', 'Nail Polish', 'Face Mask', 'Peel', 'Mist', 'Eraser', 'BB Cream', 'CC Cream', 'Eye Powder', 'Brow Stick', 'Brow Powder', 'Tinter', 'Pomade', 'Stain', 'Eye Pencil', 'Cover', 'Set', 'Trio', 'Duo', 'Makeup', 'Skincare'];

const adj = ['Milky', 'Dewy', 'Shiny', 'Glossy', 'Moist', 'Super', 'Slick', 'Stick', 'Matte', 'Boy', 'Mettalic', 'Wonder', 'Hero', 'Daily', 'Cleansing', 'Wow', 'Cloud', 'Fluff', 'Deep', 'Intense', 'Glossier', 'Glide', 'Shine', 'Pro', 'Elite', 'Stretch', 'Perfect', 'Ideal', 'Prime', 'Bubble', 'Future', 'Fave', 'Day', 'Night', 'Glow', 'High Performance', '10/10', 'Filtered', 'Go Girl', 'Made For Me', 'Main', 'Super', 'Extreme', 'Excellent', 'Mild', 'Detoxifying', 'Sky', 'Star', '5/5', 'Power', 'Reviving', 'Essential', 'Blendable', 'Color-Blend', 'Girl', 'Shimmer'];

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

function writeTenMillionMainSuggestItems(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let item = generateProduct();
      let price = createNumber (8, 40);
      let miniprice = price / 2;
      let bestseller = faker.random.boolean();
      let suggMain = "https://picsum.photos/200/300";
      let suggHover = "https://picsum.photos/200/300";
      let type = createType();
      let miniDesc = faker.lorem.words();
      let fullDesc = faker.lorem.paragraph();
      let shade = createNumber(1, 9);
      const data = `${id},${item},${price},${miniprice},${suggMain},${suggHover},${shade},${bestseller},${miniDesc},${type},${fullDesc} \n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
write()
console.log(`done`);
}

function writeFourMillionQuickViewItems(writer, encoding, callback) {
  let i = 4000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let qvImage = "https://picsum.photos/200/300";
      const data = `${id},${qvImage} \n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
write()
console.log(`done`);
}

function writeTwoMillionShades(writer, encoding, callback) {
  let i = 2000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      let shadeImage = "https://picsum.photos/200/300";
      const data = `${id},${shadeImage} \n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
write()
console.log(`done`);
}

writeTenMillionMainSuggestItems(writeMainSuggest, 'utf-8', () => {
  writeMainSuggest.end();
});

writeFourMillionQuickViewItems(writeQuickView, 'utf-8', () => {
  writeQuickView.end();
});

writeTwoMillionShades(writeShades, 'utf-8', () => {
  writeShades.end();
});
