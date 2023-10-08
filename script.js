        const incrementButtons = document.querySelectorAll('.change-quanity-plus');
        const decrementButtons = document.querySelectorAll('.change-quanity-minus');
        const cartItems = document.querySelector('.cart-items');
        const cartEmptyMessage = document.querySelector('.cart-empty');
        const totalPriceElement = document.querySelector('.total-price');
        const totalElement=document.querySelector(".total")

        let productPrices = {};

         // Initialize product prices
         document.querySelectorAll('.product-details').forEach(product => {
             const productName = product.getAttribute('data-product');
             const price = parseFloat(product.getAttribute('data-price'));
             productPrices[productName] = price;
        });


        // Function to handle increment button click
        function handleIncrementClick(event) {
            const product = event.target.closest('.product-details'); // Find the closest '.product' container
            const quantityElement = product.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;

            // If quantity is greater than 0, add to cart or update cart item
            if (quantity > 0) {
                const productName = product.getAttribute('data-product');
                const productPrice=product.getAttribute('data-price')
                addToCart(productName, quantity, productPrice);
            }
        }

        // Function to handle decrement button click
        function handleDecrementClick(event) {
            const product = event.target.closest('.product-details'); // Find the closest '.product' container
            const quantityElement = product.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);

            // Ensure quantity is not negative
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;

                const productName = product.getAttribute('data-product');
                updateCart(productName, quantity);

                // If quantity becomes 0, remove from cart
                if (quantity === 0) {
                    removeFromCart(productName);
                }
            }
        }

        function addToCart(productName, quantity, productPrice) {
            const cartItem = cartItems.querySelector(`[data-cart-product="${productName}"]`);
            if (cartItem) {
                cartItem.querySelector('.quantity').textContent = quantity;
            } else {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.setAttribute('data-cart-product', productName);
                cartItem.innerHTML = `
                    <span>${productName}</span>
                    <span class="price">${productPrice} X <span class="quantity">${quantity}</span></span>
                `;
                cartItems.appendChild(cartItem);
            }

            updateCartVisibility();
            updateTotalPrice();


        }

        // Function to update the quantity of a product in the cart
        function updateCart(productName, quantity) {
            const cartItem = cartItems.querySelector(`[data-cart-product="${productName}"]`);
            if (cartItem) {
                cartItem.querySelector('.quantity').textContent = quantity;
            }

            updateCartVisibility();
            updateTotalPrice();

        }

        // Function to remove a product from the cart
        function removeFromCart(productName) {
            const cartItem = cartItems.querySelector(`[data-cart-product="${productName}"]`);
            if (cartItem) {
                cartItems.removeChild(cartItem);
            }

            updateCartVisibility();
            updateTotalPrice();

        }

          // Function to update cart visibility and display "No Product added to the cart" when empty
          function updateCartVisibility() {
            const cartItemElements = cartItems.querySelectorAll('.cart-item');
            if (cartItemElements.length === 0) {
                cartEmptyMessage.style.display = 'block';
                totalElement.style.display = 'none';

            } else {
                cartEmptyMessage.style.display = 'none';
                totalElement.style.display = 'block';

            }
        }

          // Function to calculate and update the total cart price
          function updateTotalPrice() {
            let total = 0;
            const cartItemElements = cartItems.querySelectorAll('.cart-item');
            cartItemElements.forEach(cartItem => {
                const productName = cartItem.getAttribute('data-cart-product');
                const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
                const price = productPrices[productName];
                total += quantity * price;
            });
            totalPriceElement.textContent = total.toFixed(2); // Display total with two decimal places
        }

         // Add click event listeners to increment and decrement buttons
         incrementButtons.forEach(button => {
            button.addEventListener('click', handleIncrementClick);
        });

        decrementButtons.forEach(button => {
            button.addEventListener('click', handleDecrementClick);
        });

        // Initially hide the cart empty message
        updateCartVisibility();
        updateTotalPrice();



        // Custom contains() function for case-insensitive search
        HTMLElement.prototype.containsText = function (text) {
            return this.textContent.toLowerCase().includes(text.toLowerCase());
        };
