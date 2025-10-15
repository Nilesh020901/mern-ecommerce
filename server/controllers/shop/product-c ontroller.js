const Product = require("../../models/Product");


const getFilteredProducts = async (req, res) => {
    try {
        const { category, brand, minPrice, maxPrice } = req.query;
        const products = await Product.find({});

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Get filtered products error:", error);
        res.status(500).json({ success: false, message: "Server error during fetching filtered products" });
    }
}

module.exports = {
    getFilteredProducts,
}