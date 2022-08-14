const HttpError = require('../utils/httpError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../utils/database');

const generateToken = (userId) => {
  let token;
  try {
    token = jwt.sign(
      { userId },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );
    return token;
  } catch (err) {
    new HttpError('Faild to generate token.', 500);
  }
};

const signUp = async (req, res, next) => {
  const { loginName, password } = req.body;
  if (!loginName || !password) {
    return next(new HttpError('Invalid inputs', 401));
  }

  pool.query(`select * from users where loginName=?`, [loginName.trim()], async (err, row, fields) => {
    if (err) return next(new HttpError('Something went wrong', 500));

    if (row.length !== 0) {
      return next(new HttpError('User name already exists', 500));
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password.trim(), 12);
    } catch (err) {
      return next(new HttpError('Faild to register user.', 500));
    }
    pool.query(`insert into users(loginName, password) values (?,?)`, [loginName.trim(), hashedPassword], (err, row, fields) => {
      if (err) return next(new HttpError('Something went wrong', 500));
      res.status(201).json({
        message: 'Registered successfully.',
      });
    });
  });
};

const login = async (req, res, next) => {
  const { loginName, password, token } = req.body;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      pool.query(`select * from users where userId=?`, [decodedToken.userId], async (err, row, fields) => {
        if (err) {
          return next(new HttpError('Something went wrong', 500));
        }
        if (row.length === 0) {
          next(new HttpError('Authentication failed.', 401));
        } else {
          res.status(200).json({ status: 'success', token, userId: row[0].userId, userName: row[0].loginName });
        }
      })
    } catch (err) {
      return next(new HttpError('No user find.', 404));
    }

  } else {
    if (!loginName.trim() || !password.trim()) {
      return next(new HttpError('Invalid inputs', 401));
    }

    pool.query(`select * from users where loginName=?`, [loginName], async (err, row, fields) => {
      if (err) {
        return next(new HttpError('Something went wrong', 500));
      }

      if (row.length === 0) {
        return next(new HttpError('No user find.', 404));
      }

      let isValidPassword = false;
      try {
        isValidPassword = await bcrypt.compare(password, row[0].password);
      } catch (err) {
        return next(new HttpError('Could not log in user.', 500));
      }
      if (!isValidPassword) {
        return next(new HttpError('Invalid credentials.', 401));
      }
      const token = generateToken(row[0].userId);
      res.status(200).json({ status: 'success', token, userId: row[0].userId, userName: row[0].loginName });
    });
  }
};

module.exports = {
  signUp,
  login,
};