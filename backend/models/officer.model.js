import mongoose, { Schema } from "mongoose";

const officerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
});

export const Officer = mongoose.model("Officer", officerSchema);
