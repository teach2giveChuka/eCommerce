// USER PAGE TYPESCRIPT


let comodities = document.querySelector('.comodities') as HTMLElement;

fetch('http://localhost:3000/Products')
    .then(response => {
        return response.json()
        // console.log(response);
    })
    .then(data => {
        console.log(data);

        for(let i = 0; i< data.length; i++){
            console.log(data[i])
            let productDOM = createProduct(data[i]);
            comodities.appendChild(productDOM);
        }

    })



    function createProduct(productData: any): HTMLElement {
        let commodity = document.createElement('div') as HTMLElement;
        commodity.classList.add('commodity');
    
        let productImage = document.createElement('div') as HTMLElement;
        productImage.classList.add('productImage');
    
        let image = document.createElement('img') as HTMLImageElement;
        image.src = productData.imageURL;
        image.classList.add('image');
    
        let productDetails = document.createElement('div') as HTMLElement;
        productDetails.classList.add('productDetails');
    
        let productName = document.createElement('div') as HTMLElement;
        productName.classList.add('productName');
        productName.innerText = productData.name;
    
        let productDescription = document.createElement('div');
        productDescription.classList.add('description');
        productDescription.innerText = productData.description;
    
        let price = document.createElement('div') as HTMLElement;
        price.classList.add('price');
        price.innerText = ' Ksh '+productData.price;
    
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
    
        let addToCart = document.createElement('button') as HTMLElement;
        addToCart.classList.add('addToCart');
        addToCart.innerHTML = `<ion-icon name="bag-add-outline"></ion-icon> &nbsp; Add to Cart`;
    
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
    