import express from "express"
import { addNewNotes, deleteNote, editNotes, getAllNotes, getUserNotes } from "../controllers/note.js";

const router=express.Router();
//get all notes 
router.get("/all",async(req,res)=>{
    try {
        const notes=await getAllNotes();
        if(notes.length<=0){
            return res.status(404).json({error:"not content avaiable"});
        }
        res.status(201).json({data:notes})

    } catch (error) {
        res.status(500).json({error:"interal server error"})
    }
})

//get user notes
router.get("/user/all",async(req,res)=>{
    try {
        const notes=await getUserNotes(req);
        if(notes.length<=0){
            return res.status(400).json({error:"not content avaiable"});
        }
        res.status(201).json({data:notes})

    } catch (error) {
        res.status(500).json({error:"interal server error"})
    }
})

//add new notes
router.post("/add",async(req,res)=>{
    try {
        const newNotes= await addNewNotes(req);
        if(!newNotes){
            
          return res.status(400).json({error:"error adding new note"})
        }
        return res.status(200).json({data:newNotes,message:"added successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"interal server error"})
    }
})

//edit a note
router.put("/edit/:id",async(req,res)=>{
    try {
        const editedNote=await editNotes(req);
        if(!editedNote){ 
            return res.status(400).json({error:"error updating new note"})
          }
          return res.status(200).json({data:editedNote,message:"updated successfully"})
        
    } catch (error) {
        res.status(500).json({error:"interal server error"})
    }
})

//delete a note
router.delete("/delete/:id",async(req,res)=>{
    try {
        const deletedNote=await deleteNote(req);
        if(!deletedNote){ 
            return res.status(400).json({error:"error deleting new note"})
          }
          return res.status(200).json({
            message:"Deleted successfully"})
        
        
    } catch (error) {
        res.status(500).json({error:"interal server error"})
    }
})

export const notesRouter= router;