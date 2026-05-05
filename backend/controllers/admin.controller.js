import { Offer } from "../models/offer.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.model.js";
import { Verification } from "../models/verification.model.js";
import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";
import { DigitalProduct } from "../models/digitalProduct.model.js";
import { Banner } from "../models/banner.model.js";
import { Rules } from "../models/rules.model.js";
import { Officer } from "../models/officer.model.js";

export const createProviderFull = async (req, res) => {
  try {
    const { name, image, categories } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!image) return res.status(400).json({ message: "Image is required" });

    // Ensure categories is array
    let parsedCategories = [];
    if (categories) {
      if (typeof categories === "string") {
        parsedCategories = JSON.parse(categories);
      } else if (Array.isArray(categories)) {
        parsedCategories = categories;
      }
    }

    // Convert offer.price to Number
    parsedCategories = parsedCategories.map((cat) => ({
      ...cat,
      offers: cat.offers.map((offer) => ({
        ...offer,
        price: Number(offer.price),
      })),
    }));

    // Upload Base64 image to Cloudinary
    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "providers",
    });

    const provider = await Offer.create({
      name,
      image: uploaded.secure_url,
      categories: parsedCategories,
    });

    res.status(201).json(provider);
  } catch (error) {
    console.error("Error creating provider:", error);
    res.status(500).json({ message: "Error creating provider" });
  }
};

/** UPDATE provider info (name + image optional) */
export const updateProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { name, image } = req.body;

    const provider = await Offer.findById(providerId);
    if (!provider)
      return res.status(404).json({ message: "Provider not found" });

    if (name) provider.name = name;
    if (image) {
      const uploaded = await cloudinary.uploader.upload(image, {
        folder: "providers",
      });
      provider.image = uploaded.secure_url;
    }

    await provider.save();
    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating provider" });
  }
};

/** DELETE provider */
export const deleteProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const provider = await Offer.findByIdAndDelete(providerId);
    if (!provider)
      return res.status(404).json({ message: "Provider not found" });
    res.json({ message: "Provider deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting provider" });
  }
};

