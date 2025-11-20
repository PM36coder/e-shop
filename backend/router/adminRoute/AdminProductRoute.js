import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware.js'
import { authMiddleware } from '../../middleware/userAuthMiddleware.js'
import { upload } from '../../utils/multer.js'
import { createAdminProduct,deleteProduct } from '../../controllers/product/productController.js'

const router = express.Router()

router.post('/create-product', authMiddleware,adminMiddleware ,upload.array('files',10),createAdminProduct)

router.delete('/delete-product/:id', authMiddleware,adminMiddleware ,deleteProduct)


export default router