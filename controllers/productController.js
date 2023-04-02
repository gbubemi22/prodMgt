const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');


// Create a Product
const createProduct = async (req, res) => {
     

     const product = await Product.create(req.body);
     res.status(StatusCodes.CREATED).json({ product });
}



// const getAllProducts1 = async (req, res) => {
//      const { price, color, size, sort, fields, numericFilters } = req.query;

//      const queryObject = {};

//      if (price) {
//           queryObject.price = price === 'true' ? true : false
//      }

//      if (color) {
//           queryObject.colors = color;

//      }
//      if (size) {
//           queryObject.size = { $regex: size, $options: 'i' }
//      }
//      if (numericFilters) {
//           const operatorMap = {
//                '>': '$gt',
//                '>=': '$gte',
//                '=': '$eq',
//                '<': '$lt',
//                '<=': '$lte',
//           };
//           const regEx = /\b(<|>|>=|=|<|<=)\b/g;
//           let filters = numericFilters.replace(
//                regEx,
//                (match) => `-${operatorMap[match]}-`
//           );
//           const options = ['price'];
//           filters = filters.split(',').forEach((item) => {
//                const [field, operator, value] = item.split('-');
//                if (options.includes(field)) {
//                     queryObject[field] = { [operator]: Number(value) };
//                }
//           });

//           let result = Product.find(queryObject);
//           // sort
//           if (sort) {
//                const sortList = sort.split(',').join(' ');
//                result = result.sort(sortList);
//           } else {
//                result = result.sort('createdAt');
//           }

//           if (fields) {
//                const fieldsList = fields.split(',').join(' ');
//                result = result.select(fieldsList);
//           }
//           const page = Number(req.query.page) || 1;
//           const limit = Number(req.query.limit) || 10;
//           const skip = (page - 1) * limit;

//           result = result.skip(skip).limit(limit);
//           // 23
//           // 4 7 7 7 2

//           // const products = await result;
//           res.status(StatusCodes.OK).json({ products: result, nbHits:result.length });
//      }

     
// }

// get all products 


const getAllProducts = async (req, res) => {
     const products = await Product.find({});

     res.status(StatusCodes.OK).json({ products, count: products.length });
};

// Get One Product 
const getSingleProduct = async (req, res) => {
     const { id: productId } = req.params;

     const product = await Product.findOne({ _id: productId })

     if (!product) {
          throw new CustomError.NotFoundError(`No product with id : ${productId}`);
     }

     res.status(StatusCodes.OK).json({ product }); 
};

//Update product
const updateProduct = async (req, res) => {
     const { id: productId } = req.params;

     const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
          new: true,
          runValidators: true,
     });

     if (!product) {
          throw new CustomError.NotFoundError(`No product with id : ${productId}`);
     }

     res.status(StatusCodes.OK).json({ product });
};

// Delete product
const deleteProduct = async (req, res) => {
     const { id: productId } = req.params;

     const product = await Product.findOne({ _id: productId });

     if (!product) {
          throw new CustomError.NotFoundError(`No product with id : ${productId}`);
     }

     await product.remove();
     res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
};


const deletevarieties = async (req, res) => {
     const { id: productId } = req.params;

     const product = await Product.findOne({ _id: productId });

     if (!product) {
          throw new CustomError.NotFoundError(`No product with id : ${productId}`);
     } else {
          await Product.updateOne(
               { _id: productId },
               { $pull: { varieties: variantsSchema } }
          );

          res.status(StatusCodes.OK).json(product)
     }



}

module.exports = {
     createProduct,
     getAllProducts,
     getSingleProduct,
     updateProduct,
     deleteProduct,
     deletevarieties,
     //getAllProducts1

}