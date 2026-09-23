# 🛒 eCommerce Backend API

A complete **eCommerce Backend API** built with **Node.js, Express.js, and MongoDB**.  
This project provides a secure and scalable RESTful API for managing products, users, carts, wishlists, invoices, and more.

---

## 🚀 Tech Stack
- **Node.js** with **Express.js** for backend framework
- **MongoDB** with **Mongoose** for database
- **JWT Authentication** for secure login
- **Nodemailer** for email/OTP verification
- **Helmet, CORS, XSS Sanitizer, HPP, Rate Limiting** for security

---

## ⚙️ Features

### 🛍️ Product Management
- Product Brand List  
- Product Category List  
- Product Slider List  
- Product List by Brand, Category, Remark, Keyword  
- Product Details  
- Review List  

### 👤 User Management
- OTP based login system  
- Verify Login  
- Create, Update, Read Profile  
- User Logout  

### ❤️ Wishlist
- Add product to wishlist  
- Remove product from wishlist  
- View wishlist  

### 🛒 Cart System
- Add product to cart with color, size, quantity  
- Update cart item  
- Remove cart item  
- View cart list  

### 📄 Invoice Management
- Create Invoice  
- View Invoice List  
- View Invoice Product List  

### 🔒 Security Features
- JWT Authentication  
- Helmet for HTTP headers security  
- XSS Sanitizer & xss-clean  
- Rate Limiting (express-rate-limit)  
- HPP (HTTP Parameter Pollution protection)  

### 📌 Extra Features
- Features List endpoint  
- Legal Details endpoint

---

## 📡 API Endpoints

### 🛍️ Product
- `GET /ProductBrandList`
- `GET /ProductCategoryList`
- `GET /ProductSliderList`
- `GET /ProductListByBrand/:id`
- `GET /ProductListByCategory/:id`
- `GET /ProductListBySmiler/:id`
- `GET /ProductListByRemark/:remark`
- `GET /ProductListByKeyword/:keyword`
- `GET /ProductDetails/:id`
- `GET /ReviewList/:id`

### 👤 User
- `GET /UserOTP/:email`
- `GET /VerifyLogin/:email/:otp`
- `GET /UserLogOut`
- `POST /CreateProfile`
- `POST /UpdateProfile`
- `GET /ReadProfile`

### ❤️ Wishlist
- `GET /WishList`
- `GET /SaveWishList`
- `GET /RemoveWishList`

### 🛒 Cart
- `GET /CartList`
- `GET /SaveCartList`
- `GET /UpdateCartList/:id`
- `GET /RevoveCartList`

### 📄 Invoice
- `GET /CreateInvoice`
- `GET /InvoiceList`
- `GET /InvoiceProductList/:id`

### 📌 Features
- `GET /FeaturesList`
- `GET /LegalDetails/:type`

---

## 📦 Dependencies
| Dependency | Purpose |
|------------|---------|
| **express** | Web framework |
| **mongoose** | MongoDB ODM |
| **jsonwebtoken** | Authentication |
| **helmet** | Security headers |
| **cors** | Cross-origin requests |
| **cookie-parser** | Cookie handling |
| **express-rate-limit** | Prevent brute force |
| **xss-clean** | Prevent XSS attacks |
| **hpp** | Prevent parameter pollution |
| **nodemailer** | Email sending |
| **dotenv** | Environment variables |
| **axios** | HTTP requests |

---

## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend
