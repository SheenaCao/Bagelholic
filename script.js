document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Roseberry Cream Cheese', price: 3.68, image: 'images/rose.jpg' },
        { id: 2, name: 'Taro Cream Cheese', price: 3.68, image: 'images/taro.jpg' },
        { id: 3, name: 'Pumpkin Pork Floss', price: 3.68, image: 'images/Pumpkin.jpg' },
        { id: 4, name: 'Matcha Custard Cream', price: 4.68, image: 'images/matcha.jpg' },
        { id: 5, name: 'Black Sesame Cream Cheese', price: 4.68, image: 'images/Sesame.jpg' },
        { id: 6, name: 'Cinnamon Cream Cheese', price: 4.68, image: 'images/Cinnamon.jpg' }
    ];

    let cart = [];

    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button data-product-id="${product.id}">Add to Bag</button>
        `;
        productsContainer.appendChild(productElement);
    });

    document.getElementById('products').addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const productId = parseInt(target.dataset.productId, 10);
            addToCart(productId);
        }
    });

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            if (existingProduct.quantity < 3) {
                existingProduct.quantity++;
            } else {
                alert("Three's the charm! Limit of 3 per item.");
            }
        } else {
            cart.push({...product, quantity: 1});
        }
        renderCart();
        updateCartIcon();
    }

    function renderCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';
        let subtotal = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                ${item.name} - $${item.price} each
                <input type="number" value="${item.quantity}" min="1" max="3" onchange="updateQuantity(${item.id}, this.value)">
                <span class="remove-btn" onclick="removeItem(${item.id})">✖</span>
            `;
            cartContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });
        const taxRate = 0.08;  // Tax rate
        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        document.querySelector('.subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        document.querySelector('.tax').textContent = `Tax: $${tax.toFixed(2)}`;
        document.querySelector('.total').textContent = `Total: $${total.toFixed(2)}`;
    }

    window.updateQuantity = function(productId, quantity) {
        const product = cart.find(item => item.id === productId);
        if (quantity > 3) {
            alert("Three's the charm! Limit of 3 per item.");
            quantity = 3;
        }
        product.quantity = parseInt(quantity);
        renderCart();
        updateCartIcon();
    };

    window.removeItem = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
        updateCartIcon();
    };

    function updateCartIcon() {
        const cartIcon = document.getElementById('cart-icon');
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.textContent = `Shopping Bag (${itemCount})`;
    }

    window.toggleCart = function() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const productsContainer = document.getElementById('products');
        const isOpen = cartSidebar.style.right === '0px';
        cartSidebar.style.right = isOpen ? '-400px' : '0px';
        productsContainer.style.marginRight = isOpen ? '0' : '400px';
    };
});
