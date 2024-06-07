// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const authController = require('./controllers/authController');
// const customerController = require('./controllers/customerController');
// const menuController = require('./controllers/menuController');
// const orderController = require('./controllers/orderController');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // Auth routes
// app.post('/api/signup', authController.signup);
// app.post('/api/login', authController.login);

// // Customer routes
// app.get('/api/customers', customerController.getCustomers);
// app.get('/api/customers/:id', customerController.getCustomerById);
// app.post('/api/customers', customerController.addCustomer);
// app.put('/api/customers/:id', customerController.updateCustomer);
// app.delete('/api/customers/:id', customerController.deleteCustomer);

// // Menu routes
// app.get('/api/menu', menuController.getMenuItems);
// app.post('/api/menu', menuController.addMenuItem);

// // Order routes
// app.get('/api/orders', orderController.getOrders);
// app.get('/api/orders/:id', orderController.getOrderById);
// app.post('/api/orders', orderController.addOrder);
// app.put('/api/orders/:id', orderController.updateOrder);
// app.delete('/api/orders/:id', orderController.deleteOrder);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authController = require('./controller/authController');
const customerController = require('./controller/customerController');
const menuController = require('./controller/menuController');
const orderController = require('./controller/orderController');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Auth routes
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

// Customer routes
app.get('/api/customers', customerController.getCustomers);
app.get('/api/customers/:id', customerController.getCustomerById);
app.post('/api/customers', customerController.addCustomer);
app.put('/api/customers/:id', customerController.updateCustomer);
app.delete('/api/customers/:id', customerController.deleteCustomer);

// Menu routes
app.get('/api/menu', menuController.getMenuItems);
app.post('/api/menu', menuController.addMenuItem);

// Order routes
app.get('/api/orders', orderController.getOrders);
app.get('/api/orders/:id', orderController.getOrderById);
app.post('/api/orders', orderController.addOrder);
app.put('/api/orders/:id', orderController.updateOrder);
app.delete('/api/orders/:id', orderController.deleteOrder);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
