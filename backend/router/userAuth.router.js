import express from 'express'
import { userRegister ,userLogin,userLogout} from '../controllers/authController.js'
// import { authMiddleware } from '../middleware/userAuthMiddleware.js'
// import { adminMiddleware } from '../middleware/adminMiddleware.js'
const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/logout', userLogout)

export default router