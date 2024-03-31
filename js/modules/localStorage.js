// Получение id из LS
export function getBasketLocalStorage() {
    const cartDataJSON = localStorage.getItem('basket');
    return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

// Запись id товаров в LS
export function setBasketLocalStorage(basket) {
    const basketCount = document.querySelector('.basketItems');
    localStorage.setItem('basket', JSON.stringify(basket));
    basketCount.textContent = basket.length;
}