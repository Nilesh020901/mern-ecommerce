const express = require('express')
const { addAddress, fetchAllAddress, editAddress, deleteAddress } = require('../../controllers/shop/address-controller');

const router = express.Router();

router.post('/add-address', addAddress);
router.get('/get-address/:userId', fetchAllAddress);
router.put('/edit-address/:userId/:addressId', editAddress);
router.delete('/delete-address/:userId/:addressId', deleteAddress);

module.exports = router;