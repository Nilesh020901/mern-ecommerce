const Cart = require("../../models/shop/cart-model");
const Product = require("../../models/shop/product-model");

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        // Validate input
        if (!userId || !productId || !quantity || quantity < 1) {
            return res.status(400).json({ status: "false", message: "Invalid input" });
        }
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "false", message: "Product not found" });
        }
        // Find or create cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        // Check if product is already in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex !== -1) {
            // Product is already in cart, update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Product is not in cart, add new item
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(200).json({ status: "true", message: "Product added to cart", cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ status: "false", message: "Invalid user ID" });
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });
        if (!cart) {
            return res.status(200).json({ status: "false", message: "Cart is empty",});
        }
        const validItems = cart.items.filter(item => item.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map(item => ({
            product: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        })) 
        res.status(200).json({ status: "true", data: { ...cart._doc, items: populateCartItems } });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

const updateCartItems = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        // Validate input
        if (!userId || !productId || !quantity || quantity < 1) {
            return res.status(400).json({ status: "false", message: "Invalid input" });
        }
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "false", message: "Product not found" });
        }
        // Find cart for the user
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });
        if (!cart) {
            return res.status(200).json({ status: "false", message: "Cart is empty",});
        }
        // Check if product is in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex === -1) {
            return res.status(404).json({ status: "false", message: "Product not in cart" });
        }
        // Update quantity
        cart.items[existingItemIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });

        const populateCartItems = validItems.map(item => ({
            product: item.productId ? item.productId._id : null,
            image: item.image ? item.productId.image : null,
            title: item.title ? item.productId.title : null,
            price: item.price ? item.productId.price : null,
            salePrice: item.salePrice ? item.productId.salePrice : null,
            quantity: item.quantity ? item.quantity : null,
        }));

        res.status(200).json({ status: "true", message: "Cart updated", cart: { ...cart._doc, items: populateCartItems } });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

const deleteCartItems = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        // Validate input
        if (!userId || !productId) {
            return res.status(400).json({ status: "false", message: "Invalid input" });
        }
        // Find cart for the user
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });
        if (!cart) {
            return res.status(200).json({ status: "false", message: "Cart is empty",});
        }

         // Check if product is in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex === -1) {
            return res.status(404).json({ status: "false", message: "Product not in cart" });
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });

        const populateCartItems = cart.items.map(item => ({
            product: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity ? item.quantity : null,
        }));

        res.status(200).json({ status: "true", message: "Cart updated", cart: { ...cart._doc, items: populateCartItems } });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItems,
    deleteCartItems,
}