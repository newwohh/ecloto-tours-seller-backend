import { NextFunction, Request, Response } from "express";
import User from "../models/clientModel";
import { signToken } from "./authController";
import { sendEmail } from "../utils/sendEmail";

const NewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    if (!username || !email || !password) {
      return res.status(400).send("All input is required");
    }

    const CreateNewUser = await User.create({
      username,
      email,
      password,
    });

    if (CreateNewUser) {
      const token = signToken(CreateNewUser._id);
      return res.status(201).json({
        status: "success",
        token,
        data: CreateNewUser,
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

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return res.status(400).send("All input is required");
    }

    const loginUser = await User.findOne({ email });

    if (!loginUser) {
      return res.status(400).send("User not found");
      next();
      return;
    }

    if (password !== loginUser.password) {
      return res.status(400).send("Invalid Credentials");
    }

    if (!loginUser) {
      return res.status(400).send("Invalid Credentials");
    }

    const token: string | undefined = signToken(loginUser._id);
    return res.status(200).json({
      status: "success",
      token,
      data: loginUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      console.log(error.message);
    }
  }
};

const LogoutUser = (req: Request, res: Response) => {
  res.status(200).json({ status: "success" });
};

const ForgotPasswordUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as {
      email: string;
    };

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    const resetOtp: string = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetOtp = resetOtp;

    await user.save();

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
    const UserUpdatePassword = await User.findOne({
      passwordResetOtp: req.body.otp,
    });

    if (UserUpdatePassword?.passwordResetOtp === req.body.otp) {
      const updatePassword = await User.findOneAndUpdate(
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

    if (!UserUpdatePassword) {
      return res.status(400).send("Token is invalid or has expired");
    }

    UserUpdatePassword.password = req.body.password;
    UserUpdatePassword.passwordResetOtp = undefined;
    UserUpdatePassword.passwordResetExpires = undefined;
    await UserUpdatePassword.save();

    const token = signToken(UserUpdatePassword._id);

    res.status(200).json({
      status: "success",
      token,
      data: UserUpdatePassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  }
};

export { NewUser, LoginUser, LogoutUser, ForgotPasswordUser, ResetPassword };
