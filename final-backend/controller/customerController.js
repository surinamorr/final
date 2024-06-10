import {pool} from '../config/db.js';

import bcrypt from 'bcryptjs';

//ENDPOINT: api/v1/customers/all-customers
export const getAllCustomers = async (req, res, next) => {
  let sqlQuery = `SELECT * FROM user_login`;
  const [customers] = await pool.query(sqlQuery);

  customers.forEach(customer => {
    customer.password =  undefined;
  });

  if (customers.length > 0) {
    res.status(200).json({
      status: 'success',
      results: customers.length,
      data: { customers }
      
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/customers/single-customer/:id
export const getSingleCustomer = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM user_login WHERE id = ?`;
  const [customers] = await pool.query(sqlQuery, [id]);
  if (customers.length > 0) {
    customers[0].password = undefined;
    res.status(200).json({
      status: 'success',
      data: { customers: customers[0] }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/customers/create-customer
export const createCustomer = async (req, res) => {
  const { email, password, role, first_name, last_name } = req.body;

  if (await userExists(email)) {
    res.status(400).json({
      status: 'Error',
      message: 'User already exists',
    });
    console.log('User already exists');
    return;
  }

  const pwd = bcrypt.hashSync(password, 12);

  let sqlQuery = `INSERT INTO user_login(email, password, role, first_name, last_name)
                    VALUES(?,?,?,?, ?)
                  `; 

  const [result] = await pool.query(sqlQuery, 
    [
      email, pwd, role, first_name, last_name
    ]
  );

  if(result.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      InsertedID: result.insertId,
      message: 'User created successfully',
    });
    console.log('User created successfully');
  } else {
    res.status(400).json({
      status: 'Eror',
      message: 'User creation failed',
    });
    console.log('User creation failed');
  }

}

//ENDPOINT: api/v1/customers/update-customer/:id
export const updateCustomer = async (req, res, next) => {
  const id = req.params.id;
  const {first_name, last_name, email, role} = req.body;

  let sqlQuery = `UPDATE user_login SET 
                    first_name = ?, last_name = ?, email = ?, role = ?
                  WHERE id = ?`;
  const [customer] = await pool.query(sqlQuery,
    [
      first_name, last_name, email, role, id
    ]
  );
  if (customer.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCount: customer.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not found'
    });
  }
}

//ENDPOINT: api/v1/customers/delete-customer/:id
export const deleteCustomer = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `DELETE FROM user_login WHERE id = ?`;
  const [customer] = await pool.query(sqlQuery, [id]);
  if (customer.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCounter: customer.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record Not Found'
    });
  }
}

async function userExists(email) {
  let sqlQuery = `SELECT * FROM user_login WHERE email = ?`

  const [user] = await pool.query(sqlQuery, [email]);

  if (user.length > 0) {
    return true;
  } else {
    return false;
  }

}
