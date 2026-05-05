import mongoose, { Schema } from "mongoose";

const rulesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rules: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export const Rules = mongoose.model("Rules", rulesSchema);
