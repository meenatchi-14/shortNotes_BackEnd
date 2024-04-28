import { Notes } from "../Models/note.js";

export function getAllNotes(){
    return Notes.find().populate("user","name");
}
export function getUserNotes(req){
    return Notes.find({user:req.user._id}).populate("user","name email");
}

export function addNewNotes(req){
   return new Notes({
    ...req.body,
    user:req.user,
   }).save();
}

export function editNotes(req){
    return Notes.findOneAndUpdate(
        {_id:req.params.id},
        {$set:req.body},
        {new:true}

    ).save()
}

export function deleteNote(req){
    return Notes.findByIdAndDelete(
        {_id:req.params.id}
    )
}