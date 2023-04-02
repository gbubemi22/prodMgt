const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { ACCOUNT_TYPES } = require('../constant/index')
const CustomError = require('../errors');
const jwt = require('jsonwebtoken')

const createJWT = require('../utils/jwt')

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
          throw new CustomError.ConflictError(`Email alredy exits`)
     }

     const checkIfNumberExites = await User.findOne({ number });
     if (checkIfNumberExites) {
          throw new CustomError.ConflictError(`Number alredy exits`)
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


const login = async (req, res) => {
     const { email, password } = req.body;

     if (!email || !password) {
          throw new CustomError.BadRequestError("Please provide email and password");
     }

     const user = await User.findOne({ email })


     if (!user) {
          throw new CustomError.UnauthenticatedError("Invalid Credentials");
     }

     const isPasswordCorrect = await user.comparePassword(password);

     if (!isPasswordCorrect) {
          throw new CustomError.UnauthenticatedError('Invalid Credentials');
     }


     
     const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        })

        
     res.status(StatusCodes.OK).json({
          user: {
               email: user.email,
           userType: user.userType,
           id: user.id
          },
           token,
     });
};




const logout = async (req, res) => {
     res.cookie("token", "logout", {
          httpOnly: true,
          expires: new Date(Date.now() + 1000),
     });
     res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};


module.exports = {
     createSeller,
     login,
     logout,
};