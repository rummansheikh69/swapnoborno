import express from "express";
import * as UTILSCONTROLLER from "../controllers/utils.controller.js";

const router = express.Router();

router.get("/products", UTILSCONTROLLER.getProducts);
router.get("/product/:id", UTILSCONTROLLER.getSingleProduct);
router.get("/digitalProducts", UTILSCONTROLLER.getDigitalProducts);
router.get("/offers", UTILSCONTROLLER.getOffers);
router.get("/products/search", UTILSCONTROLLER.searchProducts);

router.get("/reviews/:id", UTILSCONTROLLER.getProductReviews);
router.get("/category/:category", UTILSCONTROLLER.getProductByCategory);

export default router;
