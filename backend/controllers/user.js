import { getUserByLogin, getUserOptionsByLogin, getUserCoinsByLogin } from "../models/userModel.js";

export const showUserByLogin = (req, res) => {
    getUserByLogin(req.params.login, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}

export const showUserOptionsByLogin = (req, res) => {
    getUserOptionsByLogin(req.params.login, (err, results) => {
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