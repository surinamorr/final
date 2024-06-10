import express from 'express';

import { 
  getSingleUserOrder,
  getAllOrders, 
  getSingleOrder, 
  createOrder, 
  updateOrder, 
  deleteOrder,
  getAllUserOrders,
  getAllOrderDetails,
  getSingleOrderDetails
} from '../controller/orderController.js';

import { protect } from '../controller/authController.js';

import { roleMiddleware } from '../middleware/roleMiddleware.js';

export const orderRouter = express.Router();

// USE PROTECTION
  orderRouter.use(protect);

// Get all Orders for Logged In User
  orderRouter.get('/all-customer-orders', getAllUserOrders);

// Get a single order for Logged In User by ID
  orderRouter.get('/single-customer-order/:id', getSingleUserOrder);

// Add a new order
  orderRouter.post('/create-order', createOrder);

// Update an existing order
  orderRouter.patch('/update-order/:id', updateOrder);

// ADMIN ONLY
  // Get all Order Details
    orderRouter.get('/all-order-details', roleMiddleware('ADMIN'), getAllOrderDetails);

  // Get Single Order Details
    orderRouter.get('/single-order-details/:id', roleMiddleware('ADMIN'), getSingleOrderDetails);

  // Delete an order
    orderRouter.delete('/delete-order/:id', roleMiddleware('ADMIN'), deleteOrder);

  // Get all Customer Orders
    orderRouter.get('/all-orders', roleMiddleware('ADMIN'), getAllOrders);
        
  // Get Single Customer Order
    orderRouter.get('/single-order/:id', roleMiddleware('ADMIN'), getSingleOrder);
