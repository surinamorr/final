import express from 'express';

import {
  getAllStarters, 
  getAllMains, 
  getAllDesserts, 
  getAllSides, 
  getSingleStarter, 
  getSingleMain, 
  getSingleDessert, 
  getSingleSide, 
  addStarter, 
  addMain, 
  addDessert, 
  addSide, 
  updateStarter, 
  updateMain, 
  updateDessert, 
  updateSide, 
  deleteStarter, 
  deleteMain, 
  deleteDessert, 
  deleteSide 
} from '../controller/menuController.js';

import { protect } from '../controller/authController.js';

import { roleMiddleware } from '../middleware/roleMiddleware.js';

export const menuRouter = express.Router();

// Get all menu items
  menuRouter.get('/all-starters', getAllStarters);
  menuRouter.get('/all-mains', getAllMains);
  menuRouter.get('/all-desserts', getAllDesserts);
  menuRouter.get('/all-sides', getAllSides);

// Get a single menu item by type and ID
  menuRouter.get('/single-starter/:id', getSingleStarter);
  menuRouter.get('/single-main/:id', getSingleMain);
  menuRouter.get('/single-dessert/:id', getSingleDessert);
  menuRouter.get('/single-side/:id', getSingleSide);

// USE PROTECTION
  menuRouter.use(protect);

// ADMINS ONLY
  // Add a new menu item
    menuRouter.post('/add-starter', roleMiddleware('ADMIN'), addStarter);
    menuRouter.post('/add-main', roleMiddleware('ADMIN'), addMain);
    menuRouter.post('/add-dessert', roleMiddleware('ADMIN'), addDessert);
    menuRouter.post('/add-side', roleMiddleware('ADMIN'), addSide);

  // Update an existing menu item
    menuRouter.patch('/update-starter/:id', roleMiddleware('ADMIN'), updateStarter);
    menuRouter.patch('/update-main/:id', roleMiddleware('ADMIN'), updateMain);
    menuRouter.patch('/update-dessert/:id', roleMiddleware('ADMIN'), updateDessert);
    menuRouter.patch('/update-side/:id', roleMiddleware('ADMIN'), updateSide);

  // Delete a menu item
    menuRouter.delete('/delete-starter/:id', roleMiddleware('ADMIN'), deleteStarter);
    menuRouter.delete('/delete-main/:id', roleMiddleware('ADMIN'), deleteMain);
    menuRouter.delete('/delete-dessert/:id', roleMiddleware('ADMIN'), deleteDessert);
    menuRouter.delete('/delete-side/:id', roleMiddleware('ADMIN'), deleteSide);
