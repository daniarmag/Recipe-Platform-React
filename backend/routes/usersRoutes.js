import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';

// Routes for user authentication
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/current-user', UserController.getCurrentUser);

export default router;