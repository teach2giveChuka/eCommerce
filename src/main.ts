console.log('Test config');

//ADMIN PAGE TYPESCRIPT
interface Product{
    name:string;
    description:string;
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
//labels
let productNameLabel = document.querySelector('label[for="productName"]') as HTMLElement;
let productDescriptionLabel = document.querySelector('label[for="productDescription"]') as HTMLElement;
let productDetailsLabel = document.querySelector('label[for="productDetails"]') as HTMLElement;
let priceLabel = document.querySelector('label[for="price"]') as HTMLElement;
let imageLabel = document.querySelector('label[for="image"]') as HTMLElement;


form.addEventListener('submit', (e)=>{
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
    
    //object for product
    let product :Product ={
        name:productName.value,
        description:productDescription.value,
        details: productDetails.value,
        price: parseFloat(pricee.value),
        imageURL: image.value
    }
    console.log(JSON.stringify(product))
try{
    fetch('http://localhost:3000/Products', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
                },
        body: JSON.stringify(product)
    });
}
catch(e){
    console.log(e);
}
});










