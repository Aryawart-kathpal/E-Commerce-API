const express = require('express');
const router = express.Router();

const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const { getAllProducts, getSingleProduct, updateProduct, uploadImage, createProduct, deleteProduct } = require('../controllers/productController');

router.route('/').get(getAllProducts).
    post([authenticateUser, authorizePermissions('admin')], createProduct);

router.route('/uploadImage').post([authenticateUser,authorizePermissions('admin')],uploadImage);

router.route('/:id').get(getSingleProduct)
    .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
    .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);

module.exports = router;
