const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, msg: 'User already exists' });
        }

        user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        res.status(201).json({ success: true, token, user: { id: user._id, name, email, role: user.role } });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server Error', error: err.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) return res.status(401).json({ success: false, msg: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ success: false, msg: 'Invalid credentials' });

        if (!user.isActive) return res.status(403).json({ success: false, msg: 'Account Deactivated' });
        user.lastLogin = Date.now();
        await user.save({ validateBeforeSave: false });
        const token = generateToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (err) {
        console.error('LOGIN ERROR 👉', err);

        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};


exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
};