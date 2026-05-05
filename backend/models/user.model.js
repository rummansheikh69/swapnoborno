import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verification: {
      type: String,
      default: "",
      enum: ["pending", "verified", "rejected", ""],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
