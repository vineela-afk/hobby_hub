import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: '../.env.local' });

const generateTokenAndSetCookie=(userId,res)=>{
    const token= jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
 
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,//milli seconds,
        httpOnly:true,// to prevent xss attacks crooss site scripting attacks
        sameSite:"strict",//CSRF attacks cross site foregry attacks
        secure:process.env.NODE_ENV !=="development"
    })
};
export default generateTokenAndSetCookie