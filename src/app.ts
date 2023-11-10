import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./db/db";
import authRouter from "./routes/authRoutes";
import tourRouter from "./routes/tourRoutes";
import cors from "cors";
import userAuthRouter from "./routes/userAuthRoutes";
import paymentRouter from "./routes/paymentRoutes";

config();

const app: Application = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db();

app.use(cors());

//Routes
app.use("/eclototours/sellerapi/v1/seller", authRouter);
app.use("/eclototours/sellerapi/v1/tour", tourRouter);
app.use("/eclototours/sellerapi/v1/user", userAuthRouter);
app.use("/eclototours/sellerapi/v1/payment", paymentRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

app.use(errorHandler);

const port: Number = Number(process.env.PORT) || 8000;
const test = "tests";

const server: Server = app.listen(port, () => {
  console.log("listening on port " + port);
});
