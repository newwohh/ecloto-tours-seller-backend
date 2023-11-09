import express, { Router } from "express";
import {
  ForgotPasswordSeller,
  LoginSeller,
  LogoutSeller,
  NewSeller,
  ResetPassword,
  UpdateUser,
} from "../controller/authController";

const authRouter: Router = express.Router();

authRouter.post("/new", NewSeller);
authRouter.post("/login", LoginSeller);
authRouter.get("/logout", LogoutSeller);
authRouter.post("/forgotPassword", ForgotPasswordSeller);
authRouter.post("/resetPassword", ResetPassword);
authRouter.put("/update/:id", UpdateUser);

export default authRouter;
