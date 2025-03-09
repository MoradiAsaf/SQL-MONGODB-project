BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS advertisements (
    ad_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    category_id INTEGER,
    platform TEXT,
    budget DECIMAL(10, 2),
    clicks INTEGER,
    impressions INTEGER,
    conversion_rate DECIMAL(5, 2),
    start_date DATETIME,
    end_date DATETIME,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
CREATE TABLE IF NOT EXISTS ai_suggestions (
    suggestion_id INTEGER PRIMARY KEY AUTOINCREMENT,
    suggestion_type TEXT,
    related_id INTEGER,
    ai_generated_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price_at_purchase DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    total_price DECIMAL(10, 2),
    payment_method TEXT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    price DECIMAL(10, 2),
    stock INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
CREATE TABLE IF NOT EXISTS reviews (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    product_id INTEGER,
    rating INTEGER,
    comment TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('user', 'manager', 'admin')) NOT NULL DEFAULT 'user',
    secret_code TEXT DEFAULT NULL
);
INSERT INTO "advertisements" VALUES (1,1,1,'פייסבוק',1000,150,5000,3,'2025-01-01','2025-01-30');
INSERT INTO "advertisements" VALUES (2,2,1,'גוגל',2000,200,7000,2.85,'2025-01-01','2025-02-01');
INSERT INTO "advertisements" VALUES (3,3,2,'אינסטגרם',500,100,2500,4,'2025-01-05','2025-01-20');
INSERT INTO "advertisements" VALUES (4,4,3,'טלוויזיה',3000,300,10000,3.2,'2025-01-10','2025-01-25');
INSERT INTO "advertisements" VALUES (5,5,4,'פייסבוק',1500,250,6000,4.16,'2025-01-15','2025-02-05');
INSERT INTO "ai_suggestions" VALUES (1,'פרסומות',1,'ההוצאה על פרסומות בפייסבוק מוכיחה את עצמה, מומלץ להמשיך להשקיע בהן','2025-02-20 12:51:10');
INSERT INTO "ai_suggestions" VALUES (2,'מוצרים',2,'מחשבים ניידים הם מוצרים עם ביקוש גבוה, כדאי להגדיל את המלאי ולהגביר את הפרסום','2025-02-20 12:51:10');
INSERT INTO "ai_suggestions" VALUES (3,'לקוחות',3,'לקוחות שנרשמו לאחרונה אינם רוכשים מספיק, ייתכן ויש צורך בשיפור ההמלצות או המחירים','2025-02-20 12:51:10');
INSERT INTO "ai_suggestions" VALUES (4,'הזמנות',4,'הזמנות גדולות יותר מגיעות לעיתים קרובות יותר מקטגוריית הריהוט, כדאי להוסיף מוצרים חדשים','2025-02-20 12:51:10');
INSERT INTO "ai_suggestions" VALUES (5,'ביקורות',5,'הביקורות על הספר מצוינות, כדאי להמשיך לקדם את המוצר הזה על פלטפורמות נוספות','2025-02-20 12:51:10');
INSERT INTO "ai_suggestions" VALUES (6,'פרסום',1,'הגבר את התקציב ל-Google Ads כדי לשפר את המכירות','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (7,'מלאי',2,'המוצר נמכר מהר, מומלץ להזמין עוד יחידות','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (8,'שירות לקוחות',3,'לקוחות מתלוננים על איכות המוצר, כדאי לבדוק','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (9,'פרסום',4,'קמפיין ה-TikTok מניב תוצאות טובות, כדאי להמשיך','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (10,'שיווק',5,'לקוחות מבקשים צבעים נוספים למוצר זה','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (11,'שירות',6,'משלוחים מתעכבים, כדאי לבדוק','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (12,'מבצע',7,'מוצר זה נמכר טוב במבצעי הנחה','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (13,'שירות',8,'בקשות להחזרות רבות, יש לבדוק','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (14,'שיווק',9,'מומלץ לפרסם חוות דעת של לקוחות מרוצים','2025-02-20 18:27:40');
INSERT INTO "ai_suggestions" VALUES (15,'פרסום',10,'הפרסומת ביוטיוב הביאה גידול במכירות','2025-02-20 18:27:40');
INSERT INTO "categories" VALUES (1,'אלקטרוניקה');
INSERT INTO "categories" VALUES (2,'ביגוד');
INSERT INTO "categories" VALUES (3,'ריהוט');
INSERT INTO "categories" VALUES (4,'מזון');
INSERT INTO "categories" VALUES (5,'ספרים');
INSERT INTO "categories" VALUES (6,'מחשבים');
INSERT INTO "categories" VALUES (7,'טלפונים');
INSERT INTO "categories" VALUES (8,'אביזרים לרכב');
INSERT INTO "categories" VALUES (9,'ביגוד');
INSERT INTO "categories" VALUES (10,'הנעלה');
INSERT INTO "categories" VALUES (11,'ריהוט');
INSERT INTO "categories" VALUES (12,'ציוד משרדי');
INSERT INTO "categories" VALUES (13,'כלי עבודה');
INSERT INTO "categories" VALUES (14,'צעצועים');
INSERT INTO "categories" VALUES (15,'אלקטרוניקה');
INSERT INTO "customers" VALUES (1,'רמי לוי','rami@levi.com','050-1234567','תל אביב','2025-02-20 14:05:37');
INSERT INTO "customers" VALUES (2,'מירי כהן','miri@cohen.com','052-2345678','חיפה','2025-02-20 14:05:37');
INSERT INTO "customers" VALUES (3,'יוסי לוי','yossi@levi.com','054-3456789','ירושלים','2025-02-20 14:05:37');
INSERT INTO "customers" VALUES (4,'דנה ברק','dana@barak.com','053-4567890','תל אביב','2025-02-20 14:05:37');
INSERT INTO "customers" VALUES (5,'משה ישראלי','moshe@israeli.com','051-5678901','נתניה','2025-02-20 14:05:37');
INSERT INTO "customers" VALUES (6,'אייל כהן','eyal@example.com','054-1111111','רחוב הרצל 10, תל אביב','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (7,'נועה לוי','noa@example.com','052-2222222','רחוב דיזנגוף 50, תל אביב','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (8,'דוד ישראלי','david@example.com','050-3333333','שדרות רוטשילד 20, תל אביב','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (9,'מיכל פרידמן','michal@example.com','058-4444444','רחוב הרצל 15, חיפה','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (10,'רוני ברק','roni@example.com','053-5555555','רחוב הגפן 7, ירושלים','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (11,'עמית ששון','amit@example.com','057-6666666','רחוב הארזים 12, נתניה','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (12,'תמר שחר','tamar@example.com','056-7777777','רחוב האלונים 8, רחובות','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (13,'אריאל זיו','ariel@example.com','055-8888888','רחוב הברושים 5, באר שבע','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (14,'יונתן חן','yonatan@example.com','054-9999999','רחוב הנשיא 3, רעננה','2025-02-20 18:27:39');
INSERT INTO "customers" VALUES (15,'סיון מזרחי','sivan@example.com','052-1010101','רחוב השקמה 22, ראשון לציון','2025-02-20 18:27:39');
INSERT INTO "order_items" VALUES (1,1,1,1,1500);
INSERT INTO "order_items" VALUES (2,1,2,1,3500);
INSERT INTO "order_items" VALUES (3,2,5,1,5);
INSERT INTO "order_items" VALUES (4,3,1,2,1500);
INSERT INTO "order_items" VALUES (5,4,3,1,2500);
INSERT INTO "order_items" VALUES (6,4,4,1,200);
INSERT INTO "order_items" VALUES (7,5,5,2,5);
INSERT INTO "order_items" VALUES (8,1,1,1,3500);
INSERT INTO "order_items" VALUES (9,2,2,1,2800);
INSERT INTO "order_items" VALUES (10,3,3,2,120);
INSERT INTO "order_items" VALUES (11,4,4,3,80);
INSERT INTO "order_items" VALUES (12,5,5,1,320);
INSERT INTO "order_items" VALUES (13,6,6,1,550);
INSERT INTO "order_items" VALUES (14,7,7,5,15);
INSERT INTO "order_items" VALUES (15,8,8,1,230);
INSERT INTO "order_items" VALUES (16,9,9,1,200);
INSERT INTO "order_items" VALUES (17,10,10,2,150);
INSERT INTO "orders" VALUES (1,1,3500,'כרטיס אשראי','2025-02-20 12:59:06');
INSERT INTO "orders" VALUES (2,2,500,'פייפל','2025-02-20 12:59:06');
INSERT INTO "orders" VALUES (3,3,1200,'העברה בנקאית','2025-02-20 12:59:06');
INSERT INTO "orders" VALUES (4,4,2200,'כרטיס אשראי','2025-02-20 12:59:06');
INSERT INTO "orders" VALUES (5,5,150,'פייפל','2025-02-20 12:59:06');
INSERT INTO "orders" VALUES (16,1,3500,'כרטיס אשראי','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (17,2,2800,'ביט','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (18,3,120,'העברה בנקאית','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (19,4,80,'כרטיס אשראי','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (20,5,320,'פייפאל','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (21,6,550,'מזומן','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (22,7,15,'כרטיס אשראי','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (23,8,230,'ביט','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (24,9,200,'מזומן','2025-02-20 18:27:39');
INSERT INTO "orders" VALUES (25,10,150,'פייפאל','2025-02-20 18:27:39');
INSERT INTO "products" VALUES (1,'טלפון סלולרי',1,1500,100,'2025-02-20 12:51:10');
INSERT INTO "products" VALUES (2,'מחשב נייד',1,3500,50,'2025-02-20 12:51:10');
INSERT INTO "products" VALUES (3,'מעיל חורף',2,200,150,'2025-02-20 12:51:10');
INSERT INTO "products" VALUES (4,'ספה עור',3,2500,20,'2025-02-20 12:51:10');
INSERT INTO "products" VALUES (5,'לחם',4,5,500,'2025-02-20 12:51:10');
INSERT INTO "products" VALUES (6,'ספר פיתוח אישי',5,50,200,'2025-02-20 12:51:10');
INSERT INTO "products" VALUES (7,'מחשב נייד דל',1,3500,10,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (8,'טלפון סמסונג S22',2,2800,15,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (9,'מטען נייד לרכב',3,120,30,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (10,'חולצת פולו',4,80,25,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (11,'נעלי ספורט נייק',5,320,20,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (12,'שולחן עבודה',6,550,8,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (13,'עטים ג׳ל',7,15,100,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (14,'מברגה חשמלית',8,230,12,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (15,'לגו סט קלאסי',9,200,18,'2025-02-20 18:27:39');
INSERT INTO "products" VALUES (16,'אוזניות אלחוטיות',10,150,22,'2025-02-20 18:27:39');
INSERT INTO "reviews" VALUES (1,1,1,5,'מעולה, עובד מצוין!','https://example.com/images/phone.jpg','2025-02-20 12:51:10');
INSERT INTO "reviews" VALUES (2,2,2,4,'מחשב מעולה אך יקר מדי','https://example.com/images/laptop.jpg','2025-02-20 12:51:10');
INSERT INTO "reviews" VALUES (3,3,3,3,'ספה נוחה אך לא מתאימה לסלון שלי','https://example.com/images/sofa.jpg','2025-02-20 12:51:10');
INSERT INTO "reviews" VALUES (4,4,4,5,'לחם טרי וטעים','https://example.com/images/bread.jpg','2025-02-20 12:51:10');
INSERT INTO "reviews" VALUES (5,5,5,4,'ספר מעורר השראה','https://example.com/images/book.jpg','2025-02-20 12:51:10');
INSERT INTO "reviews" VALUES (6,1,1,5,'מחשב מעולה!',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (7,2,2,4,'טלפון נחמד, אבל הסוללה חלשה',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (8,3,3,5,'מוצר מצוין במחיר זול',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (9,4,4,3,'הבד איכותי אך קצת קטן',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (10,5,5,5,'נעליים מאוד נוחות',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (11,6,6,4,'שולחן יציב, קל להרכבה',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (12,7,7,5,'עטים טובים, מחזיקים הרבה זמן',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (13,8,8,4,'מברגה עוצמתית, אבל הסוללה לא מחזיקה הרבה',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (14,9,9,5,'הילד שלי נהנה מאוד מהלגו הזה!',NULL,'2025-02-20 18:27:40');
INSERT INTO "reviews" VALUES (15,10,10,5,'אוזניות נוחות עם סאונד מעולה',NULL,'2025-02-20 18:27:40');
INSERT INTO "users" VALUES (1,'Admin','admin','$2b$10$cjCLsRCOHKjoSbllq0oNrOwtkjgwednBaYfXF3G4iuw1i2VFgo4hi','admin','SuperSecretCode123');
COMMIT;
