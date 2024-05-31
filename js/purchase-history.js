"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const historyItemsContainer = document.querySelector(".historyItems");
    let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory") || "[]");
    if (!historyItemsContainer) {
        console.error("History items container element not found");
        return;
    }
    if (purchaseHistory.length === 0) {
        historyItemsContainer.innerText = "You have no purchase history";
        return;
    }
    purchaseHistory.forEach((product) => {
        let productDOM = createHistoryProduct(product);
        if (productDOM) {
            historyItemsContainer.appendChild(productDOM);
        }
    });
    function createHistoryProduct(productData) {
        let historyProduct = document.createElement("div");
        historyProduct.classList.add("historyProduct");
        let productImage = document.createElement("img");
        productImage.className = "productImagee";
        productImage.src = productData.imageURL;
        let productName = document.createElement("div");
        productName.classList.add("productName");
        productName.innerText = productData.name;
        let productPrice = document.createElement("div");
        productPrice.classList.add("productPrice");
        productPrice.innerText = "Price: Ksh " + productData.price;
        historyProduct.appendChild(productImage);
        historyProduct.appendChild(productName);
        historyProduct.appendChild(productPrice);
        return historyProduct;
    }
});
