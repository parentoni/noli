import { GetAllStoresController } from "./getAllStoresController";
import { GetAllStoresUseCase } from "./getAllStoresUseCase";

export const getAllStoresUseCase = new GetAllStoresUseCase()
export const getAllStoresController = new GetAllStoresController(getAllStoresUseCase)

