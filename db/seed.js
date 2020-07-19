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

const itemImgLinks = [['https://bit.ly/2CPyTVm', 'https://bit.ly/2CKlD4C'], ['https://bit.ly/3fGdgFO', 'https://bit.ly/2DYiaQr'], ['https://bit.ly/3jitoiV', 'https://bit.ly/2WyGgYe'], ['https://bit.ly/3hfysmh', 'https://bit.ly/30qHvtH'], ['https://bit.ly/39cdj9D', 'https://bit.ly/3eJmteY'], ['https://bit.ly/2WAZvk3', 'https://bit.ly/30spriO'], ['https://bit.ly/2OF0tHy', 'https://bit.ly/2CR0XIg'],['https://bit.ly/2ZECpuU', 'https://bit.ly/2Wze9s8'], ['https://bit.ly/2OBsvDM', 'https://bit.ly/30u5yYK'], ['https://bit.ly/32wuNfK', 'https://bit.ly/32Bq7Fp'], ['https://bit.ly/3fL0PIA', 'https://bit.ly/2OQhBKR'], ['https://bit.ly/2DPj5T4', 'https://bit.ly/39gW3QL'], ['https://bit.ly/2Ch5ZxO', 'https://bit.ly/39a5kKf'], ['https://bit.ly/2WyKHm2', 'https://bit.ly/3hfBwyY'], ['https://bit.ly/3eJYvQV', 'https://bit.ly/32wZ3XL'], ['https://bit.ly/3hfzHBX', 'https://bit.ly/2WAB32d']];

const qvImgLinks = ['https://bit.ly/3eI7T7E', 'https://bit.ly/397xmX1', 'https://bit.ly/2Ctcuxj', 'https://bit.ly/32zeOh0', 'https://bit.ly/32wd345', 'https://bit.ly/3eEBXAZ', 'https://bit.ly/2CQOlk1', 'https://bit.ly/2ZIiomY', 'https://bit.ly/2OBrFa6', 'https://bit.ly/2ZJjZt4', 'https://bit.ly/2OEPZbm'];

const shadeLinks = ['https://bit.ly/39a6up4', 'https://bit.ly/30sMHxp', 'https://bit.ly/2OAeB57', 'https://bit.ly/3eGTE34', 'https://bit.ly/3eJltaI', 'https://bit.ly/30oFdeJ', 'https://bit.ly/39a3QQb'];

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

var grabRandomImgUrl = function(array) {
  let imgNumber = Math.floor(Math.random() * Math.floor(array.length));
  return array[imgNumber];
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
      let suggImgs = grabRandomImgUrl(itemImgLinks);
      let suggMain = suggImgs[0];
      let suggHover = suggImgs[1];
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

      let qvImage = grabRandomImgUrl(qvImgLinks);

      const data = `${id},${qvImage}\n`;
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

      let shadeImage = grabRandomImgUrl(shadeLinks);
      const data = `${id},${shadeImage}\n`;
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

