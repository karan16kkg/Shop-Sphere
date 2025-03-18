const express = require("express");
const products = express();

const db = require("../connection.js")

products.get("/",(req,res)=>{
    db.query('SELECT * FROM products',(error,results)=>{
        
        res.send(results);
    })
})

products.post("/",(req,res)=>{
    const {user_id,images,quantity,price} = req.body
    
    db.query('INSERT INTO products (user_id,images,qty,price) VALUES (?,?,?,?)', [user_id,images,quantity,price],(error)=>{
        if(error){
            return res.status(500).send({message:"Product Not Added ❌",error});
        }

        res.status(201).send({message:"Product added successfully ✅"})
    })
})

module.exports = products










