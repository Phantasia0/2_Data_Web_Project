import { Schema, model } from "mongoose";
import { LikeSchema } from "./like";
import { CommentSchema } from "./comment";

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
    likes: [LikeSchema],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", postSchema);

export { PostModel };
