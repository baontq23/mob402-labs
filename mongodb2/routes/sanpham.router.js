const express = require("express");
const ProductModel = require("../models/sanpham");

const router = express.Router();

const Product = ProductModel.ProductModel;

router.get("/list", async (req, res, next) => {
  try {
    const products = await Product.find({}).lean().exec();

    return res.render("home", {
      pageTitle: "Danh sách sản phẩm",
      favIcon: "/img/icon_read.svg",
      products,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/detail/:_id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params._id).lean().exec();

    return res.render("detail", {
      pageTitle: "Chi tiết",
      favIcon: "/img/icon_detail.svg",
      product,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// #CREATE
router.get("/create", (req, res, next) => {
  res.render("create", {
    pageTitle: "Thêm sản phẩm",
    favIcon: "/img/icon_create.svg",
  });
});

router.post("/create", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    await Product.create(req.body);

    return res.redirect("/sanpham/list");
  } catch (error) {
    res.status(500).send(error);
  }
});

// #UPDATE
router.get("/update/:_id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params._id).lean().exec();

    return res.render("update", {
      pageTitle: "Sửa sản phẩm",
      favIcon: "/img/icon_update.svg",
      product,
    });
  } catch (error) {}
});

router.post("/update/:_id", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    await Product.findByIdAndUpdate(req.params._id, req.body).lean().exec();

    return res.redirect("/sanpham/list");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/delete/:_id", async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params._id).lean().exec();

    return res.redirect("/sanpham/list");
  } catch (error) {
    res.status(500).send(error);
  }
});

exports.router = router;
