import express from "express";
import ProductController from "../controllers/ProductController.js";
import UserController, { UserOTP } from "../controllers/UserController.js";
import WishListController from "../controllers/WishListController.js";
import CartListController from "../controllers/CartListController.js";
import InvoiceController from "../controllers/InvoiceController.js";
import FeaturesController from "../controllers/FeaturesController.js";
import AuthMiddlewere from "../middlewares/AuthMiddleware.js";
const router = express.Router();

// Product Routes
router.get("/ProductBrandList", ProductController.ProductBrandList);
router.get("/ProductCategoryList", ProductController.ProductCategoryList);
router.get("/ProductSliderList", ProductController.ProductSliderList);
router.get(
  "/ProductListByBrand/:BrandID",
  ProductController.ProductListByBrand,
);
router.get(
  "/ProductListByCategory/:CategoryID",
  ProductController.ProductListByCategory,
);
router.get(
  "/ProductListByRemark/:Remark",
  ProductController.ProductListByRemark,
);
router.get(
  "/ProductListBySmiler/:CategoryID",
  ProductController.ProductListBySmiler,
);
router.get(
  "/ProductListBySmiler/:CategoryID",
  ProductController.ProductListBySmiler,
);
router.get(
  "/ProductListByKeyword/:Keyword",
  ProductController.ProductListByKeyword,
);
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails);
router.get("/ReviewList/:ProductID", ProductController.ReviewList);
router.post("/CreateReview", AuthMiddlewere, ProductController.CreateReview);
router.post("/ProductListByFilter", ProductController.ProductListByFilter);


// User
router.get("/UserOTP/:email", UserController.UserOTP);
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin);
router.get("/UserLogOut", UserController.UserLogOut);
router.post("/CreateProfile", AuthMiddlewere, UserController.CreateProfile);
router.post("/UpdateProfile", AuthMiddlewere, UserController.UpdateProfile);
router.get("/ReadProfile", AuthMiddlewere, UserController.ReadProfile);

// Wish
router.get("/WishList", AuthMiddlewere, WishListController.WishList);
router.get("/SaveWishList", AuthMiddlewere, WishListController.SaveWishList);
router.get(
  "/RemoveWishList",
  AuthMiddlewere,
  WishListController.RemoveWishList,
);

// Cart
router.get("/CartList", AuthMiddlewere, CartListController.CartList);
router.get("/SaveCartList", AuthMiddlewere, CartListController.SaveCartList);
router.get(
  "/UpdateCartList/:cartID",
  AuthMiddlewere,
  CartListController.UpdateCartList,
);
router.get(
  "/RevoveCartList",
  AuthMiddlewere,
  CartListController.RevoveCartList,
);

// Invoice & Payment
router.get("/CreateInvoice", AuthMiddlewere, InvoiceController.CreateInvoice);
router.get("/InvoiceList", AuthMiddlewere, InvoiceController.InvoiceList);
router.get(
  "/InvoiceProductList/:invoice_id",
  AuthMiddlewere,
  InvoiceController.InvoiceProductList,
);

router.post("/PaymentSuccess/:trxID", InvoiceController.PaymentSuccess);
router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail);
router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel);
router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN);

// Features
router.get("/FeaturesList", FeaturesController.FeaturesList);
router.get("/LegalDetails/:type", FeaturesController.LegalDetails);

export default router;
