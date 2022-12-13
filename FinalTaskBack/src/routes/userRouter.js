import express from 'express'
import { refresh, login, logout, register, users } from '../controller/userController.js';

import { auth } from '../middleware/auth.js';
import { registerValidator } from '../utils/validation.js';

export const userRouter = express.Router();

userRouter.post('/register', registerValidator, register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/users', users);

userRouter.get('/refresh', refresh);