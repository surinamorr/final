import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import { customerRouter } from './routes/customerRoutes.js';
import { menuRouter } from './routes/menuRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { authRouter } from './routes/authRoutes.js';

const app = express();

dotenv.config({path: './config.env'});

app.use(morgan('dev'));

//CORS Configuration
app.options('*', cors(['http://localhost:4200']));
app.use(cors(['http://localhost:4200']));

//Body Parsing Configuration
app.use(express.json({limit: '1kb'}));
app.use(express.urlencoded({extended: true, limit: '1kb'}));

// Auth routes
  // app.post('/api/signup', authController.signup);
  // app.post('/api/login', authController.login);

// Customer routes
  app.use('/api/v1/customers', customerRouter)

// Menu routes
  app.use('/api/v1/menu', menuRouter)

// Order routes
  app.use('/api/v1/orders', orderRouter)

// Auth Routes
  app.use('/api/v1/auth', authRouter)

// Order routes
  // app.get('/api/orders', orderController.getOrders);
  // app.get('/api/orders/:id', orderController.getOrderById);
  // app.post('/api/orders', orderController.addOrder);
  // app.put('/api/orders/:id', orderController.updateOrder);
  // app.delete('/api/orders/:id', orderController.deleteOrder);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`listening on http://localhost:${port}`));