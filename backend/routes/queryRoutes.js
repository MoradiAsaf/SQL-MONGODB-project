const express = require("express");
const { executeQuery, getAllQueries } = require("../controllers/queryController");

const router = express.Router();

// נתיב לקבלת כל השאילתות (לצורך יצירת כפתורים בצד הלקוח)
router.get("/queries", getAllQueries);

// נתיב לביצוע שאילתות והחזרת נתונים מה-DB
router.post("/execute-query", executeQuery);

module.exports = router;
