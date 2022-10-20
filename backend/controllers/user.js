// Import function from User Model
import { getUsers, getUserByLogin, getUserCoinsByLogin } from "../models/userModel.js";

// Get All Users
export const showUsers = (req, res) => {
    getUsers((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Single User
export const showUserByLogin = (req, res) => {
    getUserByLogin(req.params.login, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showUserCoinsByLogin = (req, res) => {
    getUserCoinsByLogin(req.params.login, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}