const cartList = document.getElementsByClassName("cart__products")[0]
const allProducts = document.getElementsByClassName("product")
const cart = document.getElementsByClassName("cart")[0]
const clearCart = document.getElementsByClassName("cart__clear-button")[0]

//  Прячем корзину
cart.style.display = "none"

//  Очистка корзины
clearCart.addEventListener("click", function (event) {
    event.preventDefault();
    cartList.innerHTML = "";
    cart.style.display = "none";
});

//  Добавляем слушаетние кнопок у каждого товара
for (const prod of allProducts) {
    const incButton = prod.querySelector(".product__quantity-control.product__quantity-control_inc");
    const decButton = prod.querySelector(".product__quantity-control.product__quantity-control_dec");
    const value = prod.querySelector(".product__quantity-value");
    const addToCartButton = prod.querySelector(".product__add")
    // Добавляем функционал кнопкам
    incButton.addEventListener("click", function (event) {
        event.preventDefault();
        value.textContent = Number(value.textContent) + 1;
    });
    decButton.addEventListener("click", function (event) {
        event.preventDefault();
        Number(value.textContent) > 1 ? value.textContent = Number(value.textContent) - 1 : null;
    });
    // Добавляем товар в корзину
    addToCartButton.addEventListener("click", function (event) {
        event.preventDefault();
        //  Отображем корзину
        if (cart.style.display === "none") {
            cart.style.display = "block"
        }
        const prodId = prod.dataset.id;
        const cartProduct = cartList.querySelector(`.cart__product[data-id="${prodId}"]`);
        //  Если товар уже есть в корзине, то увеличиваем количество
        if (cartProduct) {
            const cartProductCount = cartProduct.querySelector('.cart__product-count');
            cartProductCount.textContent = Number(cartProductCount.textContent) + Number(value.textContent);
        // Если товара нет в корзине, то добавляем его
        } else {
            const prodImage = prod.querySelector(".product__image").src;
            const newCartElement = document.createElement("div");
            // Создаем карточку товара в корзине
            newCartElement.innerHTML = `
            <div class="cart__product" data-id="${prodId}">
                <img class="delete-button" src="./delete_icon.svg" />
                <img class="cart__product-image" src="${prodImage}" />
                <div class="cart__product-count">${value.textContent}</div>
                <div class="product__quantity-controls">
                    <div class="product__quantity-control product__quantity-control_dec card_quantity-control_dec">
                        -
                    </div>
                    <div class="product__quantity-control product__quantity-control_inc card_quantity-control_inc">
                        +
                    </div>
                </div>
            </div>
            `;
            // Добавляем функционал карточкам
            //  Удаление товара
            const deleteButton = newCartElement.querySelector(".delete-button");
            deleteButton.addEventListener("click", function (event) {
                event.preventDefault();
                newCartElement.remove();
                if(!cartProduct && !cartList.children.length > 0) {
                    cart.style.display = "none"
                }
            });
            // Редактирование количества товара из карточки
            const cartIncButton = newCartElement.querySelector(".card_quantity-control_inc");
            const cartDecButton = newCartElement.querySelector(".card_quantity-control_dec");
            cartIncButton.addEventListener("click", function (event) {
                event.preventDefault();
                const cartProductCount = newCartElement.querySelector('.cart__product-count');
                cartProductCount.textContent = Number(cartProductCount.textContent) + 1;
            });
            cartDecButton.addEventListener("click", function (event) {
                event.preventDefault();
                const cartProductCount = newCartElement.querySelector('.cart__product-count');
                cartProductCount.textContent = Number(cartProductCount.textContent) - 1;
                if (cartProductCount.textContent === "0") {
                    newCartElement.remove();
                    if(!cartProduct && !cartList.children.length > 0) {
                        cart.style.display = "none"
                    }
                }
            });
            // Добавляем карточку в список товаров в корзине
            cartList.appendChild(newCartElement)
        }
    });

}