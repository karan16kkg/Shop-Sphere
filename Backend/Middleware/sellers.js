const express = require("express");
const products = express();

const db = require("../connection.js")

products.get("/",(req,res)=>{
    db.query('SELECT * FROM products',(error,results)=>{
        if(error){
            return res.status(500).send({message:"Products Not Found ❌",error});
        }

        const formattedResults = results.map(product => ({
            ...product,
            images: JSON.parse(product.images)
        }));

        res.send(formattedResults);
    })
})

products.get("/front",(req,res)=>{
    db.query('(SELECT * FROM products WHERE(category = "mobile") LIMIT 1) UNION (SELECT * FROM products WHERE(category = "watch") LIMIT 1) UNION (SELECT * FROM products WHERE(category = "laptop") LIMIT 1) UNION (SELECT * FROM products WHERE(category = "accessories") LIMIT 1)',(error,response)=>{
        if(error){
            return res.status(500).send({message:"Products Not Found ❌",error});
        }

        const formattedResults = response.map(product => ({
            ...product,
            images: JSON.parse(product.images)
        }));

        res.send(formattedResults);
    })
})

products.post("/",(req,res)=>{
    const {user_id,name,company,images,quantity,price,category,description,rating,reviews} = req.body
    
    db.query('INSERT INTO products (user_id,name,company,images,qty,price,category,description,rating,reviews) VALUES (?,?,?,?,?,?,?,?,?,?)', [user_id,name,company,images,quantity,price,category,description,rating,reviews],(error)=>{
        if(error){
            return res.status(500).send({message:"Product Not Added ❌",error});
        }

        res.status(201).send({message:"Product added successfully ✅"})
    })
})

module.exports = products










