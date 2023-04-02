const express = require('express')
const router = express.Router()





const {
     createSeller,
     login,
     logout,
} = require('../controllers/authController');



router
.route('/seller')
.post(createSeller);

router
.route('/login')
.post(login);


router
.route('/logout')
.get(logout);




module.exports = router;