const express = require("express");
const signup = require("./Middleware/auth.js");
const products = require("./Middleware/sellers.js");
require("./Models/setup.js");

const app = express();
const port = 3000;



app.use(express.urlencoded ({extended:false}))

app.use("/user",signup)
app.use("/products",products)

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})