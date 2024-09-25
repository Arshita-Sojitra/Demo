document.addEventListener("DOMContentLoaded", function () {
    // Initialize cart from localStorage or an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartButton = document.getElementById("cartButton");
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const cartCountElement = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    // Display cart count on page load
    cartCountElement.textContent = cartCount;

    // Function to update the cart UI
    function updateCartDisplay() {
        cartItems.innerHTML = ''; // Clear existing items
        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.totalPrice;

            const cartItem = `
                <div class="d-flex justify-content-between align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;"> <!-- Display product image -->
                    <span>${item.name}</span>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-outline-secondary btn-sm" onclick="decreaseItemQuantity(${index})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="increaseItemQuantity(${index})">+</button>
                    </div>
                    <span>$${item.totalPrice.toFixed(2)}</span>
                </div>
                <hr>
            `;
            cartItems.insertAdjacentHTML("beforeend", cartItem);
        });

        cartTotal.textContent = `$${subtotal.toFixed(2)}`;
        cartCountElement.textContent = cartCount;
    }

    // Open the cart modal
    cartButton.addEventListener("click", function () {
        cartModal.show();
    });

    // Increase item quantity in cart
    window.increaseItemQuantity = function (index) {
        cart[index].quantity += 1;
        cart[index].totalPrice = cart[index].quantity * cart[index].price;
        cartCount++;
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    };

    // Decrease item quantity in cart
    window.decreaseItemQuantity = function (index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            cart[index].totalPrice = cart[index].quantity * cart[index].price;
            cartCount--;
        } else {
            cart.splice(index, 1); // Remove the item if quantity reaches 0
            cartCount--;
        }
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    };

    // Initial display of the cart
    updateCartDisplay();
});

// Checkout button logic
document.getElementById('checkoutBtn').addEventListener('click', function () {
    window.location.href = 'checkout.html';
});
