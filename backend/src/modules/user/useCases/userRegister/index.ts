import { UserRegisterUseCase } from './userRegisterUseCase';
import { userRepo } from '../../repo';
import { authService } from '../../services';
import { UserRegisterController } from './userRegisterController';

const userRegisterUseCase = new UserRegisterUseCase(userRepo, authService);
const userRegisterController = new UserRegisterController(userRegisterUseCase);

export { userRegisterUseCase, userRegisterController };
