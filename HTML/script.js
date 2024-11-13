// 1. Define the Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// 2. Define the ShoppingCartItem class
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Method to calculate the total price for the item (product price * quantity)
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// 3. Define the ShoppingCart class
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Method to get the total number of items in the cart
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Method to get the total price of all items in the cart
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Method to add a product to the cart
  addItem(product, quantity) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.updateCartDisplay();
  }

  // Method to remove an item from the cart by product ID
  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.updateCartDisplay();
  }

  // Method to display the items in the cart
  showItems() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    this.items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `${item.product.name} x${item.quantity} - ${item.getTotalPrice()}€ 
                      <button onclick="removeFromCart(${item.product.id})">Remove</button>`;
      cartItems.appendChild(li);
    });

    // Update the total price and item count
    const totalPrice = this.getTotalPrice();
    const totalItems = this.getTotalItems();
    document.getElementById('cartTotal').innerHTML = `Total: ${totalPrice}€`;
    document.getElementById('cartItemCount').innerHTML = `Total Items: ${totalItems}`;
  }

  // Method to update the cart display
  updateCartDisplay() {
    this.showItems();
  }

  // Method to empty the cart
  clearCart() {
    this.items = [];
    this.updateCartDisplay();
  }
}

// 4. Create a global shopping cart instance
const cart = new ShoppingCart();

// 5. Function to add a product to the cart
window.addToCart = function(id, name, price) {
  const product = new Product(id, name, price); // Create a new product instance
  cart.addItem(product, 1); // Add product to the cart with quantity 1
};

// 6. Function to remove a product from the cart
window.removeFromCart = function(productId) {
  cart.removeItem(productId); // Remove item by product ID
};

// 7. Function to empty the cart
window.clearCart = function() {
  cart.clearCart(); // Empty all items in the cart
};

// 8. Testing Methods
window.testAddProduct = function() {
  const newProduct1 = new Product(3, 'Product 3', 30);
  const newProduct2 = new Product(4, 'Product 4', 50);
  console.log('Products Created:', newProduct1, newProduct2);
};

window.testCreateCart = function() {
  const newCart = new ShoppingCart();
  console.log('Cart Created:', newCart);
};

window.testAddItemToCart = function() {
  const product1 = new Product(1, 'Product 1', 20);
  const product2 = new Product(2, 'Product 2', 15);
  cart.addItem(product1, 1);  // Add Product 1 to the cart
  cart.addItem(product2, 2);  // Add Product 2 to the cart
  console.log('Items Added to Cart');
};

window.testShowCart = function() {
  cart.showItems();  // Display all items in the cart
  console.log('Cart Items Displayed');
};

window.testRemoveItemFromCart = function() {
  cart.removeItem(1);  // Remove Product 1 from the cart
  console.log('Product 1 Removed from Cart');
};

window.testEmptyCart = function() {
  cart.clearCart();  // Empty the cart
  console.log('Cart Emptied');
};
