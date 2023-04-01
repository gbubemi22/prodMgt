require('express-async-errors')
const dotenv = require('dotenv').config();
require('express-async-errors')
const express = require('express');
const morgan = require('morgan')
const app = express();
const bodyParser = require("body-parser");


const port = process.env.PORT || 4000

const connectDB = require('./DB/connect');



const authUser = require('./routes/authRouter');
const SellerRouter = require('./routes/sellerRouter')

app.get('/', (req, res) => {
     res.json({
          message: 'Welcome to MGT',
     })
})


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/api/v1/auth', authUser);
app.use('/api/v1/users',SellerRouter);


const start = async () => {
     try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port,() => {
          console.log(`Listing on port ${port}...`);
       });   
     } catch (error) {
        console.log(error)  
     }
};

start()