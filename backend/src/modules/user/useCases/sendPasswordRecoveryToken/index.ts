import { SendPasswordRecoveryTokenUseCase } from "./sendPasswordRecoveryTokenUseCase";
import { SendPasswordRecoveryTokenController } from "./sendPasswordRecoveryTokenController";
import { createPasswordRecoveryTokenUseCase } from "../createPasswordRecoverytoken";

const sendPasswordRecoveryTokenUseCase = new SendPasswordRecoveryTokenUseCase(createPasswordRecoveryTokenUseCase)
const sendPasswordRecoveryTokenController = new SendPasswordRecoveryTokenController(sendPasswordRecoveryTokenUseCase)

export { sendPasswordRecoveryTokenUseCase, sendPasswordRecoveryTokenController }
