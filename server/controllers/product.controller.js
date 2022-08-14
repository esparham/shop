const HttpError = require('../utils/httpError');
const pool = require('../utils/database');

const getProductByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    if (!category) {
      return next(new HttpError('Invalid input', 401));
    }
    if (category === 'all') {
      pool.query(`select * from products`, (err, row, fields) => {
        if (err) return next(new HttpError('Something went wrong', 500));
        if (row.length === 0) {
          return next(new HttpError('No product found.', 404));
        }
        res.status(200).json({ count: row.length, items: row })
      })
    } else {
      pool.query(`select * from products where type=?`, [category], (err, row, fields) => {
        if (err) return next(new HttpError('Something went wrong', 500));
        if (row.length === 0) {
          return next(new HttpError('No product found.', 404));
        }
        res.status(200).json({ count: row.length, items: row })
      })
    }
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }
};

const getProductByName = async (req, res, next) => {
  try {
    const { name, category } = req.params;
    if (!name) {
      return next(new HttpError('Invalid input', 401));
    }
    if (category === 'all') {
      pool.query(`select * from products where name like ?`, ['%' + name + '%'], (err, row, fields) => {
        if (err) return next(new HttpError('Something went wrong', 500));
        if (row.length === 0) {
          return next(new HttpError('No product found.', 404));
        }
        res.status(200).json({ count: row.length, items: row })
      })
    } else {
      pool.query(`select * from products where name like ? and type=?`, ['%' + name + '%', category], (err, row, fields) => {
        if (err) return next(new HttpError('Something went wrong', 500));
        if (row.length === 0) {
          return next(new HttpError('No product found.', 404));
        }
        res.status(200).json({ count: row.length, items: row })
      })
    }
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }
};

const getRandomProducts = async (req, res, next) => {
  try {
    pool.query(`SELECT * FROM products ORDER BY RAND() LIMIT 10`, (err, row, fields) => {
      if (err) return next(new HttpError(err, 500));
      if (row.length === 0) {
        return next(new HttpError('No product found.', 404));
      }
      res.status(200).json({ count: row.length, items: row })
    })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    pool.query(`select * from products where id=?`, [id], (err, row, fields) => {
      if (err) return next(new HttpError('Something went wrong', 500));
      if (row.length === 0) {
        return next(new HttpError('No product found.', 404));
      }
      res.status(200).json({ item: row[0] })
    })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }
}

const pay = async (req, res, next) => {
  try {
    let finalPrice = 0;
    for (let i = 0; i < req.body.length; i++) {
      pool.query(`select price from products where id=?`, [req.body[i].id], (err, row, fields) => {
        if (err) return next(new HttpError(err, 500));
        if (row.length === 0) {
          return next(new HttpError('No product found.', 404));
        }
        finalPrice += +row[0].price;
        pool.query(`insert into basket (productId,userId,quantity,price) values(?,?,?,?)`, [req.body[i].id, req.userId, req.body[i].qty, +row[0].price], (err, row, fields) => {
          if (err) return next(new HttpError(err, 500));
        })
        if (i === req.body.length - 1) {
          res.status(200).json({ finalPrice });
        }
      })
    }
  } catch (err) {
    return next(new HttpError('Something went wrong', 500));
  }
};

module.exports = {
  getProductByCategory,
  getProductByName,
  getRandomProducts,
  getProductById,
  pay
};