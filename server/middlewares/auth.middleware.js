const jwt = require('jsonwebtoken');
const HttpError = require('../utils/httpError');
const pool = require('../utils/database');

const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      next(new HttpError('Authentication failed.', 401));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    pool.query(`select * from users where userId=?`, [decodedToken.userId], async (err, row, fields) => {
      if (err) return next(new HttpError('Something went wrong', 500));
      if (row.length === 0) next(new HttpError('Authentication failed.', 401));

      req.userId = decodedToken.userId;
      console.log(decodedToken.userId);
      next();
    })
  } catch (err) {
    next(new HttpError('Something went wrong.', 500));
  }
};

module.exports = authCheck;