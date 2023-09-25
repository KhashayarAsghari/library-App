



// dom nodes
let root = document.getElementById("cart-books");
let basketCounter = document.getElementById("cart-counter");
let removeBtns;


const BASKET = JSON.parse(localStorage.getItem("myBasket"));

// functions
function renderCart(arr){

    temp = BASKET.map(element => {
        const {id,title,author,published_date,language,genre,imgSrc} = element;
        return `
        <div id="${id}" class="cart-books__item">
            <img src="./assets/image/${imgSrc}" alt="book image" class="cart-books__item__image">
            <div class="cart-books__item__desc">
                <h2 class="cart-books__item__desc__item">${title}</h2>
                <h3 class="cart-books__item__desc__item"><span>نویسنده: </span>${author}</h3>
                <h3 class="cart-books__item__desc__item"><span>تاریخ انتشار: </span>${published_date}</h3>
                <h3 class="cart-books__item__desc__item"><span>زبان: </span>${language}</h3>
                <h3 class="cart-books__item__desc__item"><span>ژانر: </span>${genre}</h3>

            </div>

            <i class="fa-solid fa-xmark cart-books__item__remove"></i>
        </div>
        `
    }).join("");

    root.innerHTML = temp;

    removeBtns = document.querySelectorAll(".cart-books__item__remove");

    removeBtns.forEach(element => {
        element.addEventListener("click", removeItem)
    });
    basketCounter.textContent = BASKET.length.toString(); 
}


function removeItem(evt) {
    let itemId = this.parentElement.getAttribute("id");
    
    
    BASKET.forEach((element,index) => {
        if(element.id == itemId) BASKET.splice(index, 1)
    });

    renderCart(BASKET)
}

renderCart(BASKET);



