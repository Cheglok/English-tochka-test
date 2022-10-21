import express from "express";

import {showProducts, createOrder} from "../controllers/product.js";
import {showUserByLogin, showUserOptionsByLogin, showUserCoinsByLogin} from "../controllers/user.js";

const router = express.Router();

router.get('/products', showProducts);

router.get('/users/:login', showUserByLogin);

router.get('/users/coins/:login', showUserCoinsByLogin);

router.get('/users/options/:login', showUserOptionsByLogin);

router.post('/orders', createOrder)

export default router;