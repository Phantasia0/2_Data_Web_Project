import mongoose, { Schema, model } from "mongoose";

const RestaurantSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    reservation: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RestaurantModel = model("Restaurant", RestaurantSchema);

export { RestaurantModel };
