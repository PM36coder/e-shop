import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js'
import userAuth from './router/userAuth.router.js'
import adminProductRoute from './router/adminRoute/AdminProductRoute.js'
dotenv.config()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>{
    return res.json({message : "working"})
})

app.use('/api/user' , userAuth)
app.use('/api/admin' , adminProductRoute)
connectDB().then(()=>{
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
})


