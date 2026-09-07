// ============================================================
// SAVORLY - FOOD ORDERING APPLICATION
// ============================================================


// ============================================================
// MENU DATA
// ============================================================

// Add, remove, or edit these objects to manage the restaurant menu.

const menuItems = [
  {
    id: 1,
    name: "Savorly Smash Burger",
    category: "Burgers",
    price: 12.5,
    description:
      "Double smashed patty, melty cheddar, house pickles & smoky sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    tag: "Bestseller",
  },

  {
    id: 2,
    name: "Truffle Mushroom Pasta",
    category: "Pasta",
    price: 15.0,
    description:
      "Silky tagliatelle, wild mushrooms, parmesan & truffle oil.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80",
    tag: "Chef's pick",
  },

  {
    id: 3,
    name: "Crispy Chicken Bowl",
    category: "Bowls",
    price: 13.5,
    description:
      "Golden chicken, jasmine rice, crunchy slaw & sesame drizzle.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    tag: "New",
  },

  {
    id: 4,
    name: "Garden Margherita",
    category: "Pizza",
    price: 14.0,
    description:
      "San Marzano tomato, fresh mozzarella, basil & olive oil.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },

  {
    id: 5,
    name: "Miso Salmon Bowl",
    category: "Bowls",
    price: 16.5,
    description:
      "Glazed salmon, avocado, edamame, rice & citrus greens.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },

  {
    id: 6,
    name: "Classic Tiramisu",
    category: "Desserts",
    price: 7.5,
    description:
      "Espresso-soaked ladyfingers and airy mascarpone cream.",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
];


// ============================================================
// CATEGORIES & APPLICATION STATE
// ============================================================

// Categories are derived from the menu,
// so new menu categories appear automatically.

const categories = [
  "All",
  ...new Set(menuItems.map((item) => item.category)),
];

let activeCategory = "All";

let cart = JSON.parse(
  localStorage.getItem("savorly-cart") || "[]"
);

let orders = JSON.parse(
  localStorage.getItem("savorly-orders") || "[]"
);


// ============================================================
// DOM ELEMENTS
// ============================================================

const foodGrid = document.querySelector("#food-grid");
const categoryList = document.querySelector("#category-list");
const searchInput = document.querySelector("#search-input");

const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");
const cartCount = document.querySelector("#cart-count");

const ordersList = document.querySelector("#orders-list");
const orderEmpty = document.querySelector("#order-empty");

const overlay = document.querySelector("#overlay");
const toast = document.querySelector("#toast");


// ============================================================
// UTILITY FUNCTIONS
// ============================================================

// Format numbers as currency.

function money(value) {
  return `$${value.toFixed(2)}`;
}


// ============================================================
// CATEGORY RENDERING
// ============================================================

// Render the selectable menu-category filters.

function renderCategories() {
  categoryList.innerHTML = categories
    .map(
      (category) => `
        <button
          class="category ${category === activeCategory ? "active" : ""}"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");
}


// ============================================================
// MENU RENDERING
// ============================================================

// Apply the active category and search text
// before displaying menu cards.

function renderMenu() {
  const query = searchInput.value.trim().toLowerCase();

  const items = menuItems.filter(
    (item) =>
      (activeCategory === "All" ||
        item.category === activeCategory) &&
      `${item.name} ${item.description}`
        .toLowerCase()
        .includes(query)
  );

  foodGrid.innerHTML = items.length
    ? items
        .map(
          (item) => `
            <article class="food-card">

              <div class="food-image">
                <img
                  src="${item.image}"
                  alt="${item.name}"
                />

                ${
                  item.tag
                    ? `<span>${item.tag}</span>`
                    : ""
                }
              </div>

              <div class="food-content">

                <p class="food-category">
                  ${item.category}
                </p>

                <h3>
                  ${item.name}
                </h3>

                <p>
                  ${item.description}
                </p>

                <div class="food-bottom">

                  <strong>
                    ${money(item.price)}
                  </strong>

                  <button
                    class="add-button"
                    data-id="${item.id}"
                    aria-label="Add ${item.name} to cart"
                  >
                    +
                  </button>

                </div>
              </div>

            </article>
          `
        )
        .join("")
    : `
        <p class="no-results">
          No dishes match your search.
          Try another craving.
        </p>
      `;
}


// ============================================================
// CART RENDERING
// ============================================================

// Keep the cart interface and browser storage
// synchronized after every cart change.

function renderCart() {
  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery = cart.length ? 2.5 : 0;

  // Update cart count
  cartCount.textContent = count;

  // Render cart items
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">

          <img
            src="${item.image}"
            alt=""
          />

          <div>

            <h3>
              ${item.name}
            </h3>

            <strong>
              ${money(item.price)}
            </strong>

            <div class="quantity">

              <button
                data-action="decrease"
                data-id="${item.id}"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                data-action="increase"
                data-id="${item.id}"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

          <button
            class="remove-button"
            data-action="remove"
            data-id="${item.id}"
            aria-label="Remove ${item.name}"
          >
            ×
          </button>

        </div>
      `
    )
    .join("");

  // Show/hide empty cart message
  cartEmpty.hidden = cart.length > 0;

  // Show/hide cart summary
  cartSummary.hidden = cart.length === 0;

  // Update totals
  document.querySelector("#subtotal").textContent =
    money(subtotal);

  document.querySelector("#delivery").textContent =
    money(delivery);

  document.querySelector("#total").textContent =
    money(subtotal + delivery);

  // Save cart to browser storage
  localStorage.setItem(
    "savorly-cart",
    JSON.stringify(cart)
  );
}


// ============================================================
// ORDER RENDERING
// ============================================================

// Display completed simulated orders
// saved in this browser.

function renderOrders() {
  orderEmpty.hidden = orders.length > 0;

  ordersList.innerHTML = orders
    .map(
      (order) => `
        <article class="order-card">

          <div>

            <span class="order-number">
              ${order.id}
            </span>

            <h3>
              ${order.items} item${
                order.items > 1 ? "s" : ""
              } · ${order.date}
            </h3>

            <p>
              Preparing your fresh order
            </p>

          </div>

          <div>

            <strong>
              ${money(order.total)}
            </strong>

            <span class="order-status">
              Confirmed
            </span>

          </div>

        </article>
      `
    )
    .join("");
}


// ============================================================
// CART OPERATIONS
// ============================================================

// Add a menu item,
// increasing its quantity when it is already in the cart.

function addToCart(id) {
  const product = menuItems.find(
    (item) => item.id === id
  );

  const existing = cart.find(
    (item) => item.id === id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  renderCart();

  showToast(
    `${product.name} added to your cart`
  );
}


// Update quantity or remove an item.

function updateQuantity(id, action) {
  const item = cart.find(
    (entry) => entry.id === id
  );

  if (!item) return;

  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;
  }

  if (
    action === "remove" ||
    item.quantity === 0
  ) {
    cart = cart.filter(
      (entry) => entry.id !== id
    );
  }

  renderCart();
}


// ============================================================
// SIDE PANEL CONTROLS
// ============================================================

// Only one slide-out panel is shown at a time.

function openPanel(id) {
  document
    .querySelectorAll(".side-panel")
    .forEach((panel) =>
      panel.classList.remove("open")
    );

  document
    .querySelector(`#${id}`)
    .classList.add("open");

  overlay.classList.add("visible");

  document
    .querySelector(`#${id}`)
    .setAttribute("aria-hidden", "false");
}


// Close all side panels.

function closePanels() {
  document
    .querySelectorAll(".side-panel")
    .forEach((panel) => {
      panel.classList.remove("open");

      panel.setAttribute(
        "aria-hidden",
        "true"
      );
    });

  overlay.classList.remove("visible");
}


// ============================================================
// TOAST NOTIFICATIONS
// ============================================================

function showToast(message) {
  toast.textContent = message;

  toast.classList.add("show");

  window.clearTimeout(
    showToast.timer
  );

  showToast.timer = window.setTimeout(
    () => toast.classList.remove("show"),
    2800
  );
}


// ============================================================
// CATEGORY EVENTS
// ============================================================

categoryList.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-category]"
      );

    if (!button) return;

    activeCategory =
      button.dataset.category;

    renderCategories();
    renderMenu();
  }
);


