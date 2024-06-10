import express from 'express';
import { createAdminUser, signupUser, loginUser, protect, getThisUser  } from '../controller/authController.js';

export const authRouter = express.Router();

//Login
  authRouter.post('/login', loginUser);

//Register
  authRouter.post('/sign-up', signupUser);

// Admin User Sign Up
  authRouter.post('/create-user', createAdminUser);

// Use Protection
  authRouter.use(protect);

// PROTECTED PAGES
  // Get User Profile
    authRouter.get('/my-profile', getThisUser);
  
  

