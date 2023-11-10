import { UploadApiResponse } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { cloudinary } from "../utils/cloudinary";

export const returnError = (res: Response, error: Error) => {
  if (error instanceof Error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const CreateOne = async (req: Request, res: Response, Model: Model<any>) => {
  try {
    const data = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error: Error | any) {
    returnError(res, error);
  }
};

const GetAll = async (req: Request, res: Response, Model: Model<any>) => {
  try {
    const data = await Model.find();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error: Error | any) {
    returnError(res, error);
  }
};

const GetOneByTour = async (req: Request, res: Response, Model: Model<any>) => {
  try {
    const data = await Model.find({ tour: req.params.id });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error: Error | any) {
    returnError(res, error);
  }
};

const GetOne = async (req: Request, res: Response, Model: Model<any>) => {
  try {
    const data = await Model.find({ seller: req.params.id }).exec();

    console.log(data);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error: Error | any) {
    returnError(res, error);
  }
};
const GetOneByid = async (req: Request, res: Response, Model: Model<any>) => {
  try {
    const id = req.params.id;
    const data = await Model.find({ _id: id }).populate("tour");

    console.log(data);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error: Error | any) {
    returnError(res, error);
  }
};

const UpdateOne = async (req: Request, res: Response, Model: Model<any>) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error: Error | any) {
    returnError(res, error);
  }
};

const DeleteOne = async (req: Request, res: Response, Model: Model<any>) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error: Error | any) {
    returnError(res, error);
  }
};

const UploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result: UploadApiResponse = await cloudinary.uploader.upload(
      req.body.image,
      {
        resource_type: "auto",
      }
    );

    console.log(result);
  } catch (error: Error | any) {
    returnError(res, error);
  }
};

export {
  CreateOne,
  GetAll,
  GetOne,
  UpdateOne,
  DeleteOne,
  UploadImage,
  GetOneByTour,
  GetOneByid,
};
