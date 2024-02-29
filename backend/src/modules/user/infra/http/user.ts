import { Router } from "express";
import { middleware } from "../../../../shared/infra/http/utils";
import { getUserByTokenController } from "../../useCases/getUserByToken";

const userRouter = Router();

userRouter.get("/me", middleware.autheticated(), (req, res) => getUserByTokenController.execute(req, res));

export { userRouter };
