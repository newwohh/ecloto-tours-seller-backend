"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
const db_1 = require("./db/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.db)();
//Routes
app.use("/eclototours/sellerapi/v1/seller", authRoutes_1.default);
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
};
app.use(errorHandler);
const port = Number(process.env.PORT) || 8000;
const server = app.listen(port, () => {
    console.log("listening on port " + port);
});
