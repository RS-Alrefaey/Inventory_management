🧭 Inventory Management Dashboard

A lightweight inventory and sales management dashboard built with React, TypeScript, and Tailwind CSS.
It provides a clean, responsive interface for managing products, orders, and promotions with full CRUD functionality and smart contextual behavior — all running completely on the client using localStorage (no backend needed).

✨ Features

📦 Product Management – Add, edit, and deactivate products

Prevents negative stock

Inactive products stay stored but hidden from new orders

🧾 Orders Management – Create and track customer orders

Automatically decreases stock levels

Prevents empty orders

🎟️ Promos Management – Manage discount codes

Validates start and end dates

Supports fixed and percentage-based discounts

📊 Dashboard KPIs – Displays key metrics:

Total revenue, average order value (AOV), monthly order count

🔔 Notifications System –

Alerts for low or out-of-stock products (colored indicators)

🌗 Dark Mode Support

💾 LocalStorage Persistence – Data saved automatically

🧩 Reusable Components – Form fields, buttons, toolbars, tables

⚛️ React Hooks Used:
useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef

🛠️ Tech Stack
Category	Technology
Frontend Framework	React (Vite)
Language	TypeScript
Styling	Tailwind CSS
State Management	React Context API
Icons & Components	HeadlessUI, MUI Icons
Charts	Recharts
🚀 Getting Started
1️⃣ Clone the repo
git clone https://github.com/YOUR_USERNAME/inventory-dashboard.git
cd inventory-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Run locally
npm run dev


Then open http://localhost:5173
 in your browser.

🧩 Folder Structure
src/
 ├── components/       # Reusable UI components (FormField, Buttons, etc.)
 ├── contexts/         # React Contexts for data & navigation
 ├── pages/            # Products, Orders, Promos, Dashboard
 ├── hooks/            # Custom hooks
 ├── assets/           # SVG icons & static files
 └── main.tsx          # App entry point

⚙️ Validation Rules

Products cannot have negative stock.

Promo end date must be after start date.

Each order must include at least one product.

Adding an order reduces product stock automatically.

Products cannot be deleted — only deactivated.

Only active products appear in order dropdowns.
