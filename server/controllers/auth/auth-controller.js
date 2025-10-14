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
const loginUser = async (req, res) => {
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
        const token = jwt.sign({ userId: user._id, email: user.email, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: "lax", path: "/", }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                username: user.username,
            }
        });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//logout user
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token').json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("Error during user logout:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(500).json({ success: false, message: "Unauthorized access denied!" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware,
};