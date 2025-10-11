const { imageUploadUtils } = require("../../helper/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const b64 = Buffer.from(file.buffer).toString('base64');
        const Url = `data:${file.mimetype};base64,${b64}`;
        const result = await imageUploadUtils(Url);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({ success: false, message: "Server error during image upload" });
    }
};

//add a new product

const addProduct = async (req, res) => {

    try {
        const { title, description, price, category, brand, stock, imageUrl } = req.body;
        if (!title || !description || !price || !category || !brand || !stock || !imageUrl) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const newProduct = new Product({
            title,
            description,
            price,
            category,
            brand,
            stock,
            imageUrl
        })
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Add product error:", error);
        res.status(500).json({ success: false, message: "Server error during adding product" });
    }
}

//fetch all products

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Get all products error:", error);
        res.status(500).json({ success: false, message: "Server error during fetching products" });
    }
}

//Edit a product


const editProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, price, category, brand, stock, imageUrl } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const updateData = {
      title: title || product.title,
      description: description || product.description,
      category: category || product.category,
      brand: brand || product.brand,
      price: price === "" ? 0 : price || product.price,
      salePrice: salePrice === "" ? 0 : salePrice || product.salePrice,
      totalStock: totalStock || product.totalStock,
      image: image || product.image,
      averageReview: averageReview || product.averageReview,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("Edit product error:", error);
        res.status(500).json({ success: false, message: "Server error during editing product" });
    }
}
//Delete a product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ success: false, message: "Server error during deleting product" });
    }
}

module.exports = {
    handleImageUpload,
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct
};