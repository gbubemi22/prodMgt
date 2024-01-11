const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

//Get All sellers

const sellers = async (req, res) => {
  const sellers = await User.find({ userType: "seller" });

  res.status(StatusCodes.OK).json({
    message: `fetched `,
    count: sellers.length,
    sellers,
  });
};

//Get One seller
const getOneSeller = async (req, res) => {
  const { sellerId } = req.params;

  const result = await User.findOne({ sellerId, userType: "seller" });

  if (!result) {
    throw new CustomError.NotFoundError(`Seller Not Found`);
  }

  res.status(StatusCodes.OK).json({
    message: true,
    seller: result,
  });
};

module.exports = {
  sellers,
  getOneSeller,
};
