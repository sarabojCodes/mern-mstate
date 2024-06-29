import express from 'express'
const router =  express.Router()
import {createLisling, deleteListing, updateListing} from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verfiyUser.js'


router.post("/create",verifyToken,createLisling)
router.delete("/delete/:id",verifyToken,deleteListing)
router.post("/update/:id",verifyToken,updateListing)

export default router