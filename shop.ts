interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

interface CartItem {
    productId: number;
    quantity: number;
}

class ShoppingCart {
    private cart: CartItem[] = [];

    constructor(
        private products: Product[],
        private listCard: HTMLElement,
        private total: HTMLElement,
        private quantityDisplay: HTMLElement
    ) {}

    addToCart(productId: number): void {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const cartItem = this.cart.find(item => item.productId === productId);
        if (cartItem) {
            if (product.stock > cartItem.quantity) {
                cartItem.quantity++;
            } else {
                alert('Not enough stock!');
            }
        } else {
            if (product.stock > 0) {
                this.cart.push({ productId: productId, quantity: 1 });
            } else {
                alert('Out of stock!');
            }
        }
    }

    removeFromCart(productId: number): void {
        const cartItemIndex = this.cart.findIndex(item => item.productId === productId);
        if (cartItemIndex > -1) {
            this.cart[cartItemIndex].quantity--;
            if (this.cart[cartItemIndex].quantity === 0) {
                this.cart.splice(cartItemIndex, 1);
            }
        }
    }

    updateCart(): void {
        if (this.listCard && this.total && this.quantityDisplay) {
            this.listCard.innerHTML = '';
            let cartTotal = 0;
            let cartQuantity = 0;

            this.cart.forEach((item) => {
                const product = this.products.find(p => p.id === item.productId);
                if (product) {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div class="info">
                            <div class="name">${product.name}</div>
                            <div class="quantity-controls">
                                <button class="decrease" data-id="${product.id}">-</button>
                                <div class="quantity">${item.quantity}</div>
                                <button class="increase" data-id="${product.id}">+</button>
                            </div>
                            <div class="price">${(product.price * item.quantity).toLocaleString()}</div>
                            <button class="delete" data-id="${product.id}">Delete</button>
                        </div>`;
                    this.listCard.appendChild(listItem);
                    cartTotal += product.price * item.quantity;
                    cartQuantity += item.quantity;
                }
            });

            this.total.textContent = cartTotal.toLocaleString();
            this.quantityDisplay.textContent = cartQuantity.toString();

            this.attachListenersToButtons();
        }
    }

    attachListenersToButtons(): void {
        this.listCard.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const productId = parseInt(target.dataset.id!);
                this.addToCart(productId);
                this.updateCart();
            });
        });

        this.listCard.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const productId = parseInt(target.dataset.id!);
                this.removeFromCart(productId);
                this.updateCart(); 
            });
        });

        this.listCard.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const productId = parseInt(target.dataset.id!);
            

                
                this.removeFromCart(productId);
            
                this.updateCart();
            });
        });
    }
}

class Store {
    constructor(
        private products: Product[],
        private list: HTMLElement,
        private cart: ShoppingCart
    ) {}

    initApp(): void {
        if (this.list) {
            this.products.forEach((product) => {
                const newDiv = document.createElement('div');
                newDiv.classList.add('item');
                newDiv.innerHTML = `
                    <div class="title">${product.name}</div>
                    <div class="price">${product.price.toLocaleString()}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add To Cart</button>`;
                this.list.appendChild(newDiv);
            });

            this.attachListenersToAddToCartButtons();
        }
    }

    attachListenersToAddToCartButtons(): void {
        this.list.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const productId = parseInt(target.dataset.id!);
                this.cart.addToCart(productId);
                this.cart.updateCart(); 
            });
        });
    }
}


const products: Product[] = [
    { id: 1, name: 'woofer', price: 6500, stock: 15 },
    { id: 2, name: 'Hp laptop', price: 22000, stock: 15 },
    
];

const list = document.querySelector('.list') as HTMLElement;
const listCard = document.querySelector('.listCard') as HTMLElement;
const total = document.querySelector('.total') as HTMLElement;
const quantityDisplay = document.querySelector('.quantityDisplay') as HTMLElement;

const cart = new ShoppingCart(products, listCard, total, quantityDisplay);
const store = new Store(products, list, cart);
store.initApp();

// const searchProducts = document.getElementById("searchInput") as HTMLInputElement;
// if (searchProducts) {
//     searchProducts.addEventListener("input", handleClick);
// }

// // function handleClick(event: Event): void {
// //     const searchItem = (event.target as HTMLInputElement).value.toLowerCase();
// //     const filteredProducts = products.filter(product => {
// //         return product.name.toLowerCase().indexOf(searchItem) !== -1;
// //     });
// //     Product.This.rendert(filteredProducts);
// // }