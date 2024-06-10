import {pool} from '../config/db.js';

//ENDPOINT: api/v1/menu/all-starters
export const getAllStarters = async (req, res, next) => {
  let sqlQuery = `SELECT * FROM starters`;
  const [starters] = await pool.query(sqlQuery);
  if (starters.length > 0) {
    res.status(200).json({
      status: 'success',
      results: starters.length,
      data: { starters }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/menu/all-mains
export const getAllMains = async (req, res, next) => {
  let sqlQuery = `SELECT * FROM mains`;
  const [mains] = await pool.query(sqlQuery);
  if (mains.length > 0) {
    res.status(200).json({
      status: 'success',
      results: mains.length,
      data: { mains }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/menu/all-desserts
export const getAllDesserts = async (req, res, next) => {
  let sqlQuery = `SELECT * FROM desserts`;
  const [desserts] = await pool.query(sqlQuery);
  if (desserts.length > 0) {
    res.status(200).json({
      status: 'success',
      results: desserts.length,
      data: { desserts }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/menu/all-sides
export const getAllSides = async (req, res, next) => {
  let sqlQuery = `SELECT * FROM sides`;
  const [sides] = await pool.query(sqlQuery);
  if (sides.length > 0) {
    res.status(200).json({
      status: 'success',
      results: sides.length,
      data: { sides }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Server Error'
    });
  }
}

//ENDPOINT: api/v1/menu/single-starter/:id
export const getSingleStarter = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM starters WHERE starter_id = ?`;
  const [starters] = await pool.query(sqlQuery, [id]);
  if (starters.length > 0) {
    res.status(200).json({
      status: 'success',
      data: { starters: starters[0] }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/menu/single-main/:id
export const getSingleMain = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM mains WHERE main_id = ?`;
  const [mains] = await pool.query(sqlQuery, [id]);
  if (mains.length > 0) {
    res.status(200).json({
      status: 'success',
      data: { mains: mains[0] }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/menu/single-dessert/:id
export const getSingleDessert = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM desserts WHERE dessert_id = ?`;
  const [desserts] = await pool.query(sqlQuery, [id]);
  if (desserts.length > 0) {
    res.status(200).json({
      status: 'success',
      data: { desserts: desserts[0] }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/menu/single-side/:id
export const getSingleSide = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM sides WHERE side_id = ?`;
  const [sides] = await pool.query(sqlQuery, [id]);
  if (sides.length > 0) {
    res.status(200).json({
      status: 'success',
      data: { sides: sides[0] }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not Found'
    });
  }
}

//ENDPOINT: api/v1/menu/add-starter
export const addStarter = async (req, res, next) => {
  const {name, price} = req.body;

  let sqlQuery = `INSERT INTO starters (name, price)
                    VALUES (?, ?)
                  `;
  const [starters] = await pool.query(sqlQuery,
    [
      name, price
    ]
  );
  if (starters.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      InsertedID: starters.insertID,
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Error Adding Starter'
    });
  }
}

//ENDPOINT: api/v1/menu/add-main
export const addMain = async (req, res, next) => {
  const {name, price} = req.body;

  let sqlQuery = `INSERT INTO mains (name, price)
                    VALUES (?, ?)
                  `;
  const [mains] = await pool.query(sqlQuery,
    [
      name, price
    ]
  );
  if (mains.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      InsertedID: mains.insertID,
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Error Adding Main'
    });
  }
}

//ENDPOINT: api/v1/menu/add-dessert
export const addDessert = async (req, res, next) => {
  const {name, price} = req.body;

  let sqlQuery = `INSERT INTO desserts (name, price)
                    VALUES (?, ?)
                  `;
  const [desserts] = await pool.query(sqlQuery,
    [
      name, price
    ]
  );
  if (desserts.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      InsertedID: desserts.insertID,
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Error Adding Desserts'
    });
  }
}

//ENDPOINT: api/v1/menu/add-side
export const addSide = async (req, res, next) => {
  const {name, price} = req.body;

  let sqlQuery = `INSERT INTO sides (name, price)
                    VALUES (?, ?)
                  `;
  const [sides] = await pool.query(sqlQuery,
    [
      name, price
    ]
  );
  if (sides.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      InsertedID: sides.insertID,
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'Error Adding Sides'
    });
  }
}

//ENDPOINT: api/v1/menu/update-starter/:id
export const updateStarter = async (req, res, next) => {
  const id = req.params.id;
  const {name, price} = req.body;

  let sqlQuery = `UPDATE starters SET 
                    name = ?, price = ?
                  WHERE starter_id = ?`;
  const [starters] = await pool.query(sqlQuery,
    [
      name, price, id
    ]
  );
  if (starters.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCount: starters.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not found'
    });
  }
}

//ENDPOINT: api/v1/menu/update-main/:id
export const updateMain = async (req, res, next) => {
  const id = req.params.id;
  const {name, price} = req.body;

  let sqlQuery = `UPDATE mains SET 
                    name = ?, price = ?
                  WHERE main_id = ?`;
  const [mains] = await pool.query(sqlQuery,
    [
      name, price, id
    ]
  );
  if (mains.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCount: mains.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not found'
    });
  }
}

//ENDPOINT: api/v1/menu/update-dessert/:id
export const updateDessert = async (req, res, next) => {
  const id = req.params.id;
  const {name, price} = req.body;

  let sqlQuery = `UPDATE desserts SET 
                    name = ?, price = ?
                  WHERE dessert_id = ?`;
  const [desserts] = await pool.query(sqlQuery,
    [
      name, price, id
    ]
  );
  if (desserts.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCount: desserts.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not found'
    });
  }
}

//ENDPOINT: api/v1/menu/update-side/:id
export const updateSide = async (req, res, next) => {
  const id = req.params.id;
  const {name, price} = req.body;

  let sqlQuery = `UPDATE sides SET 
                    name = ?, price = ?
                  WHERE side_id = ?`;
  const [sides] = await pool.query(sqlQuery,
    [
      name, price, id
    ]
  );
  if (sides.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCount: sides.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not found'
    });
  }
}

//ENDPOINT: api/v1/menu/delete-starter/:id
export const deleteStarter = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `DELETE FROM starters WHERE starter_id = ?`;
  const [starters] = await pool.query(sqlQuery, [id]);
  if (starters.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCounter: starters.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record Not Found'
    });
  }
}

//ENDPOINT: api/v1/menu/delte-main/:id
export const deleteMain = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `DELETE FROM mains WHERE main_id = ?`;
  const [mains] = await pool.query(sqlQuery, [id]);
  if (mains.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCounter: mains.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record Not Found'
    });
  }
}

//ENDPOINT: api/v1/menu/delte-dessert/:id
export const deleteDessert = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `DELETE FROM desserts WHERE dessert_id = ?`;
  const [desserts] = await pool.query(sqlQuery, [id]);
  if (desserts.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCounter: desserts.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record Not Found'
    });
  }
}

//ENDPOINT: api/v1/menu/delte-side/:id
export const deleteSide = async (req, res, next) => {
  const id = req.params.id;

  let sqlQuery = `DELETE FROM sides WHERE side_id = ?`;
  const [sides] = await pool.query(sqlQuery, [id]);
  if (sides.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      recordCounter: sides.affectedRows
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record Not Found'
    });
  }
}