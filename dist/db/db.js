"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const URL = process.env.MONGOURL || "mongodb://localhost:27017";
const db = () => {
    mongoose_1.default
        .connect(URL)
        .then(() => {
        console.log("connected to db");
    })
        .catch((err) => {
        console.log(err);
        process.exit(1);
    });
};
exports.db = db;
