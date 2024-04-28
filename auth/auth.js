import jwt from "jsonwebtoken"
export function generateToken(id){
    return jwt.sign({id},process.env.SECRET_KEY)
}
//middleware 

export const isAuthenticated=async(req,res,next)=>{
    let token;
    if(req.headers){
        try {
             token=await req.headers["x-auth-token"]
           const decode= jwt.verify(token,process.env.SECRET_KEY)
           req.user=decode.id;
           next();
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Athorization denied"})  
        }
    }
    if(!token){
        console.log(!token)
        res.status(404).json({error:"access denied"})
    }
    
}