import { Middleware } from "./Middleware"; 
import { getUserByTokenUseCase } from "../../../../modules/user/useCases/getUserByToken";

const middleware = new Middleware(getUserByTokenUseCase);

export { middleware }
