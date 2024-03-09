import express from "express";
import { authRouter } from "../../../../modules/user/infra/http/auth";
import { userRouter } from "../../../../modules/user/infra/http/user";
import { paymentRouter } from "../../../../modules/payment/infra/http/payment";

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/user', userRouter);
v1Router.use('/payment', paymentRouter);

export { v1Router };
