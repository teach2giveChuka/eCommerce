document.addEventListener('DOMContentLoaded', () => {
    let commodities = document.querySelector('.comodities') as HTMLElement;
    let cartCountElement = document.getElementById('cartCount') as HTMLElement;
    
    if (!commodities) {
        console.error('Commodities element not found');
        return;
    }

    let cart: {}[] = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCartCount(cart);

    fetch('http://localhost:3000/Products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            data.forEach((product: any) => {
                let productDOM = createProduct(product);
                if (productDOM) {
                    commodities.appendChild(productDOM);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    function createProduct(productData: any): HTMLElement {
        let commodity = document.createElement('div');
        commodity.classList.add('commodity');

        let productImage = document.createElement('div');
        productImage.classList.add('productImage');

        let image = document.createElement('img');
        image.src = productData.imageURL;
        image.classList.add('image');

        let productDetails = document.createElement('div');
        productDetails.classList.add('productDetails');

        let productName = document.createElement('div');
        productName.classList.add('productName');
        productName.innerText = productData.name;

        let productDescription = document.createElement('div');
        productDescription.classList.add('description');
        productDescription.innerText = productData.description;

        let price = document.createElement('div');
        price.classList.add('price');
        price.innerText = ' Ksh ' + productData.price;

        let stars = document.createElement('div');
        stars.classList.add('stars');
        stars.innerHTML = `
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <div class="rates">(100)</div>
        `;

        let addToCart = document.createElement('button');
        addToCart.classList.add('addToCart');
        addToCart.innerHTML = `<ion-icon name="bag-add-outline"></ion-icon> &nbsp; Add to Cart`;

        // Add event listener to the button
        addToCart.addEventListener('click', () => {
            cart.push(productData);
            localStorage.setItem('cart', JSON.stringify(cart));
            showPopup('Successfully added to cart!');
            updateCartCount(cart);
        });

        productImage.appendChild(image);
        productDetails.appendChild(productName);
        productDetails.appendChild(productDescription);
        productDetails.appendChild(price);
        productDetails.appendChild(stars);
        productDetails.appendChild(addToCart);

        commodity.appendChild(productImage);
        commodity.appendChild(productDetails);

        return commodity;
    }

    function showPopup(message: string) {
        let popup = document.getElementById('popup') as HTMLElement;
        popup.innerText = message;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000); 
    }

    function updateCartCount(cart: {}[]) {
        cartCountElement.innerText = cart.length.toString();
    }

    let cartIcon = document.getElementById('cartIcon');

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
});
