import mongoose from "mongoose";
import { USER_ROLES } from "../../../../modules/user/domain/userProps/userRole";

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  role: {type: Number, enum: USER_ROLES, required:true}
})

const UserModel = mongoose.model<IUser>("User", UserSchema);

export { UserModel };