// ============================================================
// MENU EVENTS
// ============================================================

foodGrid.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-id]"
      );

    if (button) {
      addToCart(
        Number(button.dataset.id)
      );
    }
  }
);


// ============================================================
// CART EVENTS
// ============================================================

cartItems.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest(
        "[data-action]"
      );

    if (button) {
      updateQuantity(
        Number(button.dataset.id),
        button.dataset.action
      );
    }
  }
);


// ============================================================
// SEARCH
// ============================================================

searchInput.addEventListener(
  "input",
  renderMenu
);


// ============================================================
// CART PANEL
// ============================================================

document
  .querySelector("#cart-button")
  .addEventListener(
    "click",
    () => openPanel("cart-panel")
  );


// ============================================================
// PROFILE PANEL
// ============================================================

document
  .querySelector("#profile-button")
  .addEventListener(
    "click",
    () => openPanel("profile-panel")
  );


// ============================================================
// CLOSE BUTTONS
// ============================================================

document
  .querySelectorAll("[data-close]")
  .forEach((button) =>
    button.addEventListener(
      "click",
      closePanels
    )
  );


// ============================================================
// OVERLAY
// ============================================================

overlay.addEventListener(
  "click",
  closePanels
);


// ============================================================
// CHECKOUT
// ============================================================

document
  .querySelector("#checkout-button")
  .addEventListener(
    "click",
    () => {
      // Prevent checkout when cart is empty
      if (!cart.length) return;

      // Calculate order total
      const total = cart.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        2.5
      );

      // Create new order
      orders.unshift({
        id: `#SV-${String(
          Date.now()
        ).slice(-5)}`,

        items: cart.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        ),

        total,

        date: "Today",
      });

      // Empty cart
      cart = [];

      // Save orders
      localStorage.setItem(
        "savorly-orders",
        JSON.stringify(orders)
      );

      // Refresh UI
      renderCart();
      renderOrders();

      // Close cart panel
      closePanels();

      // Show confirmation
      showToast(
        "Order confirmed! Your food is being prepared."
      );

      // Scroll to orders section
      document
        .querySelector("#orders")
        .scrollIntoView({
          behavior: "smooth",
        });
    }
  );


// ============================================================
// ORDERS LINK
// ============================================================

document
  .querySelector("#orders-link")
  .addEventListener(
    "click",
    renderOrders
  );


// ============================================================
// INITIAL APPLICATION LOAD
// ============================================================

renderCategories();
renderMenu();
renderCart();
renderOrders();