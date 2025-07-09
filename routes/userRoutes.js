const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers
} = require('../controllers/userController');

// POST new user registration
router.post('/register', registerUser);

// POST user login
router.post('/login', loginUser);

// GET all users
router.get('/', getAllUsers);

module.exports = router;