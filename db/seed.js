const Product = require('./index.js');
const faker = require('faker');

const noun = ['Lip Gloss', 'Eyeliner', 'Lipstick', 'Eyeshadow', 'Bronzer', 'Primer', 'Moisturizer', 'Cream', 'Blush', 'Gloss', 'Balm', 'Cleanser', 'Mascara', 'Powder', 'Setting Spray', 'Palette', 'Brush', 'Highlighter', 'Eye Cream', 'Concealer', 'Brow', 'Tint', 'Lash', 'Solution', 'Serum', 'Mask', 'Oil', 'Glow', 'Remover', 'Lip Liner', 'Shine', 'Paint', 'Lip', 'Pen', 'Nail Polish', 'Face Mask', 'Peel', 'Mist', 'Eraser', 'BB Cream', 'CC Cream', 'Eye Powder', 'Brow Stick', 'Brow Powder', 'Tinter', 'Pomade', 'Stain', 'Eye Pencil', 'Cover', 'Set', 'Trio', 'Duo', 'Makeup', 'Skincare']

const adj = ['Milky', 'Dewy', 'Shiny', 'Glossy', 'Moist', 'Super', 'Slick', 'Stick', 'Matte', 'Boy', 'Mettalic', 'Wonder', 'Hero', 'Daily', 'Cleansing', 'Wow', 'Cloud', 'Fluff', 'Deep', 'Intense', 'Glossier', 'Glide', 'Shine', 'Pro', 'Elite', 'Stretch', 'Perfect', 'Ideal', 'Prime', 'Bubble', 'Future', 'Fave', 'Day', 'Night', 'Glow', 'High Performance', '10/10', 'Filtered', 'Go Girl', 'Made For Me', 'Main', 'Super', 'Extreme', 'Excellent', 'Mild', 'Detoxifying', 'Sky', 'Star', '5/5', 'Power', 'Reviving', 'Essential', 'Blendable', 'Color-Blend', 'Girl', 'Shimmer']

const generateProduct = () => {
  let productList = {};
  productList.productItem = `${adj[Math.floor(Math.random() * Math.floor(adj.length))]} ${noun[Math.floor(Math.random() * Math.floor(noun.length))]}`;

  return productList.productItem;
}


const imageArrGen = () => {
  let imageArr = [];

  for (let i = 0; i < 3; i++) {
  imageArr.push(faker.image.fashion())
  }
  return imageArr
}

const mockGenerator = () => {
  let data = [];

  for(let i = 0; i < 400; i++) {
    let product = generateProduct();
    let price = faker.commerce.price();
    let image = faker.image.fashion();
    let variation = faker.commerce.color();
    let miniDesc = faker.lorem.sentence();
    let imageGallery = imageArrGen();
    let fullDesc = faker.lorem.paragraph();
    let entry = {
      suggItem: product,
      suggPrice: price,
      suggImage: image,
      suggVariation: variation,
      suggMiniDesc: miniDesc,
    suggQuickView: {
      suggImageGallery: imageGallery,
      suggFullDesc: fullDesc
        }
    }
    data.push(entry);
  }
  return data;
}

const seedMe = (data) => {
  suggestedItems = [];

  for (var i = 0; i < data.length; i++) {
    let entry = new Product (data[i]);
    suggestedItems.push(entry);
  }
  Product.insertMany(suggestedItems, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Seeding Saved to DB')
    }
  })
}

seedMe(mockGenerator());
