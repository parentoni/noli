import express from "express";
import { authRouter } from "../../../../modules/user/infra/http/auth";

const v1Router = express.Router();

v1Router.use('/auth', authRouter);

export { v1Router };
