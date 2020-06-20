const mongoose = require ('mongoose');

//create name of database
mongoose.connect('mongodb://localhost/suggested-test', { useNewUrlParser: true },
(err) => {
  if (err) {
    console.log (err)
  } else {
    console.log('Connected!')
  }
});

const Schema = mongoose.Schema;

let ProductSchema = new Schema ({ // collections = table
  suggItem: String,
  suggPrice: Number,
  suggImage: String,
  suggVariation: String,
  suggMiniDesc: String,
suggQuickView: {
  suggImageGallery: Array,
  suggFullDesc: String
    }
})

//compile schema to model -- for reuse
const Product = mongoose.model('items', ProductSchema); //collection name

module.exports = Product;