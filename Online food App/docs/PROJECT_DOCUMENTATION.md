# Project Documentation

## Overview

Savorly demonstrates a client-side online food ordering application. It is intentionally dependency-free: the browser renders the interface and JavaScript manages all interaction and state.

## Features

| Area | Behavior |
|---|---|
| Responsive interface | The layout adapts from a multi-column desktop experience to compact mobile cards and navigation. |
| Menu browsing | Customers can filter dishes by category and search dish names or descriptions. |
| Cart | Customers can add dishes, change quantities, remove dishes, and see delivery and total costs. |
| Checkout | Selecting **Place order** creates a simulated confirmed order and clears the cart. |
| Order history | Completed orders appear in the **My orders** section. |
| Profile | The header avatar opens a sample customer profile and delivery details. |
| Persistence | Cart and order history survive browser refreshes with `localStorage`. |

## Application structure

### `index.html`

Contains the page structure:

- Sticky navigation and header controls
- Hero and menu sections
- Category filter and search input
- Cart and profile slide-out panels
- Order-history section and footer

The final script tag loads `app.js`, so page elements exist before JavaScript attaches interaction handlers.

### `styles.css`

Defines shared color variables, typography, responsive grid layouts, cards, buttons, panels, and breakpoints. The stylesheet uses two responsive breakpoints:

- `780px`: tablet and smaller layouts
- `430px`: compact phone layouts

### `app.js`

Holds the menu data and all browser behavior. The primary functions are:

| Function | Purpose |
|---|---|
| `renderCategories()` | Draws category-filter buttons from the menu data. |
| `renderMenu()` | Filters and displays dish cards. |
| `renderCart()` | Calculates cart totals and renders cart contents. |
| `renderOrders()` | Renders orders saved after checkout. |
| `addToCart()` | Adds a dish or increases an existing dish quantity. |
| `updateQuantity()` | Changes a cart item quantity or removes an item. |
| `openPanel()` / `closePanels()` | Controls the cart and profile panels. |

## Customization guide

### Change the menu

Edit the `menuItems` array near the beginning of `app.js`. Every item should use this shape:

```js
{
  id: 7,
  name: "Dish name",
  category: "Category",
  price: 10.5,
  description: "A short customer-facing description.",
  image: "https://example.com/dish.jpg",
  tag: "Optional label"
}
```

The category filter is generated automatically from the `category` values. Use a unique numeric `id` for every dish. Leave `tag` as an empty string when no label is needed.

### Change delivery pricing

The delivery charge is currently `$2.50`. Update the `delivery` constant in `renderCart()` and the starting value in the checkout handler in `app.js` together so the cart and placed-order total remain consistent.

### Change colors and typography

Update the color variables at the beginning of `styles.css`. For example, change `--orange` to update the primary buttons, highlighted headings, and accents consistently.

### Reset sample data

Open the browser developer tools and run:

```js
localStorage.removeItem("savorly-cart");
localStorage.removeItem("savorly-orders");
```

Refresh the page after running the commands.

## Current limitations

This is a front-end project demonstration. It does not include server authentication, a database, real payment processing, restaurant administration, or live delivery tracking. A production implementation would replace browser storage with authenticated API requests and secure server-side order/payment handling.
