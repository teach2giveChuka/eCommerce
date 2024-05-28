"use strict";
console.log('Test config');
console.log('Test config');
let productName = document.querySelector('#productName');
let productDescription = document.querySelector('#productDescription');
let productDetails = document.querySelector('#productDetails');
let pricee = document.querySelector('#price');
let image = document.querySelector('#image');
let form = document.querySelector('.form');
// Labels
let productNameLabel = document.querySelector('label[for="productName"]');
let productDescriptionLabel = document.querySelector('label[for="productDescription"]');
let productDetailsLabel = document.querySelector('label[for="productDetails"]');
let priceLabel = document.querySelector('label[for="price"]');
let imageLabel = document.querySelector('label[for="image"]');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    if (productName.value === '' || productDescription.value === '' || productDetails.value === '' || pricee.value === '' || image.value === '') {
        e.preventDefault();
        if (productName.value === '') {
            let productNameError = document.createElement('div');
            productNameError.textContent = 'Product Name cannot be empty';
            productNameError.style.color = 'red';
            productNameError.classList.add('error-message');
            productNameLabel.insertAdjacentElement('afterend', productNameError);
        }
        if (productDescription.value === '') {
            let productDescriptionError = document.createElement('div');
            productDescriptionError.textContent = 'Description cannot be empty';
            productDescriptionError.style.color = 'red';
            productDescriptionError.classList.add('error-message');
            productDescriptionLabel.insertAdjacentElement('afterend', productDescriptionError);
        }
        if (productDetails.value === '') {
            let productDetailsError = document.createElement('div');
            productDetailsError.textContent = 'Product Details cannot be empty';
            productDetailsError.style.color = 'red';
            productDetailsError.classList.add('error-message');
            productDetailsLabel.insertAdjacentElement('afterend', productDetailsError);
        }
        if (pricee.value === '') {
            let priceError = document.createElement('div');
            priceError.textContent = 'Price cannot be empty';
            priceError.style.color = 'red';
            priceError.classList.add('error-message');
            priceLabel.insertAdjacentElement('afterend', priceError);
        }
        if (image.value === '') {
            let imageError = document.createElement('div');
            imageError.textContent = 'Image URL cannot be empty';
            imageError.style.color = 'red';
            imageError.classList.add('error-message');
            imageLabel.insertAdjacentElement('afterend', imageError);
        }
        return;
    }
    let product = {
        name: productName.value,
        description: productDescription.value,
        details: productDetails.value,
        price: parseFloat(pricee.value),
        imageURL: image.value
    };
    console.log(JSON.stringify(product));
    try {
        fetch('http://localhost:3000/Products', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    }
    catch (e) {
        console.log(e);
    }
});
let deleteTable = document.querySelector('.deleteTable');
let table = document.createElement('table');
table.classList.add('productTable');
let tableHead = document.createElement('thead');
let tableBody = document.createElement('tbody');
table.appendChild(tableHead);
table.appendChild(tableBody);
deleteTable.appendChild(table);
let headers = ['Name', 'Price', 'Description', 'Details', 'Image', 'Actions'];
let headerRow = document.createElement('tr');
headers.forEach(headerText => {
    let header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
});
tableHead.appendChild(headerRow);
fetch('http://localhost:3000/Products')
    .then(response => {
    return response.json();
})
    .then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        let productDOM = create_Product(data[i]);
        tableBody.appendChild(productDOM);
    }
});
function create_Product(productData) {
    let commodity = document.createElement('tr');
    commodity.classList.add('item');
    let productName = document.createElement('td');
    let productDescription = document.createElement('td');
    let itemDescription = document.createElement('td');
    let price = document.createElement('td');
    let productImage = document.createElement('td');
    let buttons = document.createElement('td');
    productName.classList.add('productName');
    productDescription.classList.add('description');
    itemDescription.classList.add('productDescription');
    price.classList.add('price');
    productImage.classList.add('productImage');
    buttons.classList.add('buttons');
    productName.innerText = productData.name;
    productDescription.innerText = productData.description;
    itemDescription.innerText = productData.details;
    price.innerText = 'Ksh ' + productData.price;
    let image = document.createElement('img');
    image.src = productData.imageURL;
    image.classList.add('image');
    productImage.appendChild(image);
    let deleteItem = document.createElement('button');
    deleteItem.classList.add('delete');
    deleteItem.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    let viewItem = document.createElement('button');
    viewItem.classList.add('view');
    viewItem.innerHTML = `<ion-icon name="eye-outline"></ion-icon>`;
    let modifyItem = document.createElement('button');
    modifyItem.classList.add('modify');
    modifyItem.innerHTML = `<ion-icon name="clipboard-outline"></ion-icon>`;
    //event listeners for buttons
    deleteItem.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`clicked button delete for id: ${productData.id}`);
        function deleteProduct() {
            fetch(`http://localhost:3000/Products/${productData.id}`, {
                method: 'DELETE'
            });
        }
        deleteProduct();
    });
    // 
    // Pop up function
    function viewProduct() {
        fetch(`http://localhost:3000/Products/${productData.id}`)
            .then(response => response.json())
            .then(productData => {
            const popupContent = document.getElementById('popupContent');
            popupContent.innerHTML = `
                <div class="popup-content">
                    <img src="${productData.imageURL}" alt="Product Image" class="popup-image">
                    <div class="product-details">
                        <h2>${productData.name}</h2>
                        <p>Description: ${productData.description}</p>
                        <p>Details: ${productData.details}</p>
                        <p>Price: Ksh ${productData.price}</p>
                    </div>
                </div>
            `;
            const popup = document.getElementById('popup');
            popup.style.display = 'block';
        });
    }
    viewItem.addEventListener('click', (e) => {
        console.log(`clicked view items for product id: ${productData.id}`);
        e.preventDefault();
        viewProduct();
    });
    //exit popup
    const closePopupButton = document.getElementById('closePopup');
    closePopupButton.addEventListener('click', () => {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    });
    modifyItem.addEventListener('click', (e) => {
        e.preventDefault();
        modifyProduct(productData.id);
    });
    buttons.appendChild(modifyItem);
    buttons.appendChild(viewItem);
    buttons.appendChild(deleteItem);
    commodity.appendChild(productName);
    commodity.appendChild(price);
    commodity.appendChild(productDescription);
    commodity.appendChild(itemDescription);
    commodity.appendChild(productImage);
    commodity.appendChild(buttons);
    return commodity;
}