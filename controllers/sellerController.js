const User = require('../models/User');
const { statusCodes, StatusCodes } = require('http-status-codes')




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