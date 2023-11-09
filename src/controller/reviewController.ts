import { NextFunction, Request, Response } from "express";
import Review from "../models/reviewModel";
import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  GetOneByTour,
  UpdateOne,
} from "./handler";
import { GetOneTour } from "./tourController";

const CreateReview = async (req: Request, res: Response, next: NextFunction) =>
  CreateOne(req, res, Review);

const DeleteReview = async (req: Request, res: Response, next: NextFunction) =>
  DeleteOne(req, res, Review);

const GetReview = async (req: Request, res: Response, next: NextFunction) =>
  GetOne(req, res, Review);

const GetReviewByTour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => GetOneByTour(req, res, Review);

const GetAllReviews = async (req: Request, res: Response, next: NextFunction) =>
  GetAll(req, res, Review);

const UpdateReview = async (req: Request, res: Response, next: NextFunction) =>
  UpdateOne(req, res, Review);

export {
  CreateReview,
  DeleteReview,
  GetReview,
  UpdateReview,
  GetAllReviews,
  GetReviewByTour,
};
