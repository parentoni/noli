import express from "express";
import { authRouter } from "../../../../modules/user/infra/http/auth";
import { userRouter } from "../../../../modules/user/infra/http/user";
import { paymentRouter } from "../../../../modules/payment/infra/http/payment";
import bodyParser from "body-parser";
import { storeRouter } from "../../../../modules/store/infra/http/store";

const v1Router = express.Router();

v1Router.use('/auth', bodyParser.json({}), authRouter);
v1Router.use('/user', bodyParser.json({}), userRouter);
v1Router.use('/payment', paymentRouter);
v1Router.use('/store', bodyParser.json({}), storeRouter)
export { v1Router };
