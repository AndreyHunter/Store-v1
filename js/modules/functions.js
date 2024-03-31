import {
    getBasketLocalStorage
} from './localStorage.js';

export function checkElementsOnBasket() {
    const basket = getBasketLocalStorage();
    const basketCount = document.querySelector('.basketItems');
    basketCount.textContent = basket.length; 
}

// export function addMessage(message, imgSrc, selector) {
//     const element = document.querySelector(selector);

//     const messageHTML = `
//         <div class="message">
//             <img src="${imgSrc}">
//             <h4 class="message__title">${message}</h4>
//         </div>
//     `;
//     element.insertAdjacentHTML('beforeend', messageHTML)
// }