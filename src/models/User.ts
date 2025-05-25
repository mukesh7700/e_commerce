import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    username: string;
    password?: string;
    email: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<User>({
    username: {type: String, required:[ true, "Username is Required"], unique: true, trim: true},
    password: {type: String, required:[ false, "Password is Required"]},
    email: {type: String, required:[ true, "Email is Required"], unique: true,match:[/.+\@.+\..+/, "Please enter a valid email"]},
    image: { type: String },
}, {
    timestamps: true,
});

const UserModel =(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;