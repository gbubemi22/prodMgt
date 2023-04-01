const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');



//Get All sellers 

const sellers = async (req, res) => {
     const sellers = await User.find({ userType: 'seller'})

     
          res.status(StatusCodes.OK).json({
               message: `fetched `,
               count:sellers.length,
               sellers
          })
     }



module.exports = sellers;