import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 16;
  const page = Number(req.query.pageNumber) || 1;
  const category = req.query.category || 'Все';
  const subCategory = req.query.subCategory || 'Все';
  const cover = req.query.cover || 'Все';
  const searchByName = req.query.searchByName || '';

  // Fetch all products from the database
  const allProducts = await Product.find({});
  // Construct the filter object
  const filter = {
    categories: category,
    subCategories: subCategory,
    cover: cover,
    name: { $regex: new RegExp(searchByName, 'i') } // Case-insensitive search
  };

  // Count total matching documents
  const count = await Product.countDocuments(filter);

  // Fetch products with pagination and filtering
  const products = await Product.find(filter)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    type: "sample type",
    name: "sample name",
    price: 0,
    decorType: "sample decor type",
    decorPrice: 0,
    description: "sample description",
    cover: [""],
    tiers: 0,
    imgUrl: "",
    imgAlt: "",
    categories: [""],
    subCategories: [""],
    mainCategory: "sample main category"
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};