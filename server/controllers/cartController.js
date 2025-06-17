import User from "../models/User.js";

export const  updateCart = async(req,res)=>{
   try {
       const userId= req.userId;
        const {cartItems}= req.body;
        if(!cartItems){
            res.status(400).json({success:false,message:"Cart is Empty"});
        }
       await User.findByIdAndUpdate(userId,{cartItems})
       res.json({success: true,message:"Cart Updated"})
   } catch (error) {
       console.log(error.message)
       res.json({success:false,message:error.message})
   }
}