/** UPDATE a category */
export const updateCategory = async (req, res) => {
  try {
    const { providerId, categoryId } = req.params;
    const { title } = req.body;

    const provider = await Offer.findById(providerId);
    if (!provider)
      return res.status(404).json({ message: "Provider not found" });

    const category = provider.categories.id(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (title) category.title = title;
    await provider.save();
    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category" });
  }
};

/** DELETE a category */
export const deleteCategory = async (req, res) => {
  try {
    const { providerId, categoryId } = req.params;

    const provider = await Offer.findById(providerId);
    if (!provider)
      return res.status(404).json({ message: "Provider not found" });

    // Remove category safely
    provider.categories.pull({ _id: categoryId });

    await provider.save();

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

/** UPDATE an offer */
export const updateOffer = async (req, res) => {
  try {
    const { providerId, categoryId, offerId } = req.params;
    const { title, validity, price } = req.body;

    const provider = await Offer.findById(providerId);
    if (!provider)
      return res.status(404).json({ message: "Provider not found" });

    const category = provider.categories.id(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const offer = category.offers.id(offerId);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    if (title) offer.title = title;
    if (validity) offer.validity = validity;
    if (price !== undefined) offer.price = Number(price);

    await provider.save();
    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating offer" });
  }
};

// Add new offer inside a category
export const addOffer = async (req, res) => {
  try {
    const { providerId, categoryId } = req.params;
    const { title, validity, price } = req.body;

    const provider = await Offer.findOneAndUpdate(
      { _id: providerId, "categories._id": categoryId },
      {
        $push: {
          "categories.$.offers": { title, validity, price },
        },
      },
      { new: true },
    );

    if (!provider) {
      return res
        .status(404)
        .json({ message: "Provider or category not found" });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** DELETE an offer */
export const deleteOffer = async (req, res) => {
  try {
    const { providerId, categoryId, offerId } = req.params;

    const provider = await Offer.findById(providerId);
    if (!provider)
      return res.status(404).json({ message: "Provider not found" });

    const category = provider.categories.id(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Remove offer safely
    category.offers.pull({ _id: offerId });

    await provider.save();

    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      inStock,
      rating,
      totalReviews,
      thumbnailImage,
      images,
      category,
    } = req.body;

    // Upload thumbnail
    const uploadedThumbnail = await cloudinary.uploader.upload(thumbnailImage, {
      folder: "products",
    });

    // Upload multiple images
    const uploadedImages = await Promise.all(
      images.map((img) =>
        cloudinary.uploader.upload(img, {
          folder: "products",
        }),
      ),
    );

    const newProduct = await Product.create({
      title,
      description,
      price,
      discountPrice,
      inStock,
      rating,
      totalReviews,
      category,
      thumbnailImage: uploadedThumbnail.secure_url,
      images: uploadedImages.map((img) => img.secure_url),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If thumbnail is base64, upload again
    if (updateData.thumbnailImage?.startsWith("data:image")) {
      const uploadedThumbnail = await cloudinary.uploader.upload(
        updateData.thumbnailImage,
        { folder: "products" },
      );
      updateData.thumbnailImage = uploadedThumbnail.secure_url;
    }

    // If images updated
    if (
      updateData.images &&
      updateData.images.length &&
      updateData.images[0].startsWith("data:image")
    ) {
      const uploadedImages = await Promise.all(
        updateData.images.map((img) =>
          cloudinary.uploader.upload(img, { folder: "products" }),
        ),
      );

      updateData.images = uploadedImages.map((img) => img.secure_url);
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getSingleVerification = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const verification = await Verification.findById(verificationId).populate({
      path: "userId",
      select: "name email",
    });
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    res.json(verification);
  } catch (error) {
    res.status(500).json({ message: "Error fetching verification" });
  }
};

export const getAllVerifications = async (req, res) => {
  try {
    const { status } = req.query;
    const verifications = await Verification.find({ status })
      .sort({ createdAt: -1 }) // latest first
      .select("userId status createdAt")
      .populate({
        path: "userId",
        select: "name email",
      });

    res.json(verifications);
  } catch (error) {
    console.log("get verification error", error);

    res.status(500).json({ message: "Error fetching verifications" });
  }
};

export const deleteVerification = async (req, res) => {
  try {
    const { id } = req.params;
    await Verification.findByIdAndDelete(id);
    res.json({ message: "Verification deleted" });
  } catch (error) {
    console.log("delete verification error", error);

    res.status(500).json({ message: "Error deleting verifications" });
  }
};

export const markAsVerified = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const verification = await Verification.findById(verificationId);
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    verification.status = "verified";
    await verification.save();

    const user = await User.findById(verification.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.verification = "verified";
    await user.save();

    res.json({ message: "Verification marked as verified" });
  } catch (error) {
    res.status(500).json({ message: "Error marking as verified" });
  }
};

export const markAsRejected = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const verification = await Verification.findById(verificationId);
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    verification.status = "rejected";
    await verification.save();

    const user = await User.findById(verification.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.verification = "rejected";
    await user.save();
    res.json({ message: "Verification marked as rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error marking as rejected" });
  }
};

// ==============================
// CREATE CATEGORY
// ==============================
export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Name and image are required",
      });
    }

    // upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "categories",
    });

    const category = await Category.create({
      name: name.trim().toLowerCase(),
      image: uploadedImage.secure_url,
      link: name.replace(/\s/g, "").toLowerCase(),
    });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// GET ALL CATEGORIES
// ==============================
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// UPDATE CATEGORY
// ==============================
export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // update name if provided
    if (name) {
      category.name = name.trim().toLowerCase();
    }

    // if new base64 image provided
    if (image && image.startsWith("data:")) {
      // -------- DELETE OLD IMAGE --------
      if (category.image) {
        const urlParts = category.image.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const publicId = `categories/${fileName.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      }

      // -------- UPLOAD NEW IMAGE --------
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "categories",
      });

      category.image = uploadedImage.secure_url;
    }

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// DELETE CATEGORY
// ==============================
export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// CREATE DIGITAL PRODUCT
// ==============================
export const createDigitalProduct = async (req, res) => {
  try {
    const { title, price, image } = req.body;

    if (!title || !price || !image) {
      return res.status(400).json({
        message: "Title, price and image are required",
      });
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "digital-products",
    });

    const product = await DigitalProduct.create({
      title: title.trim(),
      price,
      image: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id, // important
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// GET ALL
// ==============================
export const getAllDigitalProducts = async (req, res) => {
  try {
    const products = await DigitalProduct.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// UPDATE
// ==============================
export const updateDigitalProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, image } = req.body;

    const product = await DigitalProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (title) product.title = title.trim();
    if (price) product.price = price;

    if (image && image.startsWith("data:")) {
      // delete old image
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "digital-products",
      });

      product.image = uploadedImage.secure_url;
      product.imagePublicId = uploadedImage.public_id;
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// DELETE
// ==============================
export const deleteDigitalProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await DigitalProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
// CREATE
export const createBanner = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "banners",
    });

    const banner = await Banner.create({
      image: uploadResponse.secure_url,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error("Create banner error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    console.error("Fetch banner error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    if (image) {
      // delete old image
      const publicId = banner.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`banners/${publicId}`);

      // upload new image
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "banners",
      });

      banner.image = uploadResponse.secure_url;
    }

    await banner.save();

    res.status(200).json(banner);
  } catch (error) {
    console.error("Update banner error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const publicId = banner.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`banners/${publicId}`);

    await banner.deleteOne();

    res.status(200).json({ message: "Banner deleted" });
  } catch (error) {
    console.error("Delete banner error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CREATE =================
export const createRules = async (req, res) => {
  try {
    const { title, rules } = req.body;

    if (!title || !rules || !rules.length) {
      return res.status(400).json({ message: "Title and rules are required" });
    }

    const newRules = await Rules.create({
      title,
      rules,
    });

    res.status(201).json(newRules);
  } catch (error) {
    console.error("Create rules error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ALL =================
export const getAllRules = async (req, res) => {
  try {
    const data = await Rules.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch rules error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE =================
export const updateRules = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, rules } = req.body;

    const updated = await Rules.findByIdAndUpdate(
      id,
      { title, rules },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Rules not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update rules error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE =================
export const deleteRules = async (req, res) => {
  try {
    const { id } = req.params;

    const rule = await Rules.findByIdAndDelete(id);

    if (!rule) {
      return res.status(404).json({ message: "Rules not found" });
    }

    await rule.deleteOne();

    res.status(200).json({ message: "Rules deleted" });
  } catch (error) {
    console.error("Delete rules error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE Officer
export const createOfficer = async (req, res) => {
  try {
    const { name, rank, whatsappNumber, image } = req.body;

    if (!name || !rank || !whatsappNumber || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image);

    const officer = await Officer.create({
      name,
      rank,
      whatsappNumber,
      image: uploadResult.secure_url,
    });

    res.status(201).json(officer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all Officers
export const getOfficers = async (req, res) => {
  try {
    const officers = await Officer.find().sort({ createdAt: -1 });
    res.status(200).json(officers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Officer
export const updateOfficer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rank, whatsappNumber, image } = req.body;

    const officer = await Officer.findById(id);
    if (!officer) return res.status(404).json({ message: "Officer not found" });

    // If a new image is provided, replace it in Cloudinary
    let updatedImage = officer.image;
    if (image && image !== officer.image) {
      // Optional: Delete old image from Cloudinary here if needed
      const uploadResult = await cloudinary.uploader.upload(image);
      updatedImage = uploadResult.secure_url;
    }

    officer.name = name || officer.name;
    officer.rank = rank || officer.rank;
    officer.whatsappNumber = whatsappNumber || officer.whatsappNumber;
    officer.image = updatedImage;

    await officer.save();
    res.status(200).json(officer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE Officer
export const deleteOfficer = async (req, res) => {
  try {
    const { id } = req.params;
    const officer = await Officer.findById(id);
    if (!officer) return res.status(404).json({ message: "Officer not found" });

    // Optional: delete image from Cloudinary here if needed
    await Officer.findByIdAndDelete(id);
    res.status(200).json({ message: "Officer deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
