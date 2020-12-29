const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async.js');
const Product = require('../models/Product')

//Getting All
exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const productList = await Product.find()
    res
        .status(200)
        .json({ success: true, count: productList.length, productList });
});

//Getting One
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, product });
});

//Creating One
exports.createProduct = asyncHandler(async (req, res, next) => {
    const newProduct = await Product.create(req.body)
    res
        .status(200)
        .json({ success: true, newProduct });
});

//Updating One
exports.updateProduct = asyncHandler(async (req, res, next) => {
    let product = null;
    product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
        );
    };
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json({ success: true, updatedProduct });
});

//Deleting One
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    let product = null;
    product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
        );
    };
    await product.remove();
    res.status(200).json({ success: true });
});
