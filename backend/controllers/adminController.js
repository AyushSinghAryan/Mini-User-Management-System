const User = require('../models/User');


exports.getUsers = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;

        const total = await User.countDocuments();
        const users = await User.find().skip(startIndex).limit(limit);

        res.status(200).json({
            success: true,
            count: users.length,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            },
            data: users,
        });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};


exports.toggleUserStatus = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            data: user,
            msg: `User account ${user.isActive ? 'activated' : 'deactivated'}`
        });
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};