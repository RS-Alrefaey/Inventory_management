# 🧭 Inventory Management Dashboard

A lightweight **Inventory and Sales Management Dashboard** built with **React**, **TypeScript**, and **Tailwind CSS**.  
It allows managing products, orders, and promotions through a simple, modern, and responsive interface — all stored locally with no backend required.

---

## ✨ Features

- 📦 **Product Management**
  - Add, edit, and deactivate products
  - Prevents negative stock values
  - Inactive products stay saved but hidden from new orders

- 🧾 **Orders Management**
  - Create and edit customer orders
  - Automatically decrements stock for ordered items
  - Prevents submitting empty orders

- 🎟️ **Promo Management**
  - Add and edit discount codes
  - Validates start and end dates
  - Supports both fixed and percentage-based discounts

- 📊 **Dashboard KPIs**
  - Total revenue
  - Average order value (AOV)
  - Monthly order count

- 🔔 **Notifications**
  - Highlights low-stock and out-of-stock products

- 🌗 **Dark Mode Support**

- 💾 **LocalStorage Persistence**
  - All data (products, orders, promos) is saved locally in the browser

- 🧩 **Reusable Components**
  - Form fields, buttons, toolbars, and table components for cleaner structure

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | React (Vite) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | React Context API |
| UI Components | HeadlessUI, MUI |
| Charts | Recharts |

---

## 🚀 Getting Started
Follow these steps to set up and run the project locally:

### 1️⃣ Clone the repository

Clone this repository to your local machine:

```bash
  git clone https://link-to-project
```

Then navigate into the project folder:

```bash
cd dashboard
```
### 2️⃣ Install dependencies

Install all required packages using npm:

```bash
  npm install
```

### 3️⃣ Start the development server

```bash
  npm run dev
```

Once the server starts, open the app in your browser at:

👉 http://localhost:5173
