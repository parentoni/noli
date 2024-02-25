import mongoose from "mongoose";

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
})

const UserModal = mongoose.model<IUser>("User", UserSchema);

export { UserModal };
