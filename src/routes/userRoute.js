import express from 'express'
import { adduser, getAlluser } from '../controllers/userController.js'
const router = express.Router()

router.get('/getalluser', getAlluser)
router.post('/adduser', adduser)

export default router