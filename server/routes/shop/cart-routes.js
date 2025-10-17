const express = require('express');
const { addToCart, fetchCartItems,updateCartItems, deleteCartItems } = require('../../controllers/shop/cart-controller');

const router = express.Router();

router.post('/add-to-cart', addToCart);
router.get('/get-cart-items/:userId', fetchCartItems);
router.put('/update-cart-items', updateCartItems);
router.delete('/delete-cart-items/:userId/:productId', deleteCartItems);

module.exports = router;