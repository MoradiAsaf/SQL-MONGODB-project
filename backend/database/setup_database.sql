-- יצירת טבלת משתמשים
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    is_admin BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- יצירת טבלת לקוחות
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- יצירת טבלת מוצרים
CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    price DECIMAL(10, 2),
    stock INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- יצירת טבלת קטגוריות
CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL
);

-- יצירת טבלת הזמנות
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    total_price DECIMAL(10, 2),
    payment_method TEXT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- יצירת טבלת פרטי הזמנה
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price_at_purchase DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- יצירת טבלת ביקורות על מוצרים
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

-- יצירת טבלת פרסומות
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

-- יצירת טבלת המלצות AI
CREATE TABLE IF NOT EXISTS ai_suggestions (
    suggestion_id INTEGER PRIMARY KEY AUTOINCREMENT,
    suggestion_type TEXT,
    related_id INTEGER,
    ai_generated_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

