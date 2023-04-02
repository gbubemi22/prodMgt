const express = require('express');
const router = express.Router();


const {
     sellers,
     getOneSeller
} = require('../controllers/sellerController')


router
.route('/')
.get(sellers)


router
.route('/:id')
.get(getOneSeller);


module.exports = router;