document.addEventListener('DOMContentLoaded', () => {
    let cartCommodities = document.querySelector('.cartCommodities') as HTMLElement;
    let purchaseHistory: {}[] = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');

    if (!cartCommodities) {
        console.error('Cart commodities element not found');
        return;
    }

    let cart: {}[] = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart.length === 0) {
        cartCommodities.innerText = 'Your cart is empty';
        return;
    }

    cart.forEach((product: any) => {
        let productDOM = createCartProduct(product);
        if (productDOM) {
            cartCommodities.appendChild(productDOM);
        }
    });

    function createCartProduct(productData: any): HTMLElement {
        let cartProduct = document.createElement('div');
        cartProduct.classList.add('cartProduct');

        let productImage = document.createElement('img');
        productImage.className = 'productImagee';
        productImage.src = productData.imageURL;

        let productName = document.createElement('div');
        productName.classList.add('productName');
        productName.innerText = productData.name;

        let productPrice = document.createElement('div');
        productPrice.classList.add('productPrice');
        productPrice.innerText = 'Price: Ksh ' + productData.price;

        let removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.innerHTML = `<div class = "remove"> <div class = "rmBtn">Remove</div>&nbsp;<ion-icon name="bag-remove-outline"></ion-icon></div>`;

        removeButton.addEventListener('click', () => {
            removeProduct(productData);
            cartProduct.remove();
        });

        cartProduct.appendChild(productImage);
        cartProduct.appendChild(productName);
        cartProduct.appendChild(productPrice);
        cartProduct.appendChild(removeButton);

        return cartProduct;
    }

    function removeProduct(productData: any) {
        let updatedCart = cart.filter(item => item !== productData);
        cart = updatedCart;
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    function handleCheckout(event: Event) {
        event.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Add current cart items to purchase history
        purchaseHistory.push(...cart);
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCommodities.innerText = 'Your cart is empty';

        alert('Checkout successful!');
    }

    function viewPurchaseHistory() {
        window.open('purchase-history.html');
    }

    document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckout);
    document.getElementById('viewPurchaseHistory')?.addEventListener('click', viewPurchaseHistory);
});
