import { NextFunction, Request, Response } from "express";
import Seller from "../models/userModel";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { sendEmail } from "../utils/sendEmail";
import { UpdateOne } from "./handler";

config();

const secretKey: string | undefined = process.env.JWT_SECRET;

const signToken = (id: string) => {
  if (secretKey) {
    return jwt.sign({ id }, secretKey, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  }
};

const NewSeller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, companyName, contactNumber, location } =
      req.body as {
        username: string;
        email: string;
        password: string;
        companyName?: string;
        contactNumber?: number;
        location?: string;
      };

    if (!username || !email || !password) {
      return res.status(400).send("All input is required");
    }

    const CreateNewSeller = await Seller.create({
      username,
      email,
      password,
      companyName,
      contactNumber,
      location,
    });

    if (CreateNewSeller) {
      const token = signToken(CreateNewSeller._id);
      return res.status(201).json({
        status: "success",
        token,
        data: CreateNewSeller,
      });
    } else {
      return res.status(500).send("Something went wrong");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
};

const LoginSeller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return res.status(400).send("All input is required");
    }

    const loginSeller = await Seller.findOne({ email });

    if (!loginSeller) {
      return res.status(400).send("Seller not found");
      next();
      return;
    }

    if (password !== loginSeller.password) {
      return res.status(400).send("Invalid Credentials");
    }

    if (!loginSeller) {
      return res.status(400).send("Invalid Credentials");
    }

    const token: string | undefined = signToken(loginSeller._id);
    return res.status(200).json({
      status: "success",
      token,
      data: loginSeller,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      console.log(error.message);
    }
  }
};

const LogoutSeller = (req: Request, res: Response) => {
  res.status(200).json({ status: "success" });
};

const ForgotPasswordSeller = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as {
      email: string;
    };

    const seller = await Seller.findOne({ email: email });

    if (!seller) {
      return res.status(400).send("Invalid Credentials");
    }

    const resetOtp: string = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    seller.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    seller.passwordResetOtp = resetOtp;

    await seller.save();

    const resetURL: string = `Please type the Otp ${resetOtp} in the following URL to reset your password:  http://localhost:5173/resetPassword`;
    await sendEmail(
      email,
      `Password Reset Token`,
      `Please use the following URL to reset your password: \n\n ${resetURL}`,
      res
    );
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
};

const ResetPassword = async (req: Request, res: Response) => {
  try {
    const SellerUpdatePassword = await Seller.findOne({
      passwordResetOtp: req.body.otp,
    });

    if (SellerUpdatePassword?.passwordResetOtp === req.body.otp) {
      const updatePassword = await Seller.findOneAndUpdate(
        { passwordResetOtp: req.body.otp },
        {
          password: req.body.password,
          passwordResetOtp: undefined,
          passwordResetExpires: undefined,
        }
      );

      return res.status(200).json({
        status: "success",
        data: updatePassword,
      });
    }

    if (!SellerUpdatePassword) {
      return res.status(400).send("Token is invalid or has expired");
    }

    SellerUpdatePassword.password = req.body.password;
    SellerUpdatePassword.passwordResetOtp = undefined;
    SellerUpdatePassword.passwordResetExpires = undefined;
    await SellerUpdatePassword.save();

    const token = signToken(SellerUpdatePassword._id);

    res.status(200).json({
      status: "success",
      token,
      data: SellerUpdatePassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
};

const UpdateUser = (req: Request, res: Response) => UpdateOne(req, res, Seller);

export {
  NewSeller,
  LoginSeller,
  LogoutSeller,
  ForgotPasswordSeller,
  ResetPassword,
  UpdateUser,
};
