import { Product } from "../../models/product.model.js";
import { uploadToImageKit } from "../../utils/uploadFileImageKit.js";
import { deleteFromImageKit } from "../../utils/deleteFromImageKit.js";

const createAdminProduct = async(req,res)=>{
    try {
        const {name,description,price,category,stock} = req.body

        if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields required" });
    }
    //!get files from frontend
    const files = req.files
console.log("FILES RECEIVED:", req.files);
    let images = []
    if(files || files.length>0){
        for (const file of files) {
            const upload = await uploadToImageKit(file)
            images.push(upload)
        }
    }

    const product = await Product.create({
        name,
        description,
        price: Number(price.replace(/,/g, "")) || 0,
        stock: Number(stock) || 0,
        category,
        images: images || "",
        createdBy : req.user.id
    })

     res.status(201).json({ message: "Product created", product });

    } catch (error) {
        console.log("Error:", error);
    res.status(500).json({ message: "Server error" })
    }
}

const deleteProduct = async(req,res)=>{
try {
    const {id} = req.params
    //! found the product in db

    const product = await Product.findById(id)
    if(!product){
        return res.status(404).json({message: 'Product not found'})
    }

    if(product.createdBy.toString() !== req.user && req.user.role !== "admin"){
        return res.status(403).json({message:"You can't delete this product"})
    }

// !🗑 Delete images from ImageKit
    if (product.images && product.images.length > 0) {
      for (let img of product.images) {
        await deleteFromImageKit(img.public_id);
      }
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });

} catch (error) {
     console.log("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
}
}

export {createAdminProduct,deleteProduct}