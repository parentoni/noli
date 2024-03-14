import { Router } from "express";
import { middleware } from "../../../../shared/infra/http/utils";
import { Middleware } from "../../../../shared/infra/http/utils/Middleware";
import { createStoreController } from "../../useCases/createStoreUseCase";

const storeRouter = Router()

storeRouter.post("/create", middleware.checkAdmin(), (req, res) => createStoreController.execute(req, res))

export {storeRouter}