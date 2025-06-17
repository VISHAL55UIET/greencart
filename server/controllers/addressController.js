// add addressexport const 

import Address from "../models/address.js"


export const addAddress = async(req,res)=>{
           try {
               const userId = req.userId;
               const {address} = req.body;
               await Address.create({...address,userId})
               res.json({success:true,message:"Address added successfully"})
           } catch (error) {
                console.log(error.message)
                res.json({success:false,message:error.message});
           }
}


export const getAddress = async(req,res)=>{
    try {
         const userId= req.userId;
         const addresses = await Address.find({userId})
         if(addresses.length>0){
              res.json({success:true,addresses})   
         } else{
 res.json({success:false,message:"Please an Address first"})   
         }
       
    } catch (error) {
         console.log(error.message)
         res.json({success:false,message:error.message});
    }
} 
