import express from "express";
import { authRouter } from "../../../../modules/user/infra/http/auth";
import { userRouter } from "../../../../modules/user/infra/http/user";

const v1Router = express.Router();

v1Router.use('/auth', authRouter);
v1Router.use('/user', userRouter);

export { v1Router };
