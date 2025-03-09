# Final Project 2025 🚀

זהו הפרויקט הסופי שלך לשנת 2025, המכיל מערכת **Dockerized** עם `docker-compose.yml` שמנהל את ה-Backend וה-Frontend.

## 📦 מבנה הפרויקט
```
/final-project-2025/
│── backend/          # קוד צד שרת
│── frontend/         # קוד צד לקוח
│── docker-compose.yml # הגדרות Docker Compose
│── README.md         # תיעוד הפרויקט
│── .gitignore        # קובץ Git למניעת העלאת קבצים לא נחוצים
```

---

## 🚀 **התקנה והפעלה**
### 1️⃣ **שכפול (Clone) הריפוזיטורי**
```bash
git clone https://github.com/MoradiAsaf/SQL-MONGODB-project.git
cd SQL-MONGODB-project
```

### 2️⃣ **יצירת קובץ `.env` ל-Backend**
לפני הפעלת הפרויקט, יש ליצור קובץ בשם `.env` בתיקיית `backend/` ולהוסיף את משתנה ה-API של OpenAI:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3️⃣ **הפעלת הפרויקט עם Docker Compose**
```bash
docker-compose up -d
```
🔹 **הדגל `-d` מריץ את הקונטיינרים ברקע.**  
🔹 לאחר הפקודה הזו, ה-Backend וה-Frontend יופעלו במקביל.

### 4️⃣ **עצירת הקונטיינרים**
```bash
docker-compose down
```

---

## 🛠 **כלים וטכנולוגיות בפרויקט**
- **Docker + Docker Compose** 🐳
- **Node.js / Express.js** (ל-Backend)
- **HTML / css/ JS** (ל-Frontend)
- **SQL / MongoDB** (לבסיס הנתונים)

---

## 📜 **רשימת פקודות שימושיות**
| פקודה | תיאור |
|--------|------------|
| `docker-compose up -d` | הפעלת כל השירותים ברקע |
| `docker-compose down` | עצירת כל השירותים |
| `docker-compose logs` | הצגת הלוגים של הקונטיינרים |
| `docker ps` | בדיקת קונטיינרים פעילים |

---

## 🎯 **נקודות חשובות**
- הקפד להתקין **Docker** ו-**Docker Compose** לפני הרצת הפרויקט.
- יש לוודא שקובץ `.env` בתיקיית `backend/` מכיל את `OPENAI_API_KEY` הנדרש לפעילות המערכת.
- ניתן לשנות את הגדרות השירותים בקובץ `docker-compose.override.yml` (אם קיים).
- וודא שפורט 3000 (Frontend) ו-5000 (Backend) אינם תפוסים במערכת שלך.

---

## 📞 **צור קשר**
👤 **Asaf Moradi**  
📧 Email: moradiasaf@gmail.com  
🔗 GitHub: https://github.com/MoradiAsaf

---


🎉 **בהצלחה עם הפרויקט!** 🚀

