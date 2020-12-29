const express = require('express');
const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productList');
const router = express.Router();

router
    .route('/')
    .get(getAllProducts)
    .post(createProduct);

router
    .route('/:id')
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);


module.exports = router