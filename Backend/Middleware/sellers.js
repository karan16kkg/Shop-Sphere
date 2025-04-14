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
    db.query('SELECT * FROM products WHERE front = ?',[true],(error,response)=>{
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

products.get("/mobile",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["mobile"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

products.get("/laptop",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["laptop"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

products.get("/watch",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["watch"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

products.get("/accessories",(req,res)=>{
    db.query('SELECT * FROM products WHERE category = ?',["accessories"],(error,results)=>{
        if(error){
            return res.send({message:"There ia an error",error});
        }

        const formattedResults = results.map((data) =>({
            ...data,
            images: JSON.parse(data.images)
        }));

        res.send(formattedResults);
    })
})

module.exports = products










