import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import productRouter from './router/product.router.js'
import connectDB from './config/db.js'
import userAuth from './router/userAuth.router.js'
import adminProductRoute from './router/adminRoute/AdminProductRoute.js'
import cartRoutes from './router/cart.router.js'
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

//? routes 
app.use('/api/user' , userAuth)
app.use('/api/admin' , adminProductRoute)
app.use('/api/product',productRouter)
app.use("/api/cart", cartRoutes);

//! database connection
connectDB().then(()=>{
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
})


