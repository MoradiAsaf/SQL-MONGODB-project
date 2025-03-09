
document.addEventListener("DOMContentLoaded", () => {
    const queryList = document.getElementById("query-list");
    const executeButton = document.getElementById("execute-query");
    const resultsTable = document.getElementById("results-table");
    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");
    const aiButton = document.getElementById("get-recommendations");
    const aiOutput = document.getElementById("ai-output");

    // טעינת השאילתות מהשרת
    async function loadQueries() {
        try {
            const response = await fetch("http://localhost:5000/api/queries");
            const queries = await response.json();
            queries.forEach(query => {
                const option = document.createElement("option");
                option.value = query.id;
                option.textContent = query.name;
                queryList.appendChild(option);
            });
        } catch (error) {
            console.error("Error loading queries:", error);
        }
    }

    // ביצוע השאילתא שנבחרה
    async function executeQuery() {
        const selectedQuery = queryList.value;
        if (!selectedQuery) {
            alert("אנא בחר שאילתא");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/execute-query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ queryId: selectedQuery })
            });

            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error("Error executing query:", error);
        }
    }

    // הצגת תוצאות השאילתא בטבלה
    function displayResults(data) {
        tableHeader.innerHTML = "";
        tableBody.innerHTML = "";

        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5'>אין תוצאות</td></tr>";
            return;
        }

        // יצירת כותרות לטבלה
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            tableHeader.appendChild(th);
        });

        // הכנסת נתונים לשורות
        data.forEach(row => {
            const tr = document.createElement("tr");
            headers.forEach(header => {
                const td = document.createElement("td");
                td.textContent = row[header];
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });

        // שמירת הנתונים לקבלת המלצות AI
        aiButton.dataset.queryResults = JSON.stringify(data);
        aiButton.dataset.sqlQuery = queryList.options[queryList.selectedIndex].text;
    }

    // בקשת המלצות AI
    async function getAIRecommendations() {
        const queryResults = aiButton.dataset.queryResults;
        const sqlQuery = aiButton.dataset.sqlQuery;

        if (!queryResults) {
            alert("אין נתונים להמלצה. ראשית, הרץ שאילתא.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/get-ai-recommendations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sqlQuery: sqlQuery,
                    data: JSON.parse(queryResults)
                })
            });

            const data = await response.json();
            aiOutput.textContent = data.recommendation;
        } catch (error) {
            console.error("Error getting AI recommendations:", error);
        }
    }

    // אירועים
    executeButton.addEventListener("click", executeQuery);
    aiButton.addEventListener("click", getAIRecommendations);

    // טעינת השאילתות בהפעלת הדף
    loadQueries();
});


document.getElementById("admin-btn").addEventListener("click", function() {
    window.location.href = "admin.html";
});
