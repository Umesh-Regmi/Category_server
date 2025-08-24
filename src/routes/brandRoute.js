import express from 'express'
import { createBrand, deleteBrand, getAll, getById, updateBrand } from '../controllers/brandController.js'
import { uploader } from '../../middlewares/uploaderMiddleware.js'
const router = express.Router()
const upload = uploader()

router.post('/',upload.single('brand'), createBrand)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', upload.single('brand'), updateBrand)
router.delete('/:id', deleteBrand)

export default router