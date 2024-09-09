import Product from "../models/product.models.js";
import mongoose from 'mongoose';
export const getProduct=async(req,res)=>{
    try{
       const products=await Product.find({});
       res.status(200).json({data:products});
   }
   catch(error){
       res.status(500).json({message:"server errors"});
   }
};

export const createProduct=async (req, res) => {
    const { name, price, image } = req.body;
 
    // Vérifie si tous les champs sont présents
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
 
    // Crée un nouveau produit avec les données fournies
    const newProd = new Product({
        name,
        price,
        image
    });
 
    try {
        await newProd.save(); // Sauvegarde le produit dans la base de données
        res.status(201).json({ success: true, data: newProd });
        console.log("le produit a été crée avec succés");
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
 };
 export const updateProduct= async (req, res) => {
    const { id } = req.params; // Extraire l'ID de req.params
    const data = req.body;
    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "ID is not valid" });
    }
    try {
        // Mettre à jour le produit par ID et retourner le document mis à jour
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
 };
 export const deleteProduct= async (req, res) => {
    const { id } = req.params; // Extraire l'ID
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
 };