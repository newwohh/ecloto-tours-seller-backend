import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./db/db";
import authRouter from "./routes/authRoutes";
import tourRouter from "./routes/tourRoutes";
import cors from "cors";

config();

const app: Application = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );

//   next();
// });

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   const origin = req.headers.origin;

//   if (origin) {
//     res.setHeader("Access-Control-Allow-Origin", "*"); // Set to * to allow requests from any origin.
//   } else {
//     res.setHeader("Access-Control-Allow-Origin", "http://yourdomain.com"); // Set to a specific domain or '*' for any origin
//   }

//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, PUT, POST, DELETE, UPDATE, OPTIONS"
//   );

//   next();
// });

app.use(cors());

//Routes
app.use("/eclototours/sellerapi/v1/seller", authRouter);
app.use("/eclototours/sellerapi/v1/tour", tourRouter);

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

// app.use(errorHandler);

const port: Number = Number(process.env.PORT) || 8000;
const test = "tests";

const server: Server = app.listen(port, () => {
  console.log("listening on port " + port);
});
