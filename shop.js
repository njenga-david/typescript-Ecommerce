// Define ShoppingCart class
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(products, listCard, total, quantity) {
        this.products = products;
        this.listCard = listCard;
        this.total = total;
        this.quantity = quantity;
        this.cart = [];
    }
    ShoppingCart.prototype.addToCart = function (productId) {
        var product = this.products.find(function (p) { return p.id === productId; });
        if (!product)
            return;
        var cartItem = this.cart.find(function (item) { return item.productId === productId; });
        if (cartItem) {
            if (product.stock > cartItem.quantity) {
                cartItem.quantity++;
            }
            else {
                alert('Not enough stock!');
            }
        }
        else {
            if (product.stock > 0) {
                this.cart.push({ productId: productId, quantity: 1 });
            }
            else {
                alert('Out of stock!');
            }
        }
        this.updateCart();
    };
    ShoppingCart.prototype.updateCart = function () {
        var _this = this;
        if (this.listCard && this.total && this.quantity) {
            this.listCard.innerHTML = '';
            var cartTotal_1 = 0;
            var cartQuantity_1 = 0;
            this.cart.forEach(function (item) {
                var product = _this.products.find(function (p) { return p.id === item.productId; });
                if (product) {
                    var listItem = document.createElement('li');
                    listItem.innerHTML = "\n                        <img src=\"images/".concat(product.image, "\" alt=\"").concat(product.name, "\">\n                        <div class=\"info\">\n                            <div class=\"name\">").concat(product.name, "</div>\n                            <div class=\"price\">").concat(product.price.toLocaleString(), "</div>\n                            <div class=\"quantity\">").concat(item.quantity, "</div>\n                        </div>");
                    _this.listCard.appendChild(listItem);
                    cartTotal_1 += product.price * item.quantity;
                    cartQuantity_1 += item.quantity;
                }
            });
            this.total.textContent = cartTotal_1.toLocaleString();
            this.quantity.textContent = cartQuantity_1.toString();
        }
    };
    ShoppingCart.prototype.applyDiscount = function (discountField) {
        var _a, _b;
        if (discountField && discountField.value !== '') {
            var discountPercentage = parseFloat(discountField.value);
            if (!isNaN(discountPercentage) && this.total) {
                var discountAmount = (discountPercentage / 100) * (parseInt((_a = this.total.textContent) !== null && _a !== void 0 ? _a : '0', 10));
                var discountedTotal = (parseInt((_b = this.total.textContent) !== null && _b !== void 0 ? _b : '0', 10)) - discountAmount;
                this.total.textContent = discountedTotal.toLocaleString();
                discountField.value = '';
            }
        }
    };
    ShoppingCart.prototype.checkout = function () {
        alert('Order placed successfully!');
        this.cart = []; // Clear the cart after placing the order
        this.updateCart();
    };
    return ShoppingCart;
}());
// Define Store class
var Store = /** @class */ (function () {
    function Store(products, list, cart) {
        this.products = products;
        this.list = list;
        this.cart = cart;
    }
    Store.prototype.initApp = function () {
        var _this = this;
        if (this.list) {
            this.products.forEach(function (product) {
                var newDiv = document.createElement('div');
                newDiv.classList.add('item');
                newDiv.innerHTML = "\n                    <img src=\"images/".concat(product.image, "\" alt=\"").concat(product.name, "\">\n                    <div class=\"title\">").concat(product.name, "</div>\n                    <div class=\"price\">").concat(product.price.toLocaleString(), "</div>\n                    <button class=\"add-to-cart\" data-id=\"").concat(product.id, "\">Add To Cart</button>");
                _this.list.appendChild(newDiv);
            });
            // Attach event listeners to buttons
            this.list.querySelectorAll('.add-to-cart').forEach(function (button) {
                button.addEventListener('click', function (event) {
                    var target = event.target;
                    var productId = parseInt(target.dataset.id);
                    _this.cart.addToCart(productId);
                });
            });
        }
    };
    return Store;
}());
// Initialization
var products = [
    { id: 1, name: 'woofer', image: 'woofer.jpeg', price: 6500, stock: 15 },
    { id: 2, name: 'Hp laptop', image: 'hp laptop.webp', price: 22000, stock: 15 },
    { id: 3, name: 'Extention', image: 'Extentions.jpeg', price: 2000, stock: 35 },
    { id: 9, name: 'hp laptop', image: 'laptop hp.webp', price: 29000, stock: 17 },
    { id: 5, name: 'Earponds', image: 'earpods.jpeg', price: 850, stock: 15 },
    { id: 6, name: 'Flamingo cables', image: 'powerbank.jpg', price: 500, stock: 14 },
    { id: 7, name: 'Lenovo laptop', image: 'hp laptop.webp', price: 20000, stock: 15 },
    { id: 8, name: 'Orimo powerBank', image: 'images.jpeg', price: 1100, stock: 20 },
    { id: 4, name: 'Digital printers', image: 'Digital-printing.jpg', price: 30000, stock: 15 },
    { id: 10, name: 'phone case', image: 'phone case1.jpg', price: 700, stock: 14 },
    { id: 11, name: 'power bank', image: 'powerbank.jpg', price: 2500, stock: 17 },
    { id: 12, name: 'Smart watch', image: 'watch.webp', price: 2000, stock: 35 },
    { id: 13, name: 'chargers', image: 'charger.jpeg', price: 500, stock: 15 },
    // Add other products here...
];
var list = document.querySelector('.list');
var listCard = document.querySelector('.listCard');
var total = document.querySelector('.total');
var quantity = document.querySelector('.quantity');
var checkoutButton = document.querySelector('.checkout');
var discountField = document.querySelector('.discount');
var discountApplyButton = document.querySelector('.applyDiscount');
var cartIcon = document.querySelector('#cart-icon');
var cartCard = document.querySelector('#cart-card');
var closeShoppingButton = document.querySelector('.closeShopping');
var cart = new ShoppingCart(products, listCard, total, quantity);
var store = new Store(products, list, cart);
window.addEventListener('load', function () { return store.initApp(); });
if (checkoutButton) {
    checkoutButton.addEventListener('click', function () { return cart.checkout(); });
}
if (discountApplyButton) {
    discountApplyButton.addEventListener('click', function () { return cart.applyDiscount(discountField); });
}
if (cartIcon) {
    cartIcon.addEventListener('click', function () {
        if (cartCard) {
            cartCard.style.display = 'block';
        }
    });
}
if (closeShoppingButton) {
    closeShoppingButton.addEventListener('click', function () {
        if (cartCard) {
            cartCard.style.display = 'none';
        }
    });
}
