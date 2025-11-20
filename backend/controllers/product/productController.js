import { Product } from "../../models/product.model.js";
import { uploadToImageKit } from "../../utils/uploadFileImageKit.js";

const createAdminProduct = async(req,res)=>{
    try {
        const {name,description,price,category,stock} = req.body

        if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields required" });
    }
    //!get files from frontend
    const {image} = req.files

    let images = []
    if(files || files.length>0){
        for (const file of image) {
            const upload = await uploadToImageKit(file)
            images.push(upload)
        }
    }

    const product = await Product.create({
        name,
        description,
        price: Number(price),
        stock: Number(stock) || 0,
        category,
        image: images || "",
        createdBy : req.user.id
    })

     res.status(201).json({ message: "Product created", product });

    } catch (error) {
        console.log("Error:", error);
    res.status(500).json({ message: "Server error" })
    }
}


export {createAdminProduct}