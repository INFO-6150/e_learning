const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('./multerConfig');

// Route to register a new user
router.post('/register', upload.single('image'), userController.addUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route to update an existing user's information
router.put('/update/:id', upload.single('image'), userController.updateUser);

// Route to delete a user by email
router.delete('/delete', userController.deleteUser);

router.get('/getAll', userController.getAllUsers);

router.post('/findEmail', userController.findEmail);

router.post('/findById/:id', userController.findById);

router.put('/user/updatePassword/:id', userController.updatePassword);

module.exports = router;



