const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { ACCOUNT_TYPES } = require('../constant/index')



//Create a Seller
const createSeller = async (req, res) => {

     const {
          
          number,
          email,
          last_name,
          first_name,
          password
     } = req.body;

     const checkIfEmailExites = await User.findOne({ email })

     if (checkIfEmailExites) {
          throw new Error(`Email alredy exits`)
     }

     const checkIfNumberExites = await User.findOne({ number });
     if (checkIfNumberExites) {
          throw new Error(`Number alredy exits`)
     }


     let user = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          number: req.body.number,
          password: req.body.password,
          userType: ACCOUNT_TYPES.SELLER
     })

     await user.save();
     res.status(StatusCodes.CREATED).json({
          message: "User created successfully",
          user
     })

}


module.exports = createSeller;