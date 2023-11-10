import mongoose, { Document, Schema, Model, model } from "mongoose";
import { ObjectId } from "mongodb";

interface ITourBooking extends Document {
  seller: ObjectId;
  tour: {
    _id: ObjectId;
    name: string;
  };
  user: ObjectId;
  createdAt: Date;
  price: number;
  participants: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

const tourBookingSchema: Schema = new Schema<ITourBooking>({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
});

const TourBooking: Model<ITourBooking> = model<ITourBooking>(
  "TourBooking",
  tourBookingSchema
);

export default TourBooking;
