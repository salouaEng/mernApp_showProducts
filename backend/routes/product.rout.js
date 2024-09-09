import express from "express";
import { createProduct, deleteProduct, getProduct,updateProduct } from "../controllers/product.controller.js";

const router =express.Router();

//get all products
router.get("/",getProduct);
// save a product 
router.post("/",createProduct);
//update a product
router.put("/:id",updateProduct);
// delete product
router.delete("/:id",deleteProduct);

export default router;