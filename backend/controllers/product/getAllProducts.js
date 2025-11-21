import { Product } from "../../models/product.model.js"; 

const getProductById = async(req,res)=>{
    try {
        const {id}= req.params

        const product = await Product.findById(id)
        if(!product) return res.status(404).json({message:"Product not found"})

            res.status(200).json({message:"Product fetched" , product})

    } catch (error) {
            res.status(500).json({ message: "Server error" });
    }
}
//!get product by Search and filter

const getAllProducts = async(req,res)=>{
    try {
        
    } catch (error) {
           res.status(500).json({ message: "Server error" ,error});
    }
}

export {getProductById}