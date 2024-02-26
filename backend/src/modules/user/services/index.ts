import { Secrets } from "../../../config/secretsManager";
import { JWTAuth } from "./JWTAuth"; 

const authService = new JWTAuth(Secrets.getSecret("PRIVATE_KEY"));

export { authService };
