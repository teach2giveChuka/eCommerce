document.addEventListener('DOMContentLoaded', () => {
    let cartCommodities = document.querySelector('.cartCommodities') as HTMLElement;
    let itemsCountElement = document.querySelector('.itemsCount') as HTMLElement;
    let totalPayableElement = document.querySelector('.payable') as HTMLElement;
    let modal = document.querySelector('.modal') as HTMLElement;
    let modalCloseButton = document.querySelector('.modal-close') as HTMLElement;
    let modalMessage = document.querySelector('.modal-message') as HTMLElement;
    let purchaseHistory: {}[] = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');

    if (!cartCommodities || !itemsCountElement || !totalPayableElement || !modal || !modalCloseButton || !modalMessage) {
        console.error('Required elements not found');
        return;
    }

    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

    updateItemsCount(cart.length);
    updateTotalPayable(cart);

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
        removeButton.innerHTML = `<div class="remove"><div class="rmBtn">Remove</div>&nbsp;<ion-icon name="bag-remove-outline"></ion-icon></div>`;

        removeButton.addEventListener('click', () => {
            removeProduct(productData);
            cartProduct.remove();
            updateItemsCount(cart.length);
            updateTotalPayable(cart);
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
            showModal('Your cart is empty!');
            return;
        }

        purchaseHistory.push(...cart);
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCommodities.innerText = 'Your cart is empty';
        updateItemsCount(cart.length);
        updateTotalPayable(cart);

        showModal('Checkout successful!');
    }

    function viewPurchaseHistory() {
        window.open('purchase-history.html');
    }

    function updateItemsCount(count: number) {
        itemsCountElement.innerText = count.toString();
    }

    function updateTotalPayable(cart: any[]) {
        let total = cart.reduce((sum, product) => sum + product.price, 0);
        totalPayableElement.innerText = 'Ksh ' + total;
    }

    function showModal(message: string) {
        modalMessage.innerText = message;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    modalCloseButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckout);
    document.getElementById('viewPurchaseHistory')?.addEventListener('click', viewPurchaseHistory);
});
