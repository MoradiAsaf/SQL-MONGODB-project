const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require('fs');

const db = new sqlite3.Database('../database/mydatabase.db');
const sqlScript = fs.readFileSync('insertData.sql', 'utf8');

db.exec(sqlScript, (err) => {
    if (err) {
      console.error('Error running SQL script', err);
    } else {
      console.log('SQL script executed successfully');
    }
    db.close();
  });