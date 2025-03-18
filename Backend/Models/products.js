const db = require("../connection");

db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT,
      images TEXT NOT NULL,
      qty INT NOT NULL,
      price INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,(error)=>{
        if(error){
            console.error("Table creation failed ❌", error);
        }
        else {
            console.log("Products table accessed successfully ✅");
        }
    }
)
