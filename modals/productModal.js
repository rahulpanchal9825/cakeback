import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    flavor:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    urlImage:{type:String,required:true},
})

export const Product = mongoose.model("Product",productSchema)
