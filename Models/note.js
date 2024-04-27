import { ObjectId } from "bson"
import mongoose from "mongoose"

const noteSchema= new mongoose.Schema({
    ropic:{
        type:String,
        required:true,    
    },
    content:{
        type:String,
        required:true,
    },
    user:{
        type:ObjectId,
        ref:"user",
    }
});
const Notes= mongoose.model("notes",noteSchema)
export {Notes}