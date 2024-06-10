import {pool} from '../config/db.js';

import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

function signJWTToken(user) {
  return JWT.sign({
    id: user.id,
    email: user.email,
    role: user.role
  }, process.env.JWT_SECRET, { 
    expiresIn: process.env.JWT_EXPIRES_IN });
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

export const createAdminUser = async (req, res) => {
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

export const signupUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (await userExists(email)) {
    res.status(400).json({
      status: 'Error',
      message: 'User already exists',
    });
    console.log('User already exists');
    return;
  }
  
  const pwd = bcrypt.hashSync(password, 12);

  let sqlQuery = `INSERT INTO user_login(email, password, first_name, last_name)
                    VALUES(?,?,?,?)
                  `; 

  const [result] = await pool.query(sqlQuery, 
    [
      email, pwd, first_name, last_name
    ]
  );

  if(result.affectedRows > 0) {
    const token = signJWTToken({id: result.insertId, email: email, role: 'CUSTOMER'});
    const data = req.body;

    data.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        token: token,
        customer: data
      },
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

// export const login()

}

export const loginUser = async (req, res) => {
  const { email, password} = req.body;

  let sqlQuery = `SELECT * FROM user_login WHERE email = ?`; 

  const [result] = await pool.query(sqlQuery, 
    [
      email
    ]
  );

  if(!result.length) {
    return res.status(404).json({
      status: 'Error',
      message: 'Username or Password Incorrect',
    });
    console.log('Username or Password Incorrect');
  }

  if(!(await bcrypt.compare(password, result[0].password))) {
    return res.status(404).json({
      status: 'Error',
      message: 'Username or Password Incorrect',
    });
    console.log('Username or Password is incorrect');
  }

  const token = signJWTToken({ id: result[0].id, email: email, role: result[0].role });
  result[0].password = undefined;

  res.status(200).json({
    status:'success',
    data: {
      token: token,
      user: result[0]
    },
    message: 'User logged in successfully',
  });
  console.log('User logged in successfully');

}

export const protect = async (req, res, next) => {
  const authorization = req.get('Authorization');

  if (!authorization?.startsWith('Bearer')) {
    return res.status(401).json({
      status: 'Error',
      message: 'Not Authorized',
    });
    console.log('Not Authorized');
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    let strQuery = `SELECT * FROM user_login WHERE id = ?`;
    const [user] = await pool.query(strQuery, [decoded.id]);
    if (!user.length) {
      return res.status(401).json({
        status: 'Error',
        message: 'Invalid Token',
      });
      console.log('Invalid Token');
    }

    user[0].password = undefined;

    //Special USER Variable attached to the Request
    req.user = user[0];
    next();

  } catch (e) {
    if (e.message === 'jwt expired') {
      return res.status(401).json({
        status: 'Error',
        message: 'Invalid Token',
      });
      console.log('Invalid Token');
    }
    next();
  }
}

export const getThisUser = async (req, res) => {
  const data = req.user;
  if (!data) {
    return next();
  }
  data.password = undefined;

  let strQuery = `SELECT * FROM user_login WHERE id = ?`;

  const [user] = await pool.query(strQuery, [data.id]);
  if (!user.length) {
    return res.status(401).json({
      status: 'Error',
      message: 'Invalid Request',
    });
    console.log('Invalid Request');
  }
  // next();

  user[0].password = undefined;
  
  return res.status(200).json({
    status:'success',
    data: {
      user: user[0]
    },
    // message: 'User logged in successfully',
  })

}