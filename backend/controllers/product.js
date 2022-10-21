import { getProducts, insertOrder } from "../models/productModel.js";

export const showProducts = (req, res) => {
    getProducts((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

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