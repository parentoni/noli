import { CreatePasswordRecoveryTokenUseCase } from "./createPasswordRecoveryTokenUseCase";
import { userRepo} from "../../repo";
import { authService } from "../../services";

const createPasswordRecoveryTokenUseCase = new CreatePasswordRecoveryTokenUseCase(authService, userRepo)

export { createPasswordRecoveryTokenUseCase }
