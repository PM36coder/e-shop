import { User } from "../models/user.model.js"; 
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
const userRegister = async(req,res)=>{
    const {name, email, password} = req.body
    try {
         if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existUser = await User.findOne({email})
    if(existUser){
        return res.status(400).json({message:"Email already exists"})
    }

    const hashPassword = await bcrypt.hash(password, 10) 
 
    const user = await User.create({
        name,
        email, 
        password : hashPassword
    })

user.password = undefined
    //!token create
    const token = jwt.sign(
        {id: user._id , role: user.role}, 
        process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    //?cookies
     res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(201).json({message: 'User Created ' , user,token})

    } catch (error) {
        console.log(error , 'register')
        res.status(500).json({message:"Server side error"})
    }
}



export {userRegister}