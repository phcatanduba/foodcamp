const dishes = document.querySelectorAll(".dish-clicked");
const desserts = document.querySelectorAll("#dessert");
const drinks = document.querySelectorAll("#drink");

let dishesCount = 0;
let dessertsCount = 0;
let drinksCount = 0;
let previousLiDishes, previousLiDrinks, previousLiDesserts;

function changeLiStyle(li, counter) {

    switch(counter) {
        case 'dishesCount':
            if(dishesCount  === 0){
                li.classList.add("li-clicked");
                dishesCount++;
                previousLiDishes = li;
            }
            else {
                previousLiDishes.classList.remove("li-clicked");
                li.classList.add("li-clicked");
                previousLiDishes = li;
            }
            break;

        case 'dessertsCount':

            if(dessertsCount === 0){
                li.classList.add("li-clicked");
                dessertsCount++;
                previousLiDesserts = li;
            }
            else {
                previousLiDesserts.classList.remove("li-clicked");
                li.classList.add("li-clicked");
                previousLiDesserts = li;
            }
            break;
            
        case 'drinksCount':

            if(drinksCount === 0){
                li.classList.add("li-clicked");
                drinksCount++;
                previousLiDrinks = li;
            }
            else {
                previousLiDrinks.classList.remove("li-clicked");
                li.classList.add("li-clicked");
                previousLiDrinks = li;
            }
            break;
    }
};

dishes.forEach(li => {
    li.addEventListener("click", function() {
        changeLiStyle(li, 'dishesCount');
    });
});


desserts.forEach(li => {
    li.addEventListener("click", function() {
        changeLiStyle(li, 'dessertsCount');
    });
});


drinks.forEach(li => {
    li.addEventListener("click", function() {
        changeLiStyle(li, 'drinksCount');
    });
});



