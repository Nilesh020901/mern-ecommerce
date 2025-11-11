const Order = require('../../models/Order');


const getAllOrdersAllUsers = async (req, res) => {
    try {
        const orders = await  Order.find({});

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'No orders found!'
            })
        }

        res.status(201).json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.error("Error to get order by user:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

const getOrderDetailsForAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!'
            })
        }

        res.status(201).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.error("Error to get orders detail:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

module.exports = {
    getAllOrdersAllUsers,
    getOrderDetailsForAdmin
}