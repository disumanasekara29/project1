import Product from "../models/product.js";

export async function createProduct(req,res){
    const product=new Product(req.body)
    try{
        const response=await product.save()
        res.json({
            message:"Product Created Successfully",
            product:response
        })
    }catch(error){
        console.error("Error creating Product:",error);
        return res.status(500).json({message:"Faild to connect"})
    }
}