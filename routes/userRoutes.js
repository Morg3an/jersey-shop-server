const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    getMe
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected user route
router.get('/me', protect, getMe);

// Protected admin route
router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;