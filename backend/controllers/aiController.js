const axios = require("axios");
require("dotenv").config();

const getAIRecommendations = async (req, res) => {
    try {
        const { sqlQuery, data } = req.body;

        if (!sqlQuery || !data) {
            return res.status(400).json({ error: "❌ חסר נתונים או שאילתא" });
        }

        // המרת הנתונים לטקסט לשליחה
        const dataText = data.map(row => Object.values(row).join(": ")).join("\n");

        // יצירת הפרומפט שנשלח ל-OpenAI
        const prompt = `
            הנה תוצאות השאילתא:
            ${dataText}

            השאילתא שבוצעה:
            ${sqlQuery}

            תן לי המלצות עסקיות תמציתיות במשפט אחד על סמך הנתונים האלו.

        `;

        // הדפסת הפרומפט ללוג כדי לבדוק אותו
        console.log("🔹 Prompt שנשלח ל-OpenAI:", prompt);

        // שליחת הבקשה ל-OpenAI
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions", // שים לב לעדכון הנתיב
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }], // העברת הפרומפט נכון
                max_tokens: 200,
                temperature: 0.7,
                top_p: 1
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // החזרת תשובת ה-AI ללקוח
        res.json({ recommendation: response.data.choices[0].message.content });

    } catch (error) {
        console.error("❌ Error in AI recommendation:", error.response?.data || error.message);
        res.status(500).json({ error: "שגיאה בתקשורת עם OpenAI" });
    }
};

module.exports = { getAIRecommendations };
