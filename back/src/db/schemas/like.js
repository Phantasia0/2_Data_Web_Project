import { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
