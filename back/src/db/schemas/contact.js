import { Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    park: {
      type: Schema.Types.ObjectId,
      ref: "Park",
    },
    value: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export { ContactSchema };
