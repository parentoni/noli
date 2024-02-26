import { LoginUseCase} from "./loginUseCase";
import { LoginController } from "./loginController";
import { userRepo} from "../../repo";
import { authService } from "../../services";

const loginUseCase = new LoginUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
