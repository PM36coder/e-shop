import express from 'express'
import { userRegister ,userLogin,adminData} from '../controllers/authController.js'
// import { authMiddleware } from '../middleware/userAuthMiddleware.js'
// import { adminMiddleware } from '../middleware/adminMiddleware.js'
const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
// router.get('/me',authMiddleware ,adminData)

export default router