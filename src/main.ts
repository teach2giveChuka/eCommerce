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

// Labels
let productNameLabel = document.querySelector('label[for="productName"]') as HTMLElement;
let productDescriptionLabel = document.querySelector('label[for="productDescription"]') as HTMLElement;
let productDetailsLabel = document.querySelector('label[for="productDetails"]') as HTMLElement;
let priceLabel = document.querySelector('label[for="price"]') as HTMLElement;
let imageLabel = document.querySelector('label[for="image"]') as HTMLElement;

let buttonUpdate = document.querySelector('.btnupdate') as HTMLButtonElement;
let addnewItem = document.querySelector('.addnewItem') as HTMLButtonElement;


let formToggle = document.querySelector('.containerForm') as HTMLElement;
let buttonToggle = document.querySelector('.addProdyctbtn') as HTMLButtonElement;
let exit = document.querySelector('.exit') as HTMLElement;

exit.addEventListener('click',(e)=>{
    e.preventDefault();
    formToggle.style.display = 'none';
    buttonToggle.style.display = "flex";

    buttonUpdate.style.display = 'none';
     addnewItem.style.display = 'block';
}) 

buttonToggle.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('clicked');
    formToggle.style.display = 'block';
    buttonToggle.style.display = "none";
    let txt = document.querySelector('.txt') as HTMLElement;
        txt.textContent = "Add New Product";
})

function showPopup(message: string, bgColor: string) {
    const popup = document.querySelector('.popupp') as HTMLElement;
    popup.textContent = message;
    popup.style.backgroundColor = bgColor;
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}


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


    let product: Product = {
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
    } catch (e) {
        console.log(e);
    }

    showPopup('Product added successfully!', '#4CAF50');
});

let deleteTable = document.querySelector('.deleteTable') as HTMLElement;

let table = document.createElement('table') as HTMLTableElement;
table.classList.add('productTable');

let tableHead = document.createElement('thead') as HTMLTableSectionElement;
let tableBody = document.createElement('tbody') as HTMLTableSectionElement;

table.appendChild(tableHead);
table.appendChild(tableBody);
deleteTable.appendChild(table);

let headers = ['Name', 'Price', 'Description', 'Details', 'Image', 'Actions'];
let headerRow = document.createElement('tr') as HTMLTableRowElement;
headers.forEach(headerText => {
    let header = document.createElement('th') as HTMLTableCellElement;
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

function create_Product(productData: any): HTMLTableRowElement {
    let commodity = document.createElement('tr') as HTMLTableRowElement;
    commodity.classList.add('item');

    let productName = document.createElement('td') as HTMLTableCellElement;
    let productDescription = document.createElement('td') as HTMLTableCellElement;
    let itemDescription = document.createElement('td') as HTMLTableCellElement;
    let price = document.createElement('td') as HTMLTableCellElement;
    let productImage = document.createElement('td') as HTMLTableCellElement;
    let buttons = document.createElement('td') as HTMLTableCellElement;

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

    let image = document.createElement('img') as HTMLImageElement;
    image.src = productData.imageURL;
    image.classList.add('image');
    productImage.appendChild(image);

    let deleteItem = document.createElement('button') as HTMLButtonElement;
    deleteItem.classList.add('delete');
    deleteItem.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;

    let viewItem = document.createElement('button') as HTMLButtonElement;
    viewItem.classList.add('view');
    viewItem.innerHTML = `<ion-icon name="eye-outline"></ion-icon>`;

    let modifyItem = document.createElement('button') as HTMLButtonElement;
    modifyItem.classList.add('modify');
    modifyItem.innerHTML = `<ion-icon name="clipboard-outline"></ion-icon>`;

    
    deleteItem.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`clicked button delete for id: ${productData.id}`)
        function deleteProduct() {
            fetch(`http://localhost:3000/Products/${productData.id}`, {
                method: 'DELETE'
            })
            showPopup('Product updated successfully!', '#4CAF50');
        }
        deleteProduct();
    })

   
    // Pop up function
    function viewProduct() {
        fetch(`http://localhost:3000/Products/${productData.id}`)
            .then(response => response.json())
            .then(productData => {
                const popupContent = document.getElementById('popupContent') as HTMLDivElement;
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
                const popup = document.getElementById('popup') as HTMLElement;
                popup.style.display = 'block';
            })

    }
    viewItem.addEventListener('click', (e) => {
        console.log(`clicked view items for product id: ${productData.id}`)
        e.preventDefault();
        viewProduct();
    })
    
    //exit popup
    const closePopupButton = document.getElementById('closePopup') as HTMLButtonElement;
    closePopupButton.addEventListener('click', () => {
        const popup = document.getElementById('popup') as HTMLDivElement;
        popup.style.display = 'none';
    });


    
//modify functioanlity to be added later

function modifyProduct():void{
    fetch(`http://localhost:3000/Products/${productData.id}`)
    .then(response => response.json())
    .then(productData => {
        // let productNameInput = document.querySelector('#productName') as HTMLInputElement;
        // let productDescriptionInput = document.querySelector('#productDescription') as HTMLInputElement;
        // let productDetailsInput = document.querySelector('#productDetails') as HTMLInputElement;
        // let priceInput = document.querySelector('#price') as HTMLInputElement;
        // let imageInput = document.querySelector('#image') as HTMLInputElement;

        // productNameInput.textContent = "namInput"
   

        // console.log(productNameInput.textContent);

        (document.querySelector('#productName') as HTMLInputElement).value = productData.name;
            (document.querySelector('#productDescription') as HTMLInputElement).value = productData.description;
            (document.querySelector('#productDetails') as HTMLInputElement).value = productData.details;
            (document.querySelector('#price') as HTMLInputElement).value = productData.price;
            (document.querySelector('#image') as HTMLInputElement).value = productData.imageURL;

            console.log(productData)

            let btnupdate = document.querySelector('.btnupdate') as HTMLButtonElement;
            btnupdate.addEventListener('click', (e)=>{
            e.preventDefault();
                console.log('hello')
            console.log(productData.Id);  

            updateProduct(productData.id)
               
    
        })


            
    })
}

function updateProduct(productId: string): void {
    const productNameInput = document.querySelector('#productName') as HTMLInputElement;
    const productDescriptionInput = document.querySelector('#productDescription') as HTMLInputElement;
    const productDetailsInput = document.querySelector('#productDetails') as HTMLInputElement;
    const priceInput = document.querySelector('#price') as HTMLInputElement;
    const imageInput = document.querySelector('#image') as HTMLInputElement;

    const updatedProduct = {
        name: productNameInput.value,
        description: productDescriptionInput.value,
        details: productDetailsInput.value,
        price: parseFloat(priceInput.value),
        imageURL: imageInput.value
    };

    fetch(`http://localhost:3000/Products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error updating product');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product updated successfully:', data);
    })
    .catch(error => {
        console.error('Error updating product:', error.message);
    });

    showPopup('Product updated successfully!', '#4CAF50');
}


    modifyItem.addEventListener('click', (e) => {
        console.log(`Pressed modify Button with id: ${productData.id}`)
        e.preventDefault();
        
        console.log(buttonUpdate.textContent)
        buttonUpdate.style.display = 'block';
        addnewItem.style.display = 'none';
        addnewItem 
        formToggle.style.display = 'block';
        buttonToggle.style.display = "none";
        let txt = document.querySelector('.txt') as HTMLElement;
        txt.textContent = "Update Product";
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        modifyProduct();

    })

    /*update the database */

  

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
