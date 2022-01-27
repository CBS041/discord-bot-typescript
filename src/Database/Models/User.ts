import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    idU: { type: String, required: true }
});

export = model('users', UserSchema);