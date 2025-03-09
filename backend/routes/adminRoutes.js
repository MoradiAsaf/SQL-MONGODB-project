const express = require("express");
const router = express.Router();
const { db } = require("../database/db");
const { User } = require("../migration/mongoModels");
const bcrypt = require('bcrypt');
const {migrateAll} = require("../migration/mongoMigration");

// 🟢 התחברות Admin
// **נתיב התחברות ADMIN**
router.post('/admin-login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "נא להזין שם משתמש וסיסמה" });
    }

    // חיפוש המשתמש בטבלת המשתמשים
    const query = "SELECT * FROM users WHERE username = ? AND role = 'admin'";
    db.get(query, [username], async (err, user) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ success: false, message: "שגיאת שרת פנימית" });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: "שם משתמש או סיסמה שגויים" });
        }

        // בדיקה אם הסיסמה תואמת לסיסמה המוצפנת
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "שם משתמש או סיסמה שגויים" });
        }

        // התחברות מוצלחת
        return res.json({ success: true, message: "✅ התחברות הצליחה!", user: { id: user.id, username: user.username } });
    });
});


router.post("/add-user", async (req, res) => {
    const { username, password, role } = req.body;
    

    if (!username || !password || !role) {
        
        return res.status(400).json({ success: false, message: "יש למלא את כל השדות" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, hashedPassword, role],
        function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: "שגיאה בהוספת משתמש", error: err.message , err});
            }
            res.json({ success: true, message: "✅ משתמש נוסף בהצלחה!", userId: this.lastID });
        }
    );
});

// 📌 ➋ עדכון פרטי משתמש קיים
router.put("/update-user/:id", async (req, res) => {
    const { username, password, role } = req.body;
    const userId = req.params.id;

    if (!username && !password && !role) {
        return res.status(400).json({ success: false, message: "אין שדות לעדכון" });
    }

    let query = "UPDATE users SET ";
    let params = [];

    if (username) {
        query += "username = ?, ";
        params.push(username);
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += "password = ?, ";
        params.push(hashedPassword);
    }
    if (role) {
        query += "role = ?, ";
        params.push(role);
    }

    query = query.slice(0, -2) + " WHERE id = ?";
    params.push(userId);

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ success: false, message: "שגיאה בעדכון המשתמש", error: err.message });
        }
        res.json({ success: true, message: "✅ המשתמש עודכן בהצלחה!" });
    });
});

// 🟢 המרת SQL ל-MongoDB
router.post("/migrate-db", (req, res) => {
    const { secretCode } = req.body;

    // בדיקת הקוד הסודי ממסד הנתונים
    db.get("SELECT secret_code FROM users WHERE role = 'admin' LIMIT 1", [], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: "שגיאה בשליפת הקוד הסודי" });
        }
        if (!row || row.secret_code !== secretCode) {
            return res.status(401).json({ success: false, message: "❌ קוד סודי שגוי" });
        }

        migrateAll()
            .then(() => res.json({ success: true, message: "✅ המרת הנתונים הושלמה!" }))
            .catch(err => res.status(500).json({ success: false, message: "❌ שגיאה בהמרת הנתונים", error: err.message }));
    });
});
// 🟢 הצגת משתמשים
router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// 🟢 מחיקת משתמש
router.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

// 🟢 הרצת שאילתות SQL
router.post("/execute-query", (req, res) => {
    const { query } = req.body;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
