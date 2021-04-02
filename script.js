const dishes = document.querySelectorAll(".dishes li");
const desserts = document.querySelectorAll(".desserts li");
const drinks = document.querySelectorAll(".drinks li");
const icon = document.querySelectorAll(".icon");
const buttonCloseOrder = document.querySelector(".close-order");

let applyStyleArray = [];

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
    let dish    = applyStyleArray[0];
    let dessert = applyStyleArray[1];
    let drink   = applyStyleArray[2];

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
    applyStyleArray.forEach(element => {
        if(element !== undefined) {
            count++;
        }
    });
    if(count === 3) {
        buttonCloseOrder.classList.add("close-order-click");
        buttonCloseOrder.innerHTML = "Fechar pedido";
    }
};


