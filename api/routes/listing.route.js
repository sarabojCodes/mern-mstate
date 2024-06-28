import express from 'express'
const router =  express.Router()
import {createLisling} from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verfiyUser.js'


router.post("/create",verifyToken,createLisling)

export default router