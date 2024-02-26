import { Router } from "express";
import { userRegisterController } from "../../useCases/userRegister";
import { loginController } from "../../useCases/login";

const authRouter = Router();

authRouter.post("/register", (req, res) => userRegisterController.execute(req, res));
authRouter.post("/login", (req, res) => loginController.execute(req, res));

export { authRouter };
