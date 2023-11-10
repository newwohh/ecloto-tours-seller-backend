import { Request, Response } from "express";
import crypto from "crypto";
import { instance } from "../utils/razorpay";

const createOrder = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, async (err: any, order: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Something Went Wrong 2",
    });
  }
};

export { createOrder };
