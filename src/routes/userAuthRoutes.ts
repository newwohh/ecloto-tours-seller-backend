import express, { Router } from "express";
import {
  ForgotPasswordUser,
  LoginUser,
  LogoutUser,
  NewUser,
  ResetPassword,
} from "../controller/userAuthController";

const userAuthRouter: Router = express.Router();

userAuthRouter.post("/new", NewUser);
userAuthRouter.post("/login", LoginUser);
userAuthRouter.get("/logout", LogoutUser);
userAuthRouter.post("/forgotPassword", ForgotPasswordUser);
userAuthRouter.post("/resetPassword", ResetPassword);
// userAuthRouter.put("/update/:id", UpdateUser);

export default userAuthRouter;
