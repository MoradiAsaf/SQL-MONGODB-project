const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const {db} = require('../database/db'); 

const newPassword = '123456'; // שנה את הסיסמה כאן
const hashedPassword = bcrypt.hashSync(newPassword, 10);

db.run("UPDATE users SET password = ? WHERE role = 'admin'", [hashedPassword], function(err) {
    if (err) {
        return console.error("❌ Error updating admin password:", err.message);
    }
    console.log("✅ Admin password updated successfully!");
    db.close();
});
