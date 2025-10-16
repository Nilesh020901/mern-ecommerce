const express = require('express');
const { getFilteredProducts, getProductDetails } = require('../../controllers/shop/product-c ontroller');
const router = express.Router();

router.get('/get-all-products', getFilteredProducts);
router.get('/get-product/:id', getProductDetails);


module.exports = router;