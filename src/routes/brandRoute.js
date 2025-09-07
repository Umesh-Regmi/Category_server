import express from 'express'
import { createBrand, deleteBrand, getAll, getById, updateBrand } from '../controllers/brandController.js'
import { uploader } from '../../middlewares/uploaderMiddleware.js'
import { authenticate } from '../../middlewares/authMiddleware.js'
import { Role } from '../config/constants.js'
const router = express.Router()
const upload = uploader()

router.post('/',authenticate([Role.ADMIN]), upload.single('logo'), createBrand)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id',authenticate([Role.ADMIN]), upload.single('logo'), updateBrand)
router.delete('/:id',authenticate([Role.ADMIN]), deleteBrand)

export default router