
import User from "../models/user.model.js";

export const getUsersForSideBar =async(req,res)=>{
    try{

        const loggedInUser=req.user_id
        const filterdUsers= await User.find({_id:{$ne: loggedInUser}}).select('-password')
        res.status(200).json(filterdUsers)
    }catch(error){
        console.error("error in getusersidebars",error.message)
        res.status(500).json({error:"internal server"})
    }

}