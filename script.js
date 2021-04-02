const dishes = document.querySelectorAll(".dishes li");
const desserts = document.querySelectorAll(".desserts li");
const drinks = document.querySelectorAll(".drinks li");
const icon = document.querySelectorAll(".icon");
const buttonCloseOrder = document.querySelector(".close-order");

let applyStyleArray = [];
let dish, dessert, drink;

dishes.forEach(li => {
    listen(li, "dish");
});
desserts.forEach(li => {
    listen(li, "dessert");
});
drinks.forEach(li => {
    listen(li, "drink");
});

function listen(li, liType) {
    li.addEventListener("click", function() {
        changeLiStyle(li, liType);
        closeOrder();
    });
}

function changeLiStyle(li, liType) {

    switch(liType) {
        case 'dish': 
            if(dish === undefined) {
                addLiStyle(li, 0)
            }   else if(dish.className === "li-clicked") {
                    addAndRemoveLiStyle(li, 0);
                };
            break; 

        case 'dessert': 
            if(dessert === undefined) {
                addLiStyle(li, 1);
            }   else if(dessert.className === "li-clicked") {
                    addAndRemoveLiStyle(li, 1);
                };
            break;

        case 'drink': 
            if(drink === undefined) {
                addLiStyle(li, 2);
            }   else if(drink.className === "li-clicked") {
                    addAndRemoveLiStyle(li, 2);
                };
            break; 
    };
    dish    = applyStyleArray[0];
    dessert = applyStyleArray[1];
    drink   = applyStyleArray[2];
   
};

function addLiStyle(li, index) {
    li.classList.add("li-clicked");
    applyStyleArray[index] = li;
};

function addAndRemoveLiStyle(li, index) {
    applyStyleArray[index].classList.remove("li-clicked");
    li.classList.add("li-clicked");
    applyStyleArray[index] = li;
}

function closeOrder() {
    let count = 0;
    let wppMsg, encodeMsg;

    applyStyleArray.forEach(element => {
        if(element !== undefined) {
            count++;
        }
    });
    if(count === 3) {
        buttonCloseOrder.classList.add("close-order-click");
        buttonCloseOrder.innerHTML = "Fechar pedido";

        encodeMsg   = encodeURIComponent(message());
        wppMsg      = "https://wa.me/351915507795?text=" + encodeMsg;
        buttonCloseOrder.parentElement.setAttribute("href", wppMsg);
    };
};

function message() {

    dishPrice    = dish.children[0].querySelector(".price").getAttribute("value");
    dessertPrice = dessert.children[0].querySelector(".price").getAttribute("value");
    drinkPrice   = drink.children[0].querySelector(".price").getAttribute("value");

    dishName     = dish.children[0].querySelector(".item-name").innerHTML
    dessertName  = dessert.children[0].querySelector(".item-name").innerHTML
    drinkName    = drink.children[0].querySelector(".item-name").innerHTML

    let price = Number(dishPrice) + Number(dessertPrice) + Number(drinkPrice);
    let msg = `Olá, gostaria de fazer o pedido:\n
    - Prato: ${dishName}\n
    - Bebida: ${drinkName}\n
    - Sobremesa: ${dessertName}\n
    Total: R$ ${price.toFixed(2)}`;

    return msg;
};

