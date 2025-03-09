const express = require("express");
const { getAIRecommendations } = require("../controllers/aiController");
const { migrateAll } = require('../migration/mongoMigration');

const router = express.Router();

// נתיב לקבלת המלצות AI על הנתונים שהתקבלו מה-DB
router.post("/get-ai-recommendations", getAIRecommendations);


module.exports = router;
