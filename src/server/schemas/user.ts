import {Document, Model, model, Schema} from "mongoose";

export interface IUser extends Document {
    createdAt: Date;
    email: string;
    username: string;
    password: string;
}

export const USER: Model<IUser> = model<IUser>("user", new Schema({
    createdAt: {type: Date, required: false},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
}));