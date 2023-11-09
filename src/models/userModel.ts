import mongoose, { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcryptjs";
import crypt from "crypto";

interface ISeller extends Document {
  username: string;
  email: string;
  password: string;
  companyName?: string;
  contactNumber?: string;
  location?: string;
  tours: Array<mongoose.Types.ObjectId>;
  passwordResetOtp: string | undefined;
  passwordResetExpires: Date | undefined | number;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createPasswordResetToken(): string;
}

const sellerSchema: Schema = new Schema<ISeller>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: String,
  contactNumber: String,
  location: String,
  tours: [{ type: Schema.Types.ObjectId, ref: "Tour" }],
  passwordResetOtp: String,
  passwordResetExpires: Date,
});

sellerSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Seller: Model<ISeller> = model<ISeller>("Seller", sellerSchema);

export default Seller;
