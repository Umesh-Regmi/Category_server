import express from 'express'
import { Login, Register,} from '../controllers/authController.js'
import { uploader } from '../../middlewares/uploaderMiddleware.js'

const upload = uploader()
const router = express.Router()

router.post('/register',upload.single('profile_image') ,Register)
router.get('/login', Login)

export default router