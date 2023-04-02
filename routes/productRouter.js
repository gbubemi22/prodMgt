const express = require('express');
const router = express.Router();



const {
     createProduct,
     getAllProducts,
     getSingleProduct,
     updateProduct,
     deleteProduct,
     deletevarieties,
    // getAllProducts1
} = require('../controllers/productController');



router
.route('/')
.post(createProduct)
.get(getAllProducts);





router
.route('/:id')
.get(getSingleProduct)
.patch(updateProduct)
.delete(deleteProduct);


router
.route('/verieties/:id')
.delete(deletevarieties)


module.exports = router;