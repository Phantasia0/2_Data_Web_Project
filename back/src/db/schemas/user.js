import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "안녕하세요",
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    profile: {
      type: String,
      required: true,
      default: "59616e98-eddb-4b07-9d87-df69b9e9c5d3.jpg",
    },
    deletedAt: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
