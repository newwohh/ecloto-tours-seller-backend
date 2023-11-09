import express, { Router } from "express";
import {
  CreateNewTour,
  GetAllTours,
  UpdateTour,
  DeleteTour,
  GetTour,
  GetOneTour,
  uploadTourImage,
} from "../controller/tourController";
import {
  CreateReview,
  DeleteReview,
  UpdateReview,
  GetReview,
  GetAllReviews,
} from "../controller/reviewController";
import {
  DeleteBooking,
  GetBooking,
  GetBookings,
  UpdateBooking,
} from "../controller/bookingController";

const tourRouter: Router = express.Router();

//Tours
tourRouter.post("/new", CreateNewTour);
tourRouter.get("/all", GetAllTours);
tourRouter.put("/update/:id", UpdateTour);
tourRouter.delete("/delete/:id", DeleteTour);
tourRouter.get("/get/:id", GetTour);
tourRouter.get("/getOne/:id", GetOneTour);
tourRouter.post("/uploadImage", uploadTourImage);

// Reviews
tourRouter.get("/getReview/:id", GetReview);
tourRouter.get("/getReviews", GetAllReviews);
tourRouter.get("/getReviewByTour/:id", GetReview);
tourRouter.post("/newReview", CreateReview);
tourRouter.delete("/deleteReview/:id", DeleteReview);
tourRouter.put("/updateReview/:id", UpdateReview);

// Booking
tourRouter.get("/getBookings", GetBookings);
tourRouter.get("/getBooking/:id", GetBooking);
tourRouter.put("/updateBooking", UpdateBooking);
tourRouter.delete("/deleteBooking/:id", DeleteBooking);

export default tourRouter;
