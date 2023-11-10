import mongoose, { Document, Schema, Model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  bookings: Array<IBooking>;
  createdAt: Date;
  passwordResetOtp: string | undefined;
  passwordResetExpires: Number | undefined;
}

interface IBooking {
  tour: string;
  bookingDate: Date;
  participants: number;
}

interface IUserDocument extends IUser, Document {}

const userSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookings: [
    {
      tour: {
        type: Schema.Types.ObjectId,
        ref: "Tour",
      },
      bookingDate: Date,
      participants: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetOtp: {
    type: String,
  },
  passwordResetExpires: {
    type: Number,
  },
});

const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);

export default User;
