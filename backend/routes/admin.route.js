import express from "express";
import * as ADMINCONTROLLER from "../controllers/admin.controller.js";
import { adminRoutes } from "../middleware/adminRoutes.js";
const router = express.Router();

router.post("/provider", adminRoutes, ADMINCONTROLLER.createProviderFull);
router.put(
  "/provider/:providerId",
  adminRoutes,
  ADMINCONTROLLER.updateProvider,
);
router.delete(
  "/provider/:providerId",
  adminRoutes,
  ADMINCONTROLLER.deleteProvider,
);
router.put(
  "/provider/:providerId/category/:categoryId",
  adminRoutes,
  ADMINCONTROLLER.updateCategory,
);
router.post(
  "/providers/:providerId/category/:categoryId/offer",
  adminRoutes,
  ADMINCONTROLLER.addOffer,
);
router.delete(
  "/provider/:providerId/category/:categoryId",
  adminRoutes,
  ADMINCONTROLLER.deleteCategory,
);
router.put(
  "/provider/:providerId/category/:categoryId/offer/:offerId",
  adminRoutes,
  ADMINCONTROLLER.updateOffer,
);
router.delete(
  "/provider/:providerId/category/:categoryId/offer/:offerId",
  adminRoutes,
  ADMINCONTROLLER.deleteOffer,
);

router.get("/products", ADMINCONTROLLER.getAllProductsAdmin);
router.get(
  "/getVerification/:verificationId",
  adminRoutes,
  ADMINCONTROLLER.getSingleVerification,
);
router.get("/verifications", adminRoutes, ADMINCONTROLLER.getAllVerifications);
router.delete(
  "/verification/:id",
  adminRoutes,
  ADMINCONTROLLER.deleteVerification,
);
router.post("/product", adminRoutes, ADMINCONTROLLER.createProduct);
router.put("/product/:id", adminRoutes, ADMINCONTROLLER.updateProduct);
router.delete("/product/:id", adminRoutes, ADMINCONTROLLER.deleteProduct);

router.post(
  "/markAsVerified/:verificationId",
  adminRoutes,
  ADMINCONTROLLER.markAsVerified,
);
router.post(
  "/markAsRejected/:verificationId",
  adminRoutes,
  ADMINCONTROLLER.markAsRejected,
);

router.post("/create-category", adminRoutes, ADMINCONTROLLER.createCategory);
router.get(
  "/get-all-categories",

  ADMINCONTROLLER.getAllCategories,
);
router.put("/category/:id", adminRoutes, ADMINCONTROLLER.editCategory);
router.delete("/category/:id", adminRoutes, ADMINCONTROLLER.removeCategory);

router.post(
  "/createDigitalProduct",
  adminRoutes,
  ADMINCONTROLLER.createDigitalProduct,
);
router.get("/getAllDigitalProducts", ADMINCONTROLLER.getAllDigitalProducts);
router.put(
  "/digitalProduct/:id",
  adminRoutes,
  ADMINCONTROLLER.updateDigitalProduct,
);
router.delete(
  "/digitalProduct/:id",
  adminRoutes,
  ADMINCONTROLLER.deleteDigitalProduct,
);

//banner
router.post("/banner", adminRoutes, ADMINCONTROLLER.createBanner);
router.get("/banner", ADMINCONTROLLER.getAllBanners);
router.put("/banner/:id", adminRoutes, ADMINCONTROLLER.updateBanner);
router.delete("/banner/:id", adminRoutes, ADMINCONTROLLER.deleteBanner);

//rules
router.post("/rules", adminRoutes, ADMINCONTROLLER.createRules);
router.get("/rules", ADMINCONTROLLER.getAllRules);
router.put("/rules/:id", adminRoutes, ADMINCONTROLLER.updateRules);
router.delete("/rules/:id", adminRoutes, ADMINCONTROLLER.deleteRules);

// CREATE Officer
router.post("/officer", adminRoutes, ADMINCONTROLLER.createOfficer);

// GET all Officers
router.get("/officer", ADMINCONTROLLER.getOfficers);

// UPDATE Officer by ID
router.put("/officer/:id", adminRoutes, ADMINCONTROLLER.updateOfficer);

// DELETE Officer by ID
router.delete("/officer/:id", adminRoutes, ADMINCONTROLLER.deleteOfficer);

export default router;
