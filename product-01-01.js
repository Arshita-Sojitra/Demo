document.addEventListener("DOMContentLoaded", function () {
    // Initialize an empty cart or load from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const addToCartBtn = document.getElementById("addToCartBtn");
    const cartButton = document.getElementById("cartButton");
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const cartCountElement = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const quantityInput = document.getElementById("quantityInput");

    // Display cart count on page load
    cartCountElement.textContent = cartCount;

    // Increase/Decrease quantity logic for adding product
    document.getElementById("increaseQty").addEventListener("click", function () {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    document.getElementById("decreaseQty").addEventListener("click", function () {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    // Add to cart logic
    addToCartBtn.addEventListener("click", function () {
        const quantity = parseInt(quantityInput.value);
        const price = 86.00;
        const productName = "Custom Floral Designs";
        const totalPrice = quantity * price;
        const imageUrl = "image-01-01.jpg"; // Add the image URL

        const item = {
            name: productName,
            price: price,
            quantity: quantity,
            totalPrice: totalPrice,
            image: imageUrl, // Add image to the item
        };

        // Check if product already exists in the cart
        const product = cart.find(item => item.name === productName);
        if (product) {
            product.quantity += quantity;
            product.totalPrice = product.quantity * product.price;
        } else {
            cart.push(item);
        }

        cartCount += quantity;
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    });

    // Open cart modal on button click
    cartButton.addEventListener("click", function () {
        cartModal.show();
    });

    // Update cart UI for modal
    function updateCartDisplay() {
        cartCountElement.textContent = cartCount;
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
    }


    
    // Increase item quantity in cart
    window.increaseItemQuantity = function(index) {
        cart[index].quantity += 1;
        cart[index].totalPrice = cart[index].quantity * cart[index].price;
        cartCount++;
        updateCartDisplay();
        localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    };

    // Decrease item quantity in cart
    window.decreaseItemQuantity = function(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            cart[index].totalPrice = cart[index].quantity * cart[index].price;
            cartCount--;
            updateCartDisplay();
            localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
        } else {
            // Optionally, remove the item from cart when quantity is 0
            cart.splice(index, 1);
            updateCartDisplay();
            localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
        }
    };

    // Initial display of cart when page loads
    updateCartDisplay();
});




















// Checkout button will redirect to the checkout page
document.getElementById('checkoutBtn').addEventListener('click', function () {
    window.location.href = 'checkout.html';
});