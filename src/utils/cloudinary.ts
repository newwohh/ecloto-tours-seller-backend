import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPI,
  api_secret: process.env.CLOUDSECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const opts: any = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export { upload, cloudinary, opts };
