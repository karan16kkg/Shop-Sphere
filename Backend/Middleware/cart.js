const express = require("express")
const cart = express();

const db = require("../connection.js")

cart.get("/items/:user_id", (req, res) => {
    let { user_id } = req.params
    db.query('SELECT cart.id AS cart_id, cart.quantity, products.* FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?', [user_id], (error, results) => {
        if (error) {
            return res.status(500).send({ message: "Products Not Found ❌", error });
        }
        const cartItems = results.map(item => ({
            ...item,
            images: JSON.parse(item.images),
        }));

        res.send(cartItems)
    })
})

cart.post("/", (req, res) => {
    let { user_id, product_id, qty } = req.body;

    db.query('SELECT qty FROM products WHERE id = ?', [product_id], (error, results) => {
        if (error) {
            return res.send({ message: error });
        }

        if (results[0].qty < qty) {
            return res.send({ message: "Items not in stock" });
        }

        db.query('UPDATE products SET qty = qty - ? WHERE id = ?', [qty, product_id], (error) => {
            if (error) {
                return res.send({ message: error });
            }

            db.query('SELECT * FROM cart WHERE product_id = ? && user_id = ?', [product_id, user_id], (error, results) => {
                if (error) {
                    return res.send({ message: error });
                }

                if (results.length > 0) {
                    db.query('UPDATE cart SET quantity = quantity + ? WHERE product_id = ? && user_id = ?', [qty, product_id, user_id], (error, results) => {
                        if (error) {
                            return res.send({ message: "Product Not Added ❌", error });
                        }
                        return res.status(201).send({ message: "Product added successfully ✅" })
                    })
                }
                else {
                    db.query('INSERT INTO cart (user_id,product_id,quantity) VALUES (?,?,?)', [user_id, product_id, qty], (error) => {
                        if (error) {
                            return res.status(500).send({ message: "Product Not Added ❌", error });
                        }

                        res.status(201).send({ message: "Product added successfully ✅" })
                    })
                }

            })
        })
    })
})

cart.post("/delete", (req, res) => {
    let { id } = req.body;
    db.query('SELECT quantity,product_id FROM cart WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.send({ message: "There is an error", error });
        }

        let q = results[0].quantity;
        let p = results[0].product_id;

        db.query('UPDATE products SET qty = qty + ? WHERE id = ?', [q, p], (error, results) => {
            if (error) {
                return res.send({ message: "There is an error", error });
            }
            db.query('DELETE FROM cart WHERE id = ?', [id], (error) => {
                if (error) {
                    return res.send({ message: "There is an error", error })
                }

                res.send({ message: "Product removed From cart Successfully ✅" })
            })
        })
    })
})

cart.post("/increase", (req, res) => {
    let { id, product_id } = req.body;

    db.query('SELECT qty FROM products WHERE id = ?', [product_id], (error, results) => {
        if (error) {
            return res.send({ message: "An error occured", error });
        }

        if (results[0].qty > 0) {
            db.query('UPDATE products SET qty = qty - ? WHERE id = ?', [1, product_id], (error) => {
                if (error) {
                    return res.send({ message: "An error", error });
                }

                db.query('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [1, id], (error) => {
                    if (error) {
                        return res.send({ message: "An error", error });
                    }

                    res.send({ message: "Quantity inceased Successfully" })
                })
            })
        }
        else {
            return res.send({ message: "Currently Out Of Stock" });
        }
    })
})

cart.post("/decrease", (req, res) => {
    let { id, product_id } = req.body;
    db.query('SELECT quantity FROM cart where id = ?', [id], (error, results) => {
        if (error) {
            return res.send({ message: "An error", error });
        }

        if (results[0].quantity <= 1) {
            return res.send({ message: "Click on Delete Button" });
        }
        else {
            db.query('UPDATE products SET qty = qty + ? WHERE id = ?', [1, product_id], (error) => {
                if (error) {
                    return res.send({ message: "An error", error });
                }

                db.query('UPDATE cart SET quantity = quantity - ? WHERE id = ?', [1, id], (error) => {
                    if (error) {
                        return res.send({ message: "An error", error });
                    }

                    res.send({ message: "Quantity decreased Successfully" })
                })
            })
        }
    })
})

cart.get("/itemCount/:user_id", (req, res) => {
    let { user_id } = req.params
    db.query('SELECT count(product_id) AS cnt FROM cart WHERE user_id = ?', [user_id], (error, results) => {
        if (error) {
            return res.send({ message: "An error", error });
        }

        return res.send(results);
    })
})

module.exports = cart;