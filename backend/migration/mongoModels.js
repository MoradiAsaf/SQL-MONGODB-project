const mongoose = require('mongoose');

// 🔹 סכמת משתמשים
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
    secret_code: { type: String, default: null } // קוד סודי
});

// 🔹 סכמת לקוחות
const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    address: { type: String },
    registration_date: { type: Date, default: Date.now }
});

// 🔹 סכמת מוצרים
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number },
    stock: { type: Number },
    created_at: { type: Date, default: Date.now }
});

// 🔹 סכמת קטגוריות
const CategorySchema = new mongoose.Schema({
    category_name: { type: String, required: true }
});

// 🔹 סכמת הזמנות
const OrderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    total_price: { type: Number },
    payment_method: { type: String },
    order_date: { type: Date, default: Date.now }
});

// 🔹 סכמת פרטי הזמנה
const OrderItemSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    price_at_purchase: { type: Number }
});

// 🔹 סכמת ביקורות על מוצרים
const ReviewSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    image_url: { type: String },
    created_at: { type: Date, default: Date.now }
});

// 🔹 סכמת פרסומות
const AdvertisementSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    platform: { type: String },
    budget: { type: Number },
    clicks: { type: Number },
    impressions: { type: Number },
    conversion_rate: { type: Number },
    start_date: { type: Date },
    end_date: { type: Date }
});

// 🔹 סכמת המלצות AI
const AISuggestionSchema = new mongoose.Schema({
    suggestion_type: { type: String },
    related_id: { type: mongoose.Schema.Types.ObjectId },
    ai_generated_text: { type: String },
    created_at: { type: Date, default: Date.now }
});

// 🔹 יצירת המודלים
const User = mongoose.model("User", UserSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
const Product = mongoose.model("Product", ProductSchema);
const Category = mongoose.model("Category", CategorySchema);
const Order = mongoose.model("Order", OrderSchema);
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
const Review = mongoose.model("Review", ReviewSchema);
const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
const AISuggestion = mongoose.model("AISuggestion", AISuggestionSchema);

// 📌 ייצוא המודלים
module.exports = {
    User,
    Customer,
    Product,
    Category,
    Order,
    OrderItem,
    Review,
    Advertisement,
    AISuggestion
};
