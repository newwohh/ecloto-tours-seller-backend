import { NextFunction, Request, Response } from "express";
import Tour from "../models/tourModel";
import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  UpdateOne,
  UploadImage,
  returnError,
} from "./handler";
import { UploadApiResponse } from "cloudinary";
import { cloudinary, opts } from "../utils/cloudinary";

const CreateNewTour = async (req: Request, res: Response, next: NextFunction) =>
  CreateOne(req, res, Tour);

const GetAllTours = async (req: Request, res: Response, next: NextFunction) =>
  GetAll(req, res, Tour);

const DeleteTour = async (req: Request, res: Response, next: NextFunction) =>
  DeleteOne(req, res, Tour);

const GetTour = async (req: Request, res: Response, next: NextFunction) =>
  GetOne(req, res, Tour);

const GetOneTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    if (error instanceof Error) {
      returnError(res, error);
    }
  }
};

const UpdateTour = async (req: Request, res: Response, next: NextFunction) =>
  UpdateOne(req, res, Tour);

const uploadTourImage = async (req: Request, res: Response) => {
  try {
    const _id = req.body.user;

    if (!_id) {
      return res.status(400).json({ error: "Missing required data." });
    }

    const uploadImage = async (image: any) => {
      const upload = await cloudinary.uploader.upload(
        image,
        opts,
        (error, result) => {
          if (result && result.secure_url) {
            console.log(result);
            return result.secure_url;
          }
          if (error) {
            console.log(error);
          }
        }
      );
      return upload;
    };

    const img = await uploadImage(req.body.image);
    const updateProfilePicUrl = await Tour.findByIdAndUpdate(_id, {
      $push: { images: img.secure_url },
    });

    if (updateProfilePicUrl) {
      return res.status(200).json({
        status: "success",
        img: img.secure_url,
        user: updateProfilePicUrl,
      });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
};

export {
  CreateNewTour,
  GetAllTours,
  DeleteTour,
  GetTour,
  UpdateTour,
  uploadTourImage,
  GetOneTour,
};
