document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
});

// 🔐 התחברות אדמין
async function adminLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;
    const response = await fetch("http://localhost:5000/admin/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (response.ok) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
    } else {
        document.getElementById("login-message").textContent = "התחברות נכשלה: " + data.message;
    }
}

// 📌 הצגת אזורים לפי לחיצה בתפריט
function toggleSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}

// ➕ הוספת משתמש
async function addUser() {
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const role = document.getElementById("new-role").value;
    console.log(username, password, role);
    
    const response = await fetch("http://localhost:5000/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role })
        
    });

    const data = await response.json();
    document.getElementById("user-message").textContent = data.message;
}

// 🚀 הרצת שאילתות
async function executeQuery() {
    const query = document.getElementById("query-input").value;
    const response = await fetch("http://localhost:5000/admin/execute-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    document.getElementById("query-result").textContent = JSON.stringify(data, null, 2);
}

// 🔄 המרת מסד נתונים
async function migrateDatabase() {
    const secretCode = document.getElementById("secret-code").value;
    const response = await fetch("http://localhost:5000/admin/migrate-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretCode })
    });

    const data = await response.json();
    document.getElementById("migration-message").textContent = data.message;
}
