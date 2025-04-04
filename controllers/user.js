import { User } from "../Models/user.js";

export function getUserByEmail(req){
    return User.findOne({
        email:req.body.email,
    });
}