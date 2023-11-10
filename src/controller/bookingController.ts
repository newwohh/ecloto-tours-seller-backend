import { Request, Response } from "express";
import TourBooking from "../models/bookingModel";
import {
  CreateOne,
  DeleteOne,
  GetAll,
  GetOne,
  GetOneByid,
  UpdateOne,
} from "./handler";

const GetBookings = async (req: Request, res: Response) =>
  GetAll(req, res, TourBooking);

const GetBooking = async (req: Request, res: Response) =>
  GetOneByid(req, res, TourBooking);

const UpdateBooking = async (req: Request, res: Response) =>
  UpdateOne(req, res, TourBooking);

const DeleteBooking = async (req: Request, res: Response) =>
  DeleteOne(req, res, TourBooking);

const CreateBooking = async (req: Request, res: Response) =>
  CreateOne(req, res, TourBooking);

export { GetBookings, GetBooking, UpdateBooking, DeleteBooking, CreateBooking };
