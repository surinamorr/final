import {pool} from '../config/db.js';

//ENDPOINT: api/v1/order/all-orders
export const getAllOrders = async (req, res, next) => {
  let sqlQuery = `SELECT * FROM orders`;
  const [orders] = await pool.query(sqlQuery);
  if (orders.length > 0) {
    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: { orders }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/orders/single-order/:id
export const getSingleOrder = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM orders WHERE order_id = ?`;
  const [orders] = await pool.query(sqlQuery, [id]);
  if (orders.length > 0) {
    res.status(200).json({
      status: 'success',
      data: { orders: orders[0] }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/orders/all-customer-orders/
export const getAllUserOrders = async (req, res, next) => {
  // const id = req.params.id;
  const id = req.user.id;

  let sqlQuery = `
    SELECT 
      orders.order_id,
      orders.order_date,
      orders.total_price,
      user_login.id,
      user_login.first_name,
      user_login.last_name,
      order_details.item_type,
      order_details.item_id,
      order_details.quantity,
      order_details.price
    FROM 
      orders
    INNER JOIN 
      order_details ON orders.order_id = order_details.order_id
    INNER JOIN
      user_login ON orders.user_id = user_login.id
    WHERE 
      orders.user_id = ?
    ORDER BY 
      orders.order_date DESC;
  `;

  const [orders] = await pool.query(sqlQuery, [id]);
  if (orders.length > 0) {
    res.status(200).json({
      status: 'success',
      data: { orders }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/orders/single-customer-order/:id
export const getSingleUserOrder = async (req, res, next) => {
  const oid = req.params.id;
  const uid = req.user.id;

  console.log(oid);
  console.log(uid);

  let sqlQuery = `
    SELECT 
      orders.order_id,
      orders.order_date,
      orders.total_price,
      user_login.id,
      order_details.item_type,
      order_details.item_id,
      order_details.quantity,
      order_details.price
    FROM 
      orders
    INNER JOIN 
      order_details ON orders.order_id = order_details.order_id
    INNER JOIN
      user_login ON orders.user_id = user_login.id
    WHERE 
      orders.user_id = ? AND orders.order_id = ?
    ORDER BY 
      orders.order_date DESC;
  `;

  const [orders] = await pool.query(sqlQuery, [uid, oid]);
  if (orders.length > 0) {
    res.status(200).json({
      status: 'success',
      data: { orders }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/order/all-order-details
export const getAllOrderDetails = async (req, res, next) => {
  let sqlQuery = `SELECT * FROM order_details`;
  const [orderDetails] = await pool.query(sqlQuery);
  if (orderDetails.length > 0) {
    res.status(200).json({
      status: 'success',
      results: orderDetails.length,
      data: { orderDetails }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/order/single-order-details/:id
export const getSingleOrderDetails = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM order_details WHERE order_detail_id = ?`;
  const [orderDetails] = await pool.query(sqlQuery, [id]);
  if (orderDetails.length > 0) {
    res.status(200).json({
      status: 'success',
      results: orderDetails.length,
      data: { orderDetails }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/order/create-order
export const createOrder = async (req, res, next) => {
  const {user_id, order_date, total_price, items} = req.body;

  // VALIDATE THE REQUEST BODY
  if (!Array.isArray(items)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request body: items should be an array'
    });
  }

  let sqlQuery = `INSERT INTO orders (user_id, order_date, total_price)
                    VALUES (?, ?, ?)
                  `;
  const [orders] = await pool.query(sqlQuery,
    [
      user_id, order_date, total_price
    ]
  );
  if (orders.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      InsertedID: orders.insertID,
    });
    console.log('Order Created Successfully');
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Error Adding Order'
    });
    console.log('Order Not Created');
  }

  const order_id = orders.insertId;

  const sqlQuery2 = `INSERT INTO order_details (order_id, item_type, item_id, quantity, price)
                    VALUES (?, ?, ?, ?, ?)
                  `;

  let orderDetailResults = [];

  for (const item of items) {
    const { item_type, item_id, quantity, price } = item;
    const [result] = await pool.query(sqlQuery2, [order_id, item_type, item_id, quantity, price]);
    orderDetailResults.push(result);
    console.log(`Inserted order detail ID: ${result.insertId}`);
  }

  const allInsertsSuccessful = orderDetailResults.every(result => result.affectedRows > 0);

  if (allInsertsSuccessful) {
    console.log('Order Details Created Successfully');
  } else {
    console.log('Order Details Not Created');
  }
}

//ENDPOINT: api/v1/orders/update-order/:id
export const updateOrder = async (req, res, next) => {
  const id = req.params.id;
  const {user_id, order_date, total_price} = req.body;

  let sqlQuery = `UPDATE orders SET 
                    user_id = ?, order_date = ?, total_price = ?
                  WHERE order_id = ?`;
  const [orders] = await pool.query(sqlQuery,
    [
      user_id, order_date, total_price, id
    ]
  );
  if (orders.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCount: orders.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not found'
    });
  }
}

//ENDPOINT: api/v1/orders/delete-order/:id
export const deleteOrder = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `DELETE FROM order_details WHERE order_id = ?`;
  let sqlQuery2 = `DELETE FROM orders WHERE order_id = ?`;
  const [orderDetails] = await pool.query(sqlQuery, [id]);
  const [orders] = await pool.query(sqlQuery2, [id]);
  if (orders.affectedRows > 0 && orderDetails.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      orderRecordCounter: orders.affectedRows,
      orderDetailsRecordCounter: orderDetails.affectedRows,
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Order Record Not Found'
    });
  }
}
