# Savorly: Online Food Ordering Application

## Introduction

Savorly is an online food ordering application designed to make ordering meals feel simple, quick, and enjoyable. Instead of calling a restaurant or waiting in a queue, customers can explore dishes, choose what they like, add items to a cart, and place an order from one responsive web page.

The project reflects a common real-world need. People increasingly expect food ordering to be convenient, accurate, and available from any device. Restaurants also benefit when customers can review a clear menu and submit their own order details, reducing avoidable mistakes and manual effort.

## Problem statement

Traditional food ordering often depends on in-person ordering, telephone calls, or handwritten records. These methods can create delays, miscommunication, and incorrect orders. They may also make it difficult for customers to compare dishes, see prices, or change their order before it is submitted.

Savorly addresses these problems through a digital ordering flow. Customers can browse a visual menu, search for a dish, filter dishes by category, and review their selections in a cart before confirming an order. This creates a smoother customer experience and demonstrates how a simple web application can support restaurant operations.

## Solution

The application provides a friendly, restaurant-style interface built around the customer journey:

1. The customer lands on a welcoming home section and can move directly to the menu.
2. They browse dishes such as burgers, pasta, bowls, pizza, and desserts.
3. They can filter dishes by category or search using keywords.
4. They add dishes to a cart and adjust quantities as needed.
5. The cart automatically calculates subtotal, delivery cost, and total amount.
6. When the customer places the order, the application confirms it and shows it in the order-history section.

The design is responsive, so it remains practical and visually clear on desktops, tablets, and mobile phones.

## Key features

### Easy menu discovery

Each menu item includes a food image, category, name, short description, price, and optional label such as “Bestseller” or “Chef's pick.” The category controls and search field help users quickly find the food they want.

### Interactive cart

The shopping cart lets customers add items, increase or decrease quantities, remove items, and see updated prices immediately. This makes the ordering process more transparent and helps users check their final selection before checkout.

### Simulated order placement

When an order is placed, Savorly creates a confirmation record with an order ID, item count, date, total, and status. The cart is then cleared so the customer can start a new order.

### Profile and delivery details

A profile panel demonstrates how customer information, delivery addresses, and payment details can be presented in a real food ordering platform.

### Browser-based persistence

The cart and order history are stored with browser `localStorage`. This means the sample order data remains available when the page is refreshed, without requiring a database for this front-end project.

## Technologies used

| Technology | Use in the project |
|---|---|
| HTML5 | Provides the page structure, accessible controls, content sections, and panels. |
| CSS3 | Creates the visual theme, layout, card components, responsive behavior, and animations. |
| JavaScript | Manages menu rendering, filtering, search, cart operations, checkout, and local storage. |
| Google Fonts | Supplies the DM Sans and Playfair Display typefaces used in the interface. |
| Unsplash image URLs | Provide food imagery for the project demonstration. |

## Project structure

```text
simplilearnRepo/
├── index.html
├── styles.css
├── app.js
├── README.md
└── docs/
    ├── PROJECT_DOCUMENTATION.md
    └── PROJECT_WRITEUP.md
```

`index.html` contains the visual structure of the application. `styles.css` is responsible for the appearance and responsive layout. `app.js` contains the menu data and all interactive behavior. The `docs` folder contains the project documentation and this write-up.

## Conclusion

Savorly demonstrates how a focused front-end application can make food ordering clearer and more convenient. It gives customers the ability to browse a menu, manage their cart, and confirm orders in a smooth digital flow. At the same time, it provides a strong foundation for a larger restaurant platform.

In a production version, the next stage would be connecting the interface to a secure backend for user accounts, restaurant menu management, real payments, order tracking, and delivery updates. For this project, Savorly successfully shows the core customer-facing experience of a modern online food ordering application.
