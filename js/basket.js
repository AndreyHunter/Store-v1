import {
    createBasketCards
} from './modules/render.js';

import {
    getBasketLocalStorage,
    setBasketLocalStorage
} from './modules/localStorage.js';

import {
    checkElementsOnBasket
} from './modules/functions.js';

const basketWrapper = document.querySelector('.basket__list');

let productsArray = [];

getProducts();
checkElementsOnBasket();

async function getProducts() {
    try {
        if (!productsArray.length) {
            const res = await fetch('./data.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsArray = await res.json();
        }

        loadProductBasket(productsArray);

    } catch (err) {
        console.log(err.message);
    }
}

function loadProductBasket(data) {
    basketWrapper.textContent = '';

    if (!data || !data.length) return;

    const basket = getBasketLocalStorage();

    if (!basket || !basket.length) return;

    const findProducts = data.filter(item => basket.includes(String(item.id)));
    createBasketCards(findProducts);
    calcTotalPrice();
}

// Удаление товара из корзины

basketWrapper.addEventListener('click', delProductBasket);

function delProductBasket(event) {
    const targetButton = event.target.closest('.basket__item-deleteBtn');
    if (!targetButton) return;

    const card = targetButton.closest('.basket__item');
    const id = card.dataset.productid;
    
    removeProductFromLocalStorage(id);
    card.remove();
    calcTotalPrice();
}

function removeProductFromLocalStorage(productId) {
    let basket = getBasketLocalStorage();
    basket = basket.filter(item => item !== productId);
    setBasketLocalStorage(basket);
}

// Счётчик 

basketWrapper.addEventListener('click', addCounter);

function addCounter(e) {
    const target = e.target;
    if (!target.dataset.counter) return;

    const counterPlus = target.closest('[data-counter="plus"]');
    const counterMinus = target.closest('[data-counter="minus"]');

    if (counterPlus || counterMinus) {
        const counterWrapper = target.closest('.basket__item-counter-wrapper');
        const counterText = counterWrapper.querySelector('.basket__item-counter');
        let counter = +counterText.textContent;

        if (counterPlus) {
            counterText.textContent = counter + 1;
            calcTotalPrice();
        }

        if (counterMinus && counter > 1) {
            counterText.textContent = counter - 1;
            calcTotalPrice();
        }
    }
}

function calcTotalPrice() {
    const cards = document.querySelectorAll('.basket__item');

    let totalPrice = 0;

    cards.forEach(item => {
        const counter = item.querySelector('.basket__item-counter');
        const currentPrice = item.querySelector('.basket__item-price');
        const sum = parseInt(counter.textContent) * parseInt(currentPrice.textContent);
        totalPrice += sum;
    });

    const totalPriceText = document.querySelector('.basket__order-total');
    calcDiliveryCount(totalPrice);
    return totalPriceText.textContent = `Итого: ${totalPrice}₴`;  
}

function calcDiliveryCount(num) {
    const diliveryCountWrapper = document.querySelector('.basket__order-dilivery');
    const diliveryCount = document.querySelector('.basket__order-dilivery span');
    const el = diliveryCountWrapper.querySelector('.freeOnCount');

    if (num > 1 && num < 25000) {
        el.classList.remove('none');
        el.textContent = 'Бесплатная доставка от 25000₴'; 
    }
    
    if (num >= 25000) {
        diliveryCount.classList.add('dilivery-free');
        diliveryCount.textContent = 'Бесплатно';
        el.classList.add('none');
    } else if (num >= 15000) {
        diliveryCount.textContent = '200₴';
        diliveryCount.classList.remove('dilivery-free');
    } else {
        diliveryCount.textContent = 'По тарифам перевозчика';
        diliveryCount.classList.remove('dilivery-free');
    }
}
