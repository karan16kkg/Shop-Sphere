const mysql = require("mysql2")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"@Karan123",
    database:"ShopSphere"
})

db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Database Connected Successfully");
    }
})
module.exports = db;