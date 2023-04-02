require('express-async-errors')
const dotenv = require('dotenv').config();
require('express-async-errors')
const path = require('path');






const express = require('express');
const morgan = require('morgan')
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const port = process.env.PORT || 4000

const connectDB = require('./DB/connect');


//require Routes
const authUser = require('./routes/authRouter');
const SellerRouter = require('./routes/sellerRouter');
const productRouter = require('./routes/productRouter');

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

app.use(cors());


app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "./public")));
app.use("/public", express.static("public"));

app.use(express.static(path.join(__dirname, "./public")));

//routes
app.use('/api/v1/auth', authUser);
app.use('/api/v1/sellers', SellerRouter);
app.use('/api/v1/products', productRouter);


//ErrorHandlerMiddleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error)
  }
};

start()