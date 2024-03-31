import {
    COUNT_SHOW_CARDS_CLICK
} from './modules/constans.js';

import {
    createCards
} from './modules/render.js';

import {
    getBasketLocalStorage,
    setBasketLocalStorage
} from './modules/localStorage.js';

import {
    checkElementsOnBasket
} from './modules/functions.js';

let shownCards = COUNT_SHOW_CARDS_CLICK;
let countClickBtnShowCards = 1;
   
const cardsWrapper = document.querySelector('.products__list');
const showMoreBtn = document.querySelector('.showMoreBtn');

let productsArray = [];

getProducts();
checkElementsOnBasket();

showMoreBtn.addEventListener('click', addMoreCards)

async function getProducts() {
    try {
        if (!productsArray.length) {
            const res = await fetch('./data.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsArray = await res.json();
        }

        renderStartPage(productsArray);

    } catch (err) {
        console.log(err.message);
    }
}

function renderStartPage(data) {
    if (!data || !data.length) return;

    const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
    createCards(arrCards, '.products__list');

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}

function addMoreCards() {
    if(shownCards >= productsArray.length) return;

    countClickBtnShowCards++;
    const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

    const arrCards = productsArray.slice(shownCards, countShowCards);
    createCards(arrCards, '.products__list');
    shownCards = cardsWrapper.children.length;

    if(shownCards >= productsArray.length) {
        showMoreBtn.classList.add('none');
    }

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}

// Добавления в крозину

cardsWrapper.addEventListener('click', handleCardClick);

function handleCardClick(event) {
    const targetButton = event.target.closest('.products__card-button');
    if (!targetButton) return; // Если не найдена кнопка, просто выходим

    const card = targetButton.closest('.products__card');
    if (!card) return; // Если не найдена карточка товара, просто выходим

    const id = card.dataset.productid;

    let basket = getBasketLocalStorage();

    if (!Array.isArray(basket)) {
        basket = []; // Если нет, инициализируем как пустой массив
    }

    if (basket.includes(id)) {
        const index = basket.indexOf(id);
        basket.splice(index, 1); // Удалить товар из корзины
    } else {
        basket.push(id); // Добавить товар в корзину
    }

    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
}

// Добавление состояния после добавление в корзину на кнопку

function checkingActiveButtons(basket) {
    const buttons = document.querySelectorAll('.products__card-button');

    buttons.forEach(btn => {
        const card = btn.closest('.products__card');
        if (!card) return; // Если не найдена карточка товара, просто выходим

        const id = card.dataset.productid;

        // Проверяем, есть ли товар с таким ID в корзине
        const isInBasket = basket.includes(id);

        // Устанавливаем состояние кнопки в зависимости от наличия товара в корзине
        if (isInBasket) {
            btn.textContent = 'Удалить из корзины';
            btn.classList.add('active');
        } else {
            btn.textContent = 'Добавить в корзину';
            btn.classList.remove('active');
        }
    });
}


