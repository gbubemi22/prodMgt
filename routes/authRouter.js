const express = require('express')
const router = express.Router()





const createSeller = require('../controllers/authController');



router
.route('/seller')
.post(createSeller);




module.exports = router;