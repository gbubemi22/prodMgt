const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");

const CustomError = require("../errors");

// Create a Product
const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const {
    price,
    colors,
    size,
    sort,
    fields,
    numericFilters,
    page = 1,
    limit = 10,
  } = req.query;

  const filters = {};

  if (price) filters.price = price === "true";

  if (colors) filters["varieties.colors"] = colors;

  if (size) filters["varieties.size"] = { $regex: size, $options: "i" };

  if (numericFilters) {
    const operators = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const filtersArr = numericFilters.split(",");
    filtersArr.forEach((filter) => {
      const [field, operator, value] = filter.split("-");
      if (operators[operator]) {
        filters[field] = { [operators[operator]]: Number(value) };
      }
    });
  }

  const query = Product.find(filters)
    .sort(sort || "createdAt")
    .select(fields);

  const totalProducts = await Product.countDocuments(filters);
  const totalPages = Math.ceil(totalProducts / limit);

  const products = await query.skip((page - 1) * limit).limit(limit);

  res.status(StatusCodes.OK).json({ products, totalProducts, totalPages });
};

// get all products

// Get One Product
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

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
  res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

const deletevarieties = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  product.varieties = undefined;
  await product.save();

  res.status(StatusCodes.OK).json({
    msg: `Successfully removed varieties from ${product}`,
    product,
  });
};

module.exports = {
  createProduct,

  getSingleProduct,
  updateProduct,
  deleteProduct,
  deletevarieties,
  getAllProducts,
};
