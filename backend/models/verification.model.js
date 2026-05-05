import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userOccupation: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    postOffice: {
      type: String,
      required: true,
    },
    thana: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    phoneNumberOne: {
      type: String,
    },
    phoneNumberTwo: {
      type: String,
    },
    phoneNumberThree: {
      type: String,
    },
    bkashNumber: {
      type: String,
    },
    rocketNumber: {
      type: String,
    },
    nagadNumber: {
      type: String,
    },
    motherNumber: {
      type: String,
    },
    fatherNumber: {
      type: String,
    },
    brothersNumber: {
      type: String,
    },
    sistersNumber: {
      type: String,
    },
    unclesNumber: {
      type: String,
    },
    brothersInLawNumber: {
      type: String,
    },
    motherInLawNumber: {
      type: String,
    },
    cousinsNumber: {
      type: String,
    },
    mamatovaisNumber: {
      type: String,
    },
    fufatovaisNumber: {
      type: String,
    },
    closefriendsNumber: {
      type: String,
    },
    otherFriendsNumber: {
      type: String,
    },
    neighboursNumber: {
      type: String,
    },
    elakarBoroVairNumber: {
      type: String,
    },
    electedMembersNumber: {
      type: String,
    },
    electedChairmansNumber: {
      type: String,
    },
    otherImportantNumber: {
      type: String,
    },
    schoolAddress: {
      type: String,
    },
    collegeAddress: {
      type: String,
    },
    whatsAppNumber: {
      type: String,
    },
    ownFacebookProfile: {
      type: String,
    },
    familyFacebookProfile: {
      type: String,
    },
    electricityBill: {
      type: String,
    },
    ownNidFrontImage: {
      type: String,
    },
    ownNidBackImage: {
      type: String,
    },
    familyNidFrontImage: {
      type: String,
    },
    familyNidBackImage: {
      type: String,
    },
    admitCardImage: {
      type: String,
    },
    jobIdCardFrontImage: {
      type: String,
    },
    jobIdCardBackImage: {
      type: String,
    },
    ownHalfBodyImage: {
      type: String,
    },
    ownFullBodyImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export const Verification = mongoose.model("Verification", verificationSchema);
