import listingModel from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"


export const createLisling = async(req,res,next)=>{
     try{
        console.log(req.body)
         const listing = await listingModel.create(req.body)
         return res.status(200).json(listing)
     }catch(error){
        console.log(error)
        next(error)
     }
}

export const deleteListing  = async (req,res,next)=>{
    const listing = await listingModel.findById(req.params.id)
    if(!listing){
       return next(errorHandler(401,"Listing not fount"))
    }
    console.log(req.user.id ,listing.userRef)
    if(req.user.id !== listing.userRef){
       return next(errorHandler(401,"You can delete only your own listings!"))
    }
    try{
        await listingModel.findByIdAndDelete(req.params.id)
        res.json({
         success:true,
         message:"Deleted listing successfully"
        })
    }catch(error){
       next(error)
    }
}