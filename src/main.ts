console.log('Test config');
console.log('Test config');

// ADMIN PAGE TYPESCRIPT
interface Product {
    name: string;
    description: string;
    details: string;
    price: number;
    imageURL: string;
}

let productName = document.querySelector('#productName') as HTMLInputElement;
let productDescription = document.querySelector('#productDescription') as HTMLInputElement;
let productDetails = document.querySelector('#productDetails') as HTMLInputElement;
let pricee = document.querySelector('#price') as HTMLInputElement;
let image = document.querySelector('#image') as HTMLInputElement;
let form = document.querySelector('.form') as HTMLFormElement;
// labels
let productNameLabel = document.querySelector('label[for="productName"]') as HTMLElement;
let productDescriptionLabel = document.querySelector('label[for="productDescription"]') as HTMLElement;
let productDetailsLabel = document.querySelector('label[for="productDetails"]') as HTMLElement;
let priceLabel = document.querySelector('label[for="price"]') as HTMLElement;
let imageLabel = document.querySelector('label[for="image"]') as HTMLElement;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (productName.value === '' || productDescription.value === '' || productDetails.value === '' || pricee.value === '' || image.value === '') {
        e.preventDefault();
        // Error message for empty fields on submit
        if (productName.value === '') {
            let productNameError = document.createElement('div');
            productNameError.textContent = 'Product Name cannot be empty';
            productNameError.style.color = 'red';
            productNameLabel.insertAdjacentElement('afterend', productNameError);
        }

        if (productDescription.value === '') {
            let productDescriptionError = document.createElement('div');
            productDescriptionError.textContent = 'Description cannot be empty';
            productDescriptionError.style.color = 'red';
            productDescriptionLabel.insertAdjacentElement('afterend', productDescriptionError);
        }

        if (productDetails.value === '') {
            let productDetailsError = document.createElement('div');
            productDetailsError.textContent = 'Product Details cannot be empty';
            productDetailsError.style.color = 'red';
            productDetailsLabel.insertAdjacentElement('afterend', productDetailsError);
        }

        if (pricee.value === '') {
            let priceError = document.createElement('div');
            priceError.textContent = 'Price cannot be empty';
            priceError.style.color = 'red';
            priceLabel.insertAdjacentElement('afterend', priceError);
        }

        if (image.value === '') {
            let imageError = document.createElement('div');
            imageError.textContent = 'Image URL cannot be empty';
            imageError.style.color = 'red';
            imageLabel.insertAdjacentElement('afterend', imageError);
        }
        return;
    }

    // object for product
    let product: Product = {
        name: productName.value,
        description: productDescription.value,
        details: productDetails.value,
        price: parseFloat(pricee.value),
        imageURL: image.value
    }
    console.log(JSON.stringify(product))
    try {
        fetch('http://localhost:3000/Products', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    } catch (e) {
        console.log(e);
    }
});

// Products view
let deleteTable = document.querySelector('.deleteTable') as HTMLElement;

// Create a responsive table container
let tableContainer = document.createElement('div');
tableContainer.classList.add('table-responsive');

let table = document.createElement('table');
let thead = document.createElement('thead');
let headerRow = document.createElement('tr');

let headers = ['Name', 'Price', 'Description', 'Details', 'Image', 'Options']; // 'Options' as alternate name for 'Actions'
headers.forEach(headerText => {
    let th = document.createElement('th');
    th.innerText = headerText;
    headerRow.appendChild(th);
});

thead.appendChild(headerRow);
table.appendChild(thead);

let tbody = document.createElement('tbody');
table.appendChild(tbody);
tableContainer.appendChild(table);
deleteTable.appendChild(tableContainer);

fetch('http://localhost:3000/Products')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            let productRow = createProductRow(product);
            tbody.appendChild(productRow);
        });
    });

function createProductRow(productData: any): HTMLTableRowElement {
    let row = document.createElement('tr');

    let nameCell = document.createElement('td');
    let name = document.createElement('div');
    name.classList.add('productName');
    name.innerText = productData.name;
    nameCell.appendChild(name);

    let priceCell = document.createElement('td');
    let price = document.createElement('div');
    price.classList.add('price');
    price.innerText = 'Ksh ' + productData.price;
    priceCell.appendChild(price);

    let descriptionCell = document.createElement('td');
    let description = document.createElement('div');
    description.classList.add('productDescription');
    description.innerText = productData.description;
    descriptionCell.appendChild(description);

    let detailsCell = document.createElement('td');
    let details = document.createElement('div');
    details.classList.add('productDetail');
    details.innerText = productData.details;
    detailsCell.appendChild(details);

    let imageCell = document.createElement('td');
    let image = document.createElement('img');
    image.src = productData.imageURL;
    image.classList.add('image');
    image.style.width = '50px';
    image.style.height = '50px';
    imageCell.appendChild(image);

    let actionsCell = document.createElement('td');

    let modifyButton = document.createElement('button');
    modifyButton.classList.add('modify');
    modifyButton.innerHTML = '<ion-icon name="eye-outline"></ion-icon> &nbsp; MODIFY';

    let viewButton = document.createElement('button');
    viewButton.classList.add('view');
    viewButton.innerHTML = '<ion-icon name="eye-outline"></ion-icon> &nbsp; VIEW';

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon> &nbsp; DELETE';

    actionsCell.appendChild(modifyButton);
    actionsCell.appendChild(viewButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(descriptionCell);
    row.appendChild(detailsCell);
    row.appendChild(imageCell);
    row.appendChild(actionsCell);

    return row;
}
