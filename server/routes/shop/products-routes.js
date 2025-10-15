const express = require('express');
const { getFilteredProducts } = require('../../controllers/shop/product-c ontroller');
const router = express.Router();

router.get('/get-all-products', getFilteredProducts);


module.exports = router;