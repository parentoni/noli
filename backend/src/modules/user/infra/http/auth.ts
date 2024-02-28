import { Router } from "express";
import { userRegisterController } from "../../useCases/userRegister";
import { loginController } from "../../useCases/login";
import { sendPasswordRecoveryTokenController } from "../../useCases/sendPasswordRecoveryToken";
import { resetPasswordController } from "../../useCases/resetPassword";

const authRouter = Router();

authRouter.post("/register", (req, res) => userRegisterController.execute(req, res));
authRouter.post("/login", (req, res) => loginController.execute(req, res));
authRouter.post("/password/forget", (req, res) => sendPasswordRecoveryTokenController.execute(req, res))
authRouter.post("/password/new", (req, res) => resetPasswordController.execute(req, res))

export { authRouter };
