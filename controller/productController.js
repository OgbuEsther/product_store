const productModel = require("../model/productModel");
const userModel = require("../model/userModel");
const cloudinary = require("../config/cloudinary");

exports.createproduct = async (req, res) => {
  try {
    //this is to get the user id to be able to upload a product and reference it to the user collection
    const getUser = await userModel.findById(req.params.userID);

    const { productName, Price, Availability, Category, productImage } =
      req.body;

      //adding cloudinary to handle the file upload
    const upload = await cloudinary.uploader.upload(req.file.path);

    const ProductList = await productModel.create({
      productName,
      Price,
      Availability,
      Category,
      productImage: upload.secure_url,
    });

//this is to push and save the created product id into the user collection
     getUser.Products.push(ProductList._id);
    await getUser.save();

    return res.status(201).json({
      message: "these is our products",
      data: ProductList,
    });
  } catch (error) {
    console.error("couldn't found products here", error);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const Products = await productModel.find();
    return res.status(200).json({
      message: "gotten all Products",
      data: Products,
    });
  } catch (error) {
    return res.status(400).json({
      message: "couldn't get Products",
      error,
    });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const { id } = res.params;
    const products = await productModel
      .findById({ id })
    return res.status(200).json({
      message: "gotten products by id",
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      message: "couldn't get products by id",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "products deleted",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: "couldn't delete product",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {Availability } = req.body;
    const updates = await productModel.findByIdAndUpdate(
      id,
      { Availability},
      { new: true }
    );
    return res.status(202).json({
      message: "product updated",
      data: updates,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to update product",
      error,
    });
  }
};
