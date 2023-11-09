import mongoose, { Document, Model, Schema } from "mongoose";

export interface IReview extends Document {
  review: string;
  rating: number;
  tour: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
}

const tourSchema: Schema = new mongoose.Schema<IReview>({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review: Model<IReview> = mongoose.model<IReview>("Review", tourSchema);

export default Review;
