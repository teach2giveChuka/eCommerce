document.addEventListener('DOMContentLoaded', () => {
    let cartCommodities = document.querySelector('.cartCommodities') as HTMLElement;

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

        let productName = document.createElement('div');
        productName.classList.add('productName');
        productName.innerText = productData.name;

        let productPrice = document.createElement('div');
        productPrice.classList.add('productPrice');
        productPrice.innerText = 'Price: Ksh ' + productData.price;

        let removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => {
            removeProduct(productData);
            cartProduct.remove();
        });

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
});
