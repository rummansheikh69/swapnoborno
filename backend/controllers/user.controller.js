import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Verification } from "../models/verification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitReview = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { comment, rating } = req.body;
  if (!productId || !comment || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingReview = await Review.findOne({
    product: productId,
    "user._id": req.user._id,
  });

  if (existingReview) {
    return res
      .status(400)
      .json({ message: "You have already submitted a review" });
  }

  const review = await Review.create({
    product: productId,
    rating,
    comment,
    user: {
      name: req.user.name,
      _id: req.user._id,
    },
  });

  const stats = await Review.aggregate([
    { $match: { product: product._id } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  product.rating = stats[0]?.avgRating || 0;
  await product.save();

  const totalReviews = await Review.countDocuments({ product: productId });
  product.totalReviews = totalReviews;
  await product.save();

  res.status(201).json(review);
});

export const createVerification = async (req, res) => {
  try {
    const userId = req.user._id;
    const body = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ---------- GROUP VALIDATION ----------

    const personalPhones = [
      body.phoneNumberOne,
      body.phoneNumberTwo,
      body.phoneNumberThree,
    ].filter(Boolean);

    if (personalPhones.length < 1) {
      return res.status(400).json({
        message: "At least one personal phone number required",
      });
    }

    const bankingNumbers = [
      body.bkashNumber,
      body.nagadNumber,
      body.rocketNumber,
    ].filter(Boolean);

    if (bankingNumbers.length < 1) {
      return res.status(400).json({
        message: "At least one mobile banking number required",
      });
    }

    const familyNumbers = [
      body.motherNumber,
      body.fatherNumber,
      body.brothersNumber,
      body.sistersNumber,
      body.unclesNumber,
      body.brothersInLawNumber,
      body.motherInLawNumber,
    ].filter(Boolean);

    if (familyNumbers.length < 2) {
      return res.status(400).json({
        message: "At least 2 family numbers required",
      });
    }

    const friendNumbers = [
      body.cousinsNumber,
      body.mamatovaisNumber,
      body.fufatovaisNumber,
      body.closefriendsNumber,
      body.otherFriendsNumber,
    ].filter(Boolean);

    if (friendNumbers.length < 2) {
      return res.status(400).json({
        message: "At least 2 friend circle numbers required",
      });
    }

    const emergencyNumbers = [
      body.neighboursNumber,
      body.elakarBoroVairNumber,
      body.electedMembersNumber,
      body.electedChairmansNumber,
      body.otherImportantNumber,
    ].filter(Boolean);

    if (emergencyNumbers.length < 2) {
      return res.status(400).json({
        message: "At least 2 emergency numbers required",
      });
    }

    // ---------- REQUIRED IMAGES CHECK ----------

    if (
      !body.electricityBill ||
      !body.ownNidFrontImage ||
      !body.ownNidBackImage ||
      !body.familyNidFrontImage ||
      !body.familyNidBackImage ||
      !body.admitCardImage ||
      !body.ownHalfBodyImage ||
      !body.ownFullBodyImage
    ) {
      return res.status(400).json({
        message: "All required documents must be uploaded",
      });
    }

    // ---------- CLOUDINARY UPLOAD ----------

    const imageFields = [
      "electricityBill",
      "ownNidFrontImage",
      "ownNidBackImage",
      "familyNidFrontImage",
      "familyNidBackImage",
      "admitCardImage",
      "ownHalfBodyImage",
      "ownFullBodyImage",
    ];

    for (const field of imageFields) {
      const result = await cloudinary.uploader.upload(body[field]);
      body[field] = result.secure_url;
    }

    // ---------- SAVE ----------

    const verification = await Verification.create({
      ...body,
      userId,
    });

    user.verification = "pending";
    await user.save();

    res.status(201).json({ message: "Verification submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVerificationForm = asyncHandler(async (req, res) => {
  try {
    const form = await Verification.findOne({ userId: req.user._id }).select(
      "-updatedAt -__v",
    );
    const position = await Verification.countDocuments({
      userId: { $ne: req.user._id },
      status: "pending",
      createdAt: { $lt: form?.createdAt },
    });
    res.status(200).json({ form, position });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
