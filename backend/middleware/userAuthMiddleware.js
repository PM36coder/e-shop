import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next)=>{
const token = req.cookies.token

   
    try {
        
         if(!token){
        return res.status(401).json({message : "Invalid token, Login Again"})
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    // console.log(decode)
    req.user = decode
next()
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return res.status(401).json({ 
            message: 'Unauthorized: Invalid or expired token.' 
        })
    }

}

