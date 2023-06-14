import mongoose, { Schema, model } from "mongoose";
import { ContactSchema } from "./contact";

const ParkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    address: {
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
    tel: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    contacts: [ContactSchema],
  },
  {
    timestamps: true,
  }
);

const ParkModel = model("Park", ParkSchema);

export { ParkModel };
