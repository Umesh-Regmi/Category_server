import express from 'express'
import { authenticate } from '../../middlewares/authMiddleware.js'
import { deleteUser, getAlluser, update_profile, userById } from '../controllers/userController.js'
const router = express.Router()

router.get('/getalluser', getAlluser)
router.get('/userid/:id',userById)
router.delete('/deleteuser/:id', deleteUser)
router.put('/profile', authenticate(), update_profile)

export default router
