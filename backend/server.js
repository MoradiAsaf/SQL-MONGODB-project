const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require('./database/db');
const path = require('path');


const apiRoutes = require("./routes/apiRoutes");
const queryRoutes = require("./routes/queryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 5000;

app.use('/files', express.static(path.join(__dirname, 'public/files')));


app.use(cors());
app.use(express.json());

// נתיבי ה-API
app.use("/api", apiRoutes);
app.use("/api", queryRoutes);
app.use("/admin", adminRoutes);

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
