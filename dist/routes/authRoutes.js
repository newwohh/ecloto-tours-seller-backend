"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const authRouter = express_1.default.Router();
authRouter.post("/new", authController_1.NewSeller);
authRouter.post("/login", authController_1.LoginSeller);
authRouter.get("/logout", authController_1.LogoutSeller);
exports.default = authRouter;
