import listingModel from "../models/listing.model.js"


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