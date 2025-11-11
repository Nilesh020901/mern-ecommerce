 const paypal = require('../../helper/paypal');
 const Order = require('../../models/Order');
 const Cart = require('../../models/Cart');
 const Product = require('../../models/Product')

const createOrder = async (req, res) => {
    try {
        
        const { userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId, cartId } = req.body;
        
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel',
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item)=> ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity 
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2)
                    },
                    description: 'description'
                }
            ]
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Error while creating paypal payment'
                })
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                });
                console.log("call-newlyCreatedOrder", newlyCreatedOrder);
                await newlyCreatedOrder.save();

                const approvalURL = paymentInfo.links.find((link)=> link.rel === 'approval_url').href;

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }
        })
    } catch (error) {
        console.error("Error to create order:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body

        let order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ success: false, message: "Order can not be found"})
        }

        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order confirmed",
            data: order
        })

    } catch (error) {
        console.error("Error to capture payments:", error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}

const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await  Order.find({ userId });

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

const getOrderDetails = async (req, res) => {
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
    createOrder,
    capturePayment,
    getAllOrdersByUser,
    getOrderDetails
}