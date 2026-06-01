// controllers/productController.js

import Product from "../models/Product.js";
import asyncHandler from "../middlewares/asyncHandler.js";


// CREATE PRODUCT
export const createProduct = asyncHandler(
  async (req, res) => {

    const {
      title,
      price,
      description,
      image,
      category,
      stock,
    } = req.body;

    if (
      !title ||
      !price ||
      !description ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const product = await Product.create({
      title: title.trim(),
      price,
      description: description.trim(),
      image,
      category,
      stock,
    });

    res.status(201).json({
      success: true,
      product,
    });
  }
);

// GET PRODUCTS
export const getProducts = asyncHandler(
  async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  }
);

// GET SINGLE PRODUCT
export const getSingleProduct = asyncHandler(
  async (req, res) => {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  }
);

// UPDATE PRODUCT
export const updateProduct = asyncHandler(
  async (req, res) => {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  }
);

// DELETE PRODUCT
export const deleteProduct = asyncHandler(
  async (req, res) => {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      product
    });
  }
);