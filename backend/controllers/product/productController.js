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
    if(files && files.length>0){
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

    if(product.createdBy.toString() !== req.user.id && req.user.role !== "admin"){
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


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, category, stock } = req.body;


    //!check admin 
    if(product.createdBy.toString() !== req.user.id && req.user.role !== "admin"){
        return res.status(404).json({message:"Only admin can update"})
    }


    //! Update basic fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = Number(price.replace(/,/g, "")) || 0;
    if (category) product.category = category;
    if (stock) product.stock = Number(stock) || 0;

    //! Handle new images/videos
    const files = req.files;

    if (files && files.length > 0) {
      
      //! Delete old images from ImageKit
      if (product.images && product.images.length > 0) {
        for (const img of product.images) {
          await deleteFromImageKit(img.public_id);
        }
      }

      // ❗Upload new images
      const newImages = [];
      for (const file of files) {
        const uploaded = await uploadToImageKit(file);
        newImages.push(uploaded);
      }

      product.images = newImages;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    console.log("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {createAdminProduct,deleteProduct,updateProduct}