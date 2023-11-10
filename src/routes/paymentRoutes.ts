import express, { Request, Response } from "express";
import crypto from "crypto";
import { createOrder } from "../controller/paymentController";

const paymentRouter = express.Router();

paymentRouter.post("/book", createOrder);
paymentRouter.post("/verify", (req: Request, res: Response) => {
  console.log(req.body);
  const { orderCreationId, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSign = crypto.createHmac("sha256", "Pc1D3Fzc9uunGwCSOFraEibE");
  expectedSign.update(`${orderCreationId}|${razorpay_payment_id}`);

  if (razorpay_signature === expectedSign) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(400).json({ message: "failed" });
  }
});

export default paymentRouter;
