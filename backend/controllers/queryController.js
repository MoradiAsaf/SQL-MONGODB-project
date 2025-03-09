const {db} = require("../database/db"); // חיבור למסד הנתונים
const queries = require("../queries"); // ייבוא השאילתות המוגדרות מראש

// פונקציה להחזרת כל השאילתות עם מזהה ותיאור
const getAllQueries = (req, res) => {
    try {
        const queryList = Object.keys(queries).map(queryId => ({
            id: queryId,
            name: queries[queryId].name
        }));
        res.status(200).json(queryList);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch queries" });
    }
};

// פונקציה להרצת שאילתא לפי ה-ID שלה
const executeQuery = async (req, res) => {
    const { queryId } = req.body;
    console.log(queryId);
    
    

    if (!queryId || !queries[queryId]) {
        return res.status(400).json({ error: "Query ID not found" });
    }

    try {
        const sql = queries[queryId].sql;
        
        const result = await new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

         res.status(200).json(result);
     } catch (error) {
        console.log(error);
        
      
        res.status(500).json({ error: "Failed to execute query" });
    }
};

module.exports = { getAllQueries, executeQuery };
