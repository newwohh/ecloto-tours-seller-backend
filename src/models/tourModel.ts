import mongoose, { Document, Schema, Model, model } from "mongoose";

interface ITour extends Document {
  seller: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  startDate: Date;
  maxParticipants: number;
  images: string[];
  address: string;
  reviews: mongoose.Types.ObjectId[];
}

const tourSchema: Schema = new Schema<ITour>({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [String],
  duration: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Tour: Model<ITour> = model<ITour>("Tour", tourSchema);

export default Tour;
