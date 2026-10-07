const express = require('express');

const router = express.Router();

const upload = require('../middleware/upload');

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');


// CREATE PRODUCT
router.post('/', upload.single('image'), createProduct);


// GET ALL PRODUCTS
router.get('/', getProducts);


// GET SINGLE PRODUCT
router.get('/:id', getProduct);


// UPDATE PRODUCT
router.put('/:id', upload.single('image'), updateProduct);


// DELETE PRODUCT
router.delete('/:id', deleteProduct);


module.exports = router;