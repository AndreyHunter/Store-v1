// Рендер Карточки товара 

export function createCards(data, selector) {
    const element = document.querySelector(selector)

    data.forEach(card => {
        const {id, title, img, price} = card;
        
        const cardHTML = `
            <li class="products__card" data-productID="${id}">
                <div class="products__card-top">
                    <a href="#" class="products__card-link">
                        <img 
                        src="./images/${img}" 
                        alt="${title}" 
                        class="products__card-image">
                    </a>
                </div>

                <a href="#" class="products__card-title">${title}</a>
                <div class="products__card-price">Цена: ${price}₴</div>
                <button class="products__card-button">Добавить в корзину</button>
            </li>
        `;

        element.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Рендер Карточки товара в корзине

export function createBasketCards(data) {
    const basketList = document.querySelector('.basket__list');
    basketList.innerHTML = ''; 

    data.forEach(card => {
        const {id, title, img, price} = card;

        const basketItemHtml = `
                <li class="basket__item" data-productID="${id}">
                    <div class="basket__item-head">
                        <a href="#!" class="basket__item-link">
                            <img 
                            src="./images/${img}" 
                            alt="${title}" 
                            class="basket__item-image">
                        </a>

                        <div class="basket__item-title-wrapper">
                            <a href="#!" class="basket__item-title">${title}</a>

                            <div class="basket__item-counter-wrapper">
                                <button data-counter="minus">
                                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <span class="basket__item-counter">1</span>
                                <button data-counter="plus">
                                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12H18M12 6V18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="basket__item-body">
                        <div class="basket__item-price-wrapper">
                            <span class="basket__item-price">${price}₴</span>
                        </div>
                    </div>

                    <div class="basket__item-deleteBtn">✖</div>
                </li>
        `;

        basketList.insertAdjacentHTML('beforeend', basketItemHtml);
    });
}