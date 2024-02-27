import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetUserByTokenUseCase } from "./getUserByTokenUseCase";
import { AuthenticatedRequest } from "../../../../shared/infra/http/utils/Middleware";
import { UserMapper } from "../../mappers/userMapper";
import { Response } from "express";

/**
 * 
 * @class GetUserByTokenController
 * @classdesc Class to define the get user by token controller. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class GetUserByTokenController extends BaseController<AuthenticatedRequest> {
  constructor() {
    super();
  }

  /**
   * Get the user defined by middleware.
   * @param {AuthenticatedRequest} req 
   * @param {Response} res 
   * @returns {} 
   *
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  async executeImpl(req: AuthenticatedRequest, res: Response): Promise<any> {
    return this.ok(res, await UserMapper.toPersistent(req.user));
  }
} 
