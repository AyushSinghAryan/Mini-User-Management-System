const User = require('../models/User');


exports.updateDetails = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};


exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id).select('+password');

        // Check current password
        if (!(await user.matchPassword(currentPassword))) {
            return res.status(401).json({ success: false, msg: 'Incorrect current password' });
        }

        user.password = newPassword;
        await user.save(); // Will trigger pre-save hook for hashing

        res.status(200).json({ success: true, msg: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};