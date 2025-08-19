import express from 'express'
import { Login, Register,} from '../controllers/authController.js'
import { uploader } from '../../middlewares/uploaderMiddleware.js'

const upload = uploader()
const router = express.Router()


const loginMid = (req, res, next) => {
    console.log("Loging route")
    next()
}
router.post('/register',upload.single('profile_image') ,Register)
router.get('/login', Login)

export default router