import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db.js";
import cors from "cors"
import { userRouter } from "./routers/user.js";
 //configuration
dotenv.config();
const PORT=process.env.PORT;
//initalize server
const app=express()
//middleware
app.use(express.json())
app.use(cors())
//database connection
connectDB()
//initializing yhe routes
app.use("/app/user",userRouter)
//listening server
app.listen(PORT,()=>console.log(`server listening port ${PORT}`))