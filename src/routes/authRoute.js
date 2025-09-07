import express from 'express'
import { Login, Logout, me, Register,} from '../controllers/authController.js'
import { uploader } from '../../middlewares/uploaderMiddleware.js'

const upload = uploader()
const router = express.Router()

router.post('/register',upload.single('profile_image') ,Register)
router.post('/login', Login)
router.post('/logout', Logout)

// auth check/me
router.get('/me', me)


export default router