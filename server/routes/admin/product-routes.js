const express = require('express');
const { upload } = require('../../helper/cloudinary');
const { handleImageUpload, addProduct, getAllProducts, editProduct, deleteProduct } = require('../../controllers/admin/product-controller');

const router = express.Router();

router.post('/upload-image', upload.single('my_image'), handleImageUpload);
router.post('/add-product', addProduct);
router.get('/get-all-products', getAllProducts);
router.put('/edit-product/:id', editProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;