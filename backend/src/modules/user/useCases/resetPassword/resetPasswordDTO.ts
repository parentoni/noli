/**
 * 
 * @class ResetPasswordDTO
 * @classdesc data transfer object for reset password use case
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export type ResetPasswordDTO = {
  password: string,
  token: string
}
