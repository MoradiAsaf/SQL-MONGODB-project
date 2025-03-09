const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const { connectDB } = require('../database/db');
const { User, Customer, Product, Category, Order, OrderItem, Review, Advertisement, AISuggestion } = require('./mongoModels');
connectDB();
// 🔹 חיבור ל-SQLite
const { db} = require('../database/db');
// 🔹 חיבור ל-MongoDB

// 🔹 פונקציה להעתקת נתונים
async function migrateTable(sqlQuery, mongoModel, transformFunc = (row) => row) {
    return new Promise((resolve, reject) => {
        db.all(sqlQuery, [], async (err, rows) => {
            if (err) {
                console.error(`❌ Error reading ${mongoModel.collection.name} from SQLite:`, err);
                reject(err);
                return;
            }
            if (rows.length === 0) {
                console.log(`⚠ No data found in SQLite for ${mongoModel.collection.name}`);
                resolve();
                return;
            }
            try {
                await mongoModel.deleteMany({});
                const transformedRows = rows.map(transformFunc);
                await mongoModel.insertMany(transformedRows);
                console.log(`✅ Migrated ${rows.length} records to ${mongoModel.collection.name}`);
                resolve();
            } catch (err) {
                console.error(`❌ Error inserting into MongoDB ${mongoModel.collection.name}:`, err);
                reject(err);
            }
        });
    });
}

// 🔹 הרצת תהליך ההמרה
async function migrateAll() {
    try {
        // 🟢 העתקת משתמשים
        await migrateTable("SELECT * FROM users", User, row => ({
            username: row.username,
            password: row.password,
            role: row.role,
            secret_code: row.secret_code || null
        }));

        // 🟢 העתקת לקוחות
        await migrateTable("SELECT * FROM customers", Customer);

        // 🟢 העתקת קטגוריות
        await migrateTable("SELECT * FROM categories", Category);

        // 🟢 העתקת מוצרים
        await migrateTable("SELECT * FROM products", Product, row => ({
            ...row,
            category_id: new mongoose.Types.ObjectId() // יומר בשלב מאוחר יותר
        }));

        // 🟢 העתקת הזמנות
        await migrateTable("SELECT * FROM orders", Order, row => ({
            ...row,
            customer_id: new mongoose.Types.ObjectId()
        }));

        // 🟢 העתקת פרטי הזמנות
        await migrateTable("SELECT * FROM order_items", OrderItem, row => ({
            ...row,
            order_id: new mongoose.Types.ObjectId(),
            product_id: new mongoose.Types.ObjectId()
        }));

        // 🟢 העתקת ביקורות מוצרים
        await migrateTable("SELECT * FROM reviews", Review, row => ({
            ...row,
            customer_id: new mongoose.Types.ObjectId(),
            product_id: new mongoose.Types.ObjectId()
        }));

        // 🟢 העתקת פרסומות
        await migrateTable("SELECT * FROM advertisements", Advertisement, row => ({
            ...row,
            product_id: new mongoose.Types.ObjectId(),
            category_id: new mongoose.Types.ObjectId()
        }));

        // 🟢 העתקת המלצות AI
        await migrateTable("SELECT * FROM ai_suggestions", AISuggestion, row => ({
            ...row,
            related_id: new mongoose.Types.ObjectId() // המרה ל-ObjectId
        }));
        

        console.log("🚀 **Migration completed successfully!**");
        return { success: true, message: "Migration completed successfully!" };
    } catch (error) {
        console.error("❌ Migration failed:", error);
        return { success: false, error: error.message };
    } finally {
        db.close(() => console.log("🔴 SQLite connection closed."));
        mongoose.connection.close();
console.log("🔴 MongoDB connection closed.");

    }
}

module.exports = { migrateAll };