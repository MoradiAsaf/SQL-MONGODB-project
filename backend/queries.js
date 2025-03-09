const queries = {
/*     test: {
        name: "users",
        sql: ``
    }, */
    top_categories: {
        name: "קטגוריות עם הכי הרבה מכירות",
        sql: `SELECT c.category_name, SUM(oi.quantity) AS total_sales
              FROM order_items oi
              JOIN products p ON oi.product_id = p.product_id
              JOIN categories c ON p.category_id = c.category_id
              GROUP BY c.category_name
              ORDER BY total_sales DESC;`
    },
    top_products: {
        name: "המוצרים הכי נמכרים",
        sql: `SELECT p.name AS product_name, SUM(oi.quantity) AS total_sales
              FROM order_items oi
              JOIN products p ON oi.product_id = p.product_id
              GROUP BY p.name
              ORDER BY total_sales DESC;`
    },
    top_customers: {
        name: "5 הלקוחות עם הכי הרבה רכישות",
        sql: `SELECT c.name, COUNT(o.order_id) AS total_orders, SUM(o.total_price) AS total_spent
              FROM orders o
              JOIN customers c ON o.customer_id = c.customer_id
              GROUP BY c.customer_id
              ORDER BY total_spent DESC
              LIMIT 5;`
    },
    top_cities: {
        name: "ערים עם הכי הרבה רכישות",
        sql: `SELECT c.address, COUNT(o.order_id) AS total_orders
              FROM orders o
              JOIN customers c ON o.customer_id = c.customer_id
              GROUP BY c.address
              ORDER BY total_orders DESC;`
    },
    top_ad_performance: {
        name: "הפרסום עם הכי הרבה המרות",
        sql: `SELECT a.platform, a.category_id, a.conversion_rate, a.clicks, a.impressions
              FROM advertisements a
              ORDER BY a.conversion_rate DESC
              LIMIT 1;`
    },
    top_rated_products: {
        name: "המוצרים עם הביקורות הכי טובות",
        sql: `SELECT 
    p.name,
    ROUND(AVG(r.rating), 2) AS avg_rating,
    COUNT(r.review_id) AS total_reviews
FROM reviews r
JOIN products p ON r.product_id = p.product_id
GROUP BY p.name
HAVING COUNT(r.review_id) > 5
ORDER BY avg_rating DESC;
`
    },
    low_rated_products: {
        name: "המוצרים עם הביקורות הכי גרועות",
        sql: `SELECT p.name, AVG(r.rating) AS avg_rating, COUNT(r.review_id) AS total_reviews
              FROM reviews r
              JOIN products p ON r.product_id = p.product_id
              GROUP BY p.name
              HAVING AVG(r.rating) < 3
              ORDER BY avg_rating ASC;`
    },
    monthly_sales: {
        name: "מכירות לפי חודשים",
        sql: `SELECT strftime('%Y-%m', o.order_date) AS month, SUM(o.total_price) AS total_sales
              FROM orders o
              GROUP BY month
              ORDER BY month ASC;`
    }
};

module.exports = queries;
