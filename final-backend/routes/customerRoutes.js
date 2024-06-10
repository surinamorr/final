import express from 'express';
import { getAllCustomers, getSingleCustomer, createCustomer, updateCustomer, deleteCustomer } from '../controller/customerController.js';
import { protect } from '../controller/authController.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

export const customerRouter = express.Router();

// USE PROTECTION
    customerRouter.use(protect);

// ADMINS ONLY

    // Get all customers
        customerRouter.get('/all-customers', roleMiddleware('ADMIN'), getAllCustomers);

    // Get a single customer by ID
        customerRouter.get('/single-customer/:id', roleMiddleware('ADMIN'), getSingleCustomer);

    // Add a new customer
        customerRouter.post('/create-customer', roleMiddleware('ADMIN'), createCustomer);

    // Update an existing customer
        customerRouter.patch('/update-customer/:id', roleMiddleware('ADMIN'), updateCustomer);

    // Delete a customer
        customerRouter.delete('/delete-customer/:id', roleMiddleware('ADMIN'), deleteCustomer);


