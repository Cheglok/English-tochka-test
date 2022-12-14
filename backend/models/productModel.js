import db from "../config/database.js";

export const getProducts = (result) => {
    db.query("SELECT * FROM products", (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const insertOrder = (data, result) => {
    db.query("INSERT INTO orders_users SET product_id = ?, user_id = ?", [data.product_id, data.user_id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}