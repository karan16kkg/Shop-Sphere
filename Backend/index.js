const express = require("express");
const signup = require("./Middleware/auth.js");
const products = require("./Middleware/sellers.js");
const cors = require("cors");
const cart = require("./Middleware/cart.js");
const search = require("./Middleware/search.js")
require("./Models/setup.js");

const app = express();
const port = 3000;

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded ({extended:false}))

app.use("/user",signup)
app.use("/products",products)
app.use("/cart",cart)
app.use("/search",search)

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})