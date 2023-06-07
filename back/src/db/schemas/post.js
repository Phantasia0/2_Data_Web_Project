import { Schema, model } from "mongoose";
const LikeSchema = require("./like");
const CommentSchema = require("./comment");

const postSchema = new Schema(
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
    like: [LikeSchema],
    comment: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", postSchema);

export { PostModel };
