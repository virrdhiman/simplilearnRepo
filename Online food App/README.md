# Savorly Food Ordering Application

Savorly is a responsive, front-end food ordering experience built with HTML, CSS, and JavaScript. Customers can browse a restaurant menu, search or filter dishes, manage a cart, place a simulated order, and review their recent orders.

## Run the application

No installation or build step is required.

1. Open `index.html` directly in a modern web browser.
2. Browse the dishes, use the category buttons or menu search, and select **+** to add food to the cart.
3. Open **Cart** in the header, adjust quantities, then select **Place order**.
4. Review the saved order in **My orders**.

Cart and order data are stored in the browser using `localStorage`; clearing browser site data resets the demo.

## Project structure

```text
.
├── index.html                  # Application markup and page sections
├── styles.css                  # Responsive layout, component, and visual styles
├── app.js                      # Menu data, cart/order state, and interactions
├── README.md                   # Quick-start instructions
└── docs/
    └── PROJECT_DOCUMENTATION.md # Features, architecture, and customization guide
```

See [project documentation](docs/PROJECT_DOCUMENTATION.md) for feature details and instructions for changing menu items, styling, and behavior. See the [project write-up](docs/PROJECT_WRITEUP.md) for a polished, human-readable project narrative.
