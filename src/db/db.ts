import mongoose from "mongoose";
import { config } from "dotenv";

config();

const URL: string | undefined =
  process.env.MONGOURL || "mongodb://localhost:27017";

const db = () => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export { db };
