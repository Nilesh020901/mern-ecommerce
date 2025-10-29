const Address = require('../../models/Address');

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address|| !city || !pincode || !phone || !notes) {
            return res.status(404).json({ success: false, message: 'Invalid Data'})
        }

        const newAddress = new Address({
            userId, address, city, pincode, phone, notes
        })

        await newAddress.save();
        return res.status(201).json({ success: true, message: "Address added", data: newAddress })
    } catch (error) {
        console.error('Error adding address:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const fetchAllAddress = async (req, res) => {
    try {
        const userId = req.params;
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

        const address = Address.find({ userId })
        if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
        return res.json({ success: true, address });
    } catch (error) {
        console.error('Error adding address:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const editAddress = async (req, res) => {
    try {
       const { userId, addressId } = req.params;
       const updates = req.body;

        if (!userId || !addressId) {
            return res.status(404).json({ success: false, message: 'Unauthorized'})
        }

        const address = await Address.findOneAndUpdate(
           { _id: addressId, userId },
           { $set: updates },
           { new: true }
        )

        if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
        return res.status(201).json({ success: true, message: 'Address updated', data: address });
    } catch (error) {
        console.error('Error adding address:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
       const updates = req.body;

        if (!userId || !addressId) {
            return res.status(404).json({ success: false, message: 'Unauthorized'})
        }

        const address = await Address.findOneAndDelete(
           { _id: addressId, userId }
        )

        if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
        return res.status(201).json({ success: true, message: 'Address deleted', data: address });
    } catch (error) {
        console.error('Error adding address:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {
    addAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress
}