// Controllers for product routes
// The product routes are defined in backend/routes/productRoutes.js. The routes are handled by the product controller
// in backend/controllers/productController.js. The controller is responsible for handling the request and sending the response.
// The controller uses the product model to access the database and return the data.

import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productmodel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById };
