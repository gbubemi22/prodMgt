const express = require('express');
const router = express.Router();


const sellers = require('../controllers/sellerController')


router
.route('/sellers')
.get(sellers)


module.exports = router;