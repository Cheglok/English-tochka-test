// import express
import express from "express";

// import function from controller
import {showProducts, showProductById, createOrder} from "../controllers/product.js";
import {showUsers, showUserByLogin, showUserCoinsByLogin} from "../controllers/user.js";

// init express router
const router = express.Router();

// Get All Product
router.get('/products', showProducts);

// Get Single Product
router.get('/products/:id', showProductById);

// Get All Users
router.get('/users', showUsers);

// Get Single User
router.get('/users/:login', showUserByLogin);

router.get('/users/coins/:login', showUserCoinsByLogin);

router.post('/orders', createOrder)

export default router;