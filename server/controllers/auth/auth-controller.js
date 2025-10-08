const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

//register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false }).json({ 
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//logout user
const logout = async (req, res) => {
    try {
        // Clear the user's session or token
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error during user logout:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    registerUser,
    login,
};