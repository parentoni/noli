import { GetUserByTokenUseCase } from "./getUserByTokenUseCase";
import { GetUserByTokenController } from "./getUserByTokenController";
import { authService } from "../../services";
import { userRepo } from "../../repo";

const getUserByTokenUseCase = new GetUserByTokenUseCase(authService, userRepo);
const getUserByTokenController = new GetUserByTokenController();

export { getUserByTokenUseCase, getUserByTokenController };
