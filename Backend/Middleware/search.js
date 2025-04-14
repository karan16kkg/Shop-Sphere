const express = require("express")
const search = express();
const db = require("../connection.js")

search.get("/",(req,res)=>{
    res.send("hello search");
})

search.get("/:value",(req,res)=>{
    let {value} = req.params;
    const keyword = `%${value.toLowerCase()}%`;

    db.query('SELECT * FROM products WHERE MATCH(name, company, category) AGAINST (?) OR name LIKE ? OR company LIKE ? OR category LIKE ?',[keyword,keyword,keyword,keyword],(error,results)=>{
        if(error){
            return res.send({message:"There is an error",error});
        }

        const searchItems = results.map((data)=>({
            ...data,images: JSON.parse(data.images),
        }))
        res.send(searchItems);
    })
})

module.exports = search;