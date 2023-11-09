import { Request, Response } from "express";
import TourBooking from "../models/bookingModel";
import { DeleteOne, GetAll, GetOne, UpdateOne } from "./handler";

const GetBookings = async (req: Request, res: Response) =>
  GetAll(req, res, TourBooking);

const GetBooking = async (req: Request, res: Response) =>
  GetOne(req, res, TourBooking);

const UpdateBooking = async (req: Request, res: Response) =>
  UpdateOne(req, res, TourBooking);

const DeleteBooking = async (req: Request, res: Response) =>
  DeleteOne(req, res, TourBooking);

export { GetBookings, GetBooking, UpdateBooking, DeleteBooking };
