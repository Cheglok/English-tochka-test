// Import function from Product Model
import {getProducts, getProductById, insertOrder} from "../models/productModel.js";

// Get All Products
export const showProducts = (req, res) => {
    getProducts((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Single Product
export const showProductById = (req, res) => {
    getProductById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Order
export const createOrder = (req, res) => {
    const data = req.body;
    insertOrder(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}