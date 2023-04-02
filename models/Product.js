const mongoose = require('mongoose');

const variantsSchema = new mongoose.Schema({
     size: {
          type: [Number],
          required: true,

     },
     colors: {
          type: [String],
          default: ["#222"],
     },
     quantities: {
          type: Number,
          required: true,
     },
     price: {
          type: Number,
          required: false,
     },


}, { _id: false })


const ProductSchema = new mongoose.Schema({

     user: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          required: true
     },
     product_name: {
          type: String,
          required: [true, `Please provide a product name`],
          trim: true,
     },
     description: {
          type: String,
          required: [true, `Please provide a description`],
          maxlength: [200, `should not be more than 200 characters`]
     },
     varieties: variantsSchema,
     image: {
          type: String,
          required: true,
     },
}, { timestamps: true })


module.exports = mongoose.model(
     "Product",
     ProductSchema
);

