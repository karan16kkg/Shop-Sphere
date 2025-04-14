const db = require("../connection");

db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT,
      name VARCHAR(100),
      company VARCHAR(100),
      images TEXT NOT NULL,
      qty INT NOT NULL,
      price VARCHAR(100),
      category VARCHAR(100),
      decription TEXT,
      rating VARCHAR(50),
      reviews VARCHAR(50),
      front BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`, (error) => {
    if (error) {
        console.error("Table creation failed ❌", error);
    }
    else {
        console.log("Products table accessed successfully ✅");
    }
}
)

// db.query(`
//     ALTER TABLE products
//     ADD COLUMN front BOOLEAN DEFAULT FALSE;
// `, (error) => {
//     if (error) {
//         console.error("Column addition failed ❌", error);
//     } else {
//         console.log("New column added successfully ✅");
//     }
// })

// db.query(`
//     UPDATE products 
//     SET front = ?
//     WHERE id = ?;
// `, [true,4], (error, result) => {
//     if (error) {
//         console.error("Updating description failed ❌", error);
//     } else {
//         console.log("Description updated successfully ✅", result);
//     }
// });

// db.query(`
//     ALTER TABLE products
//     ADD FULLTEXT(name, company, category);
// `, (error) => {
//     if (error) {
//         console.error("Fulltext index creation failed ❌", error);
//     } else {
//         console.log("Fulltext index created successfully ✅");
//     }
// });