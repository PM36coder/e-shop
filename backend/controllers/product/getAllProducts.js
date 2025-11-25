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

 const getAllProducts = async (req, res) => {
  try {
    let { page = 1, limit = 20, search = "", category } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) filter.category = category;

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    //! IMPORTANT CHECK
    if (search && products.length === 0) {
      return res.status(404).json({
        message: `No product found for "${search}"`,
      });
    }

    res.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export {getProductById ,getAllProducts}