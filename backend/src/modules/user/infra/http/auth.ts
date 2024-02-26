import { Router } from "express";
import { userRegisterController } from "../../useCases/userRegister";

const authRouter = Router();

authRouter.post("/register", (req, res) => userRegisterController.execute(req, res));

export { authRouter };
