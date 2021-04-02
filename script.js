const dishes = document.querySelectorAll(".dishes li");
const desserts = document.querySelectorAll(".desserts li");
const drinks = document.querySelectorAll(".drinks li");
const buttonCloseOrder = document.querySelector(".close-order");
const closingScreen = document.querySelector(".unconfirmed");
const screen = document.querySelector("body");

let applyStyleArray = [];
let dish, dessert, drink;

let dishPrice;
let dessertPrice;
let drinkPrice;

let dishName;
let dessertName;
let drinkName;

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
        changeButtonStyleAndListen();
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

function changeButtonStyleAndListen() {
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

        buttonCloseOrder.addEventListener("click", function() {
            closeOrder();
        });        
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

function closeOrder() {
    let confirmButton = closingScreen.querySelector(".buttons").children[0];
    let cancelButton = closingScreen.querySelector(".buttons").children[1];

    encodeMsg   = encodeURIComponent(message());
    wppMsg      = "https://wa.me/351915507795?text=" + encodeMsg;

    closingScreen.children[0].querySelector(".confirm-dish").children[0].innerHTML = dishName;
    closingScreen.children[0].querySelector(".confirm-dish").children[1].innerHTML = dishPrice;

    closingScreen.children[0].querySelector(".confirm-drink").children[0].innerHTML = drinkName;
    closingScreen.children[0].querySelector(".confirm-drink").children[1].innerHTML = drinkPrice;

    closingScreen.children[0].querySelector(".confirm-dessert").children[0].innerHTML = dessertName;
    closingScreen.children[0].querySelector(".confirm-dessert").children[1].innerHTML = dessertPrice;

    let price = Number(dishPrice) + Number(dessertPrice) + Number(drinkPrice);
    closingScreen.children[0].querySelector(".total-price").children[1].innerHTML = price.toFixed(2);

    closingScreen.classList.add("confirmed");
    confirmButton.addEventListener("click", function () {
        confirmButton.setAttribute("href", wppMsg);
    });

    cancelButton.addEventListener("click", function () {
        closingScreen.classList.remove("confirmed");
    });
};

