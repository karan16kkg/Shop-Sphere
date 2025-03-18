const db = require("../connection.js");

db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(100) DEFAULT("user")
    )
`, (error) => {
    if (error) {
        console.error("Table creation failed ❌", error);
    } else {
        console.log("Users table accessed successfully ✅");
    }
});
