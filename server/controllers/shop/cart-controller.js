const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity || quantity < 1) {
            return res.status(400).json({ status: "false", message: "Invalid input" });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "false", message: "Product not found" });
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
    }
        await cart.save();
        res.status(200).json({ status: "true", message: "Product added to cart", data: cart });
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
        if (!userId || !productId || !quantity || quantity < 1) {
            return res.status(400).json({ status: "false", message: "Invalid input" });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "false", message: "Product not found" });
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(200).json({ status: "false", message: "Cart is empty",});
        }
        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({ status: "false", message: "Product not in cart" });
        }
        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });

        const populateCartItems = cart.items.map(item => ({
            product: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.productId ? item.quantity : null,
        }));

        res.status(200).json({ status: "true", message: "Cart updated", data: { ...cart._doc, items: populateCartItems } });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

const deleteCartItems = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({ status: "false", message: "Invalid input" });
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });
        if (!cart) {
            return res.status(200).json({ status: "false", message: "Cart is empty",});
        }
        cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId);
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: 'title price salePrice image'
        });

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({ status: "true", message: "Cart item deleted", data: { ...cart._doc, items: populateCartItems } });
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