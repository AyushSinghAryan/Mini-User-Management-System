const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { register, login, getMe } = require('../controllers/authController');
const { updateDetails, updatePassword } = require('../controllers/userController');
const { getUsers, toggleUserStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.post('/auth/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], register);

router.post('/auth/login', login);
router.get('/auth/logout', (req, res) => {

    res.status(200).json({ success: true, msg: 'User logged out' });
});

// --- User Routes (Protected) ---
router.get('/auth/me', protect, getMe);
router.put('/users/updateprofile', protect, updateDetails);
router.put('/users/updatepassword', protect, updatePassword);

// --- Admin Routes (Protected + Role Admin) ---
router.get('/admin/users', protect, authorize('admin'), getUsers);
router.put('/admin/users/:id/status', protect, authorize('admin'), toggleUserStatus);

module.exports = router;