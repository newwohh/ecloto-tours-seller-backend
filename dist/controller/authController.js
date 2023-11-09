"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutSeller = exports.LoginSeller = exports.NewSeller = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const secretKey = process.env.JWT_SECRET;
const signToken = (id) => {
    if (secretKey) {
        return jsonwebtoken_1.default.sign({ id }, secretKey, {
            expiresIn: process.env.JWT_EXPIRES,
        });
    }
};
const NewSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, companyName, contactNumber, location } = req.body;
        if (!username || !email || !password) {
            res.status(400).send("All input is required");
        }
        const CreateNewSeller = yield userModel_1.default.create({
            username,
            email,
            password,
            companyName,
            contactNumber,
            location,
        });
        if (CreateNewSeller) {
            const token = signToken(CreateNewSeller._id);
            res.status(201).json({
                status: "success",
                token,
                data: CreateNewSeller,
            });
        }
        else {
            res.status(500).send("Something went wrong");
            next();
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
            console.log(error.message);
        }
    }
});
exports.NewSeller = NewSeller;
const LoginSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("All input is required");
        }
        const loginSeller = yield userModel_1.default.findOne({ email });
        if (!loginSeller) {
            res.status(400).send("Seller not found");
            return;
        }
        const correctPassword = yield loginSeller.correctPassword(password, loginSeller.password);
        if (!loginSeller || !correctPassword) {
            return res.status(400).send("Invalid Credentials");
        }
        const token = signToken(loginSeller._id);
        res.status(200).json({
            status: "success",
            token,
            data: loginSeller,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
            console.log(error.message);
        }
    }
});
exports.LoginSeller = LoginSeller;
const LogoutSeller = (req, res) => {
    res.status(200).json({ status: "success" });
};
exports.LogoutSeller = LogoutSeller;
