// import connection
import db from "../config/database.js";

// Get All Users
export const getUsers = (result) => {
    db.query("SELECT users.id AS user_id, product_id, description, price, login, name, coins_count FROM orders_users\n" +
        "JOIN products ON orders_users.product_id = products.id\n" +
        "RIGHT JOIN users ON orders_users.user_id = users.id\n" +
        "RIGHT JOIN (SELECT user_id, SUM(price) AS coins_count FROM \n" +
        "(SELECT DISTINCT user_id, price, action FROM english_tochka.coins) AS unique_actions\n" +
        "GROUP BY user_id) AS user_coins ON users.id = user_coins.user_id;", (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getUserByLogin = (login, result) => {
    db.query("SELECT users.id AS user_id, product_id, description, price, login, name, coins_count FROM orders_users\n" +
        "JOIN products ON orders_users.product_id = products.id\n" +
        "JOIN users ON orders_users.user_id = users.id\n" +
        "JOIN (SELECT user_id, SUM(price) AS coins_count FROM \n" +
        "(SELECT DISTINCT user_id, price, action FROM english_tochka.coins) AS unique_actions\n" +
        "GROUP BY user_id) AS user_coins ON users.id = user_coins.user_id\n" +
        "WHERE login = ?;", [login], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getUserCoinsByLogin = (login, result) => {
    db.query("SELECT coins_count, user_id, login FROM users \n" +
        "JOIN (SELECT user_id, SUM(price) AS coins_count FROM \n" +
        "(SELECT DISTINCT user_id, price, action FROM english_tochka.coins) AS unique_actions\n" +
        "GROUP BY user_id) AS coins ON users.id = user_id WHERE login = ?;", [login], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}