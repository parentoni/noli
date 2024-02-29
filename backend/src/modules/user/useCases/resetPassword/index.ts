import { ResetPasswordController } from "./resetPasswordController";
import { ResetPasswordUseCase } from "./resetPasswordUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repo";

const resetPasswordUseCase = new ResetPasswordUseCase(authService, userRepo)
const resetPasswordController = new ResetPasswordController(resetPasswordUseCase)

export { resetPasswordUseCase, resetPasswordController }
