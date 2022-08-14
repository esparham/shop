const express = require('express');
const router = express.Router();
const authCheck = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');

router.get('/randomProducts', productController.getRandomProducts);
router.get('/category/:category', productController.getProductByCategory);
router.get('/id/:id', productController.getProductById);
router.get('/name/:name/:category', productController.getProductByName);
router.post('/pay', authCheck, productController.pay);

module.exports = router;