import { CreateStoreController } from "./createStoreController";
import { CreateStoreUseCase } from "./createStoreUseCase";

export const createStoreUseCase = new CreateStoreUseCase()
export const createStoreController = new CreateStoreController(createStoreUseCase)
