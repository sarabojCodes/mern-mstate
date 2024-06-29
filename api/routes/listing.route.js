import express from 'express'
const router =  express.Router()
import {createLisling, deleteListing, getListingData, updateListing} from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verfiyUser.js'


router.post("/create",verifyToken,createLisling)
router.delete("/delete/:id",verifyToken,deleteListing)
router.post("/update/:id",verifyToken,updateListing)
router.get("/get/:id",verifyToken,getListingData)

export default router