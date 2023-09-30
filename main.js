




// functions
function openList() {
    this.classList.toggle("filters__item--hidden");
}

function clearFilters() {
    let filtersCheckboxes = document.querySelectorAll(".filters input[type='checkbox']")
    for (const checkboxItem of filtersCheckboxes) {
        checkboxItem.checked = false;
        renderBooks(BOOKS)
    }
}

function render() {
    let currLocation = location.pathname;
    switch (currLocation){
        case "/": renderBooks(BOOKS);
            break;
        case "/cart": renderCart();
            break;
    }
   
}

function renderCart() {
    cartCounter.textContent = BASKET.length;

    temp = BASKET.map(item => {
        const { id, title, author, published_date, language, genre, imgSrc } = item;
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

            <i onclick="removeItem(${id})" class="fa-solid fa-xmark cart-books__item__remove"></i>
        </div>
        `
    }).join("");

    root.innerHTML = temp;
    history.pushState({}, "", "cart");

}

function removeItem(itemId) {
    BASKET.forEach((element, index) => {
        if (element.id == itemId) BASKET.splice(index, 1)
    });

    localStorage.setItem("myBasket", BASKET);
    renderCart(BASKET)
}


function renderBooks(arr) {
    let temp = arr.map(item => {
        const { id, title, author, published_date, language, genre, imgSrc } = item;
        return `
                <div id="${id}" class="product" >
                    <img src="./assets/image/${imgSrc}" alt="product image" class="product__image">
                    <div class="product__desc">
                        <h2 class="product__desc__title">${title}</h2>
                        <div class="product__desc__details">
                            <h3 class="product__desc__details__item">
                                <span>اثر </span>
                                ${author}
                            </h3>

                            <h3 class="product__desc__details__item">
                                ${published_date.toString()}
                            </h3>

                            <h3 class="product__desc__details__item">
                                <span>زبان:‌ </span>
                                ${language}
                            </h3>
                            <h3 class="product__desc__details__item">
                                <span>ژانر:‌ </span>
                                ${genre}
                            </h3>
                        </div>
                        <div class="product__desc__basket">
                        <i class="fa-solid fa-book-medical"></i>
                        <h4>اضافه به سبد خرید</h4>
                    </div>
                    </div>
                </div>`
    }).join("");

    cartCounter.textContent = BASKET.length.toString();

    root.innerHTML = temp;

    let addBook = document.querySelectorAll(".product__desc__basket");
    addBook.forEach(element => {
        element.addEventListener("click", addToBasket);
    });



}

renderBooks(BOOKS);


function addToBasket() {
    let temp = []
    let targetId = (this.parentElement.parentElement.getAttribute("id"));
    temp = BOOKS.filter(element => {
        return element.id == targetId;
    });
    BASKET.push(...temp);
    cartCounter.textContent = BASKET.length.toString();

    localStorage.setItem(
        'myBasket',
        JSON.stringify(BASKET),
    );
}


function applyFilters() {
    let result = [];
    // selected authors
    temp = filterListAuthor.childNodes;
    let selectedAuthors = [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].firstElementChild.checked) {
            selectedAuthors.push(temp[i].textContent.trim());
        }
    }

    if (selectedAuthors.length == 0) {
        for (let i = 0; i < temp.length; i++) {
            selectedAuthors.push(temp[i].textContent.trim());
        }
    }


    // selected languages
    temp = filterListLang.childNodes;
    let selectedLanguages = [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].firstElementChild.checked) {
            selectedLanguages.push(temp[i].textContent.trim());
        }
    }

    if (selectedLanguages.length == 0) {
        for (let i = 0; i < temp.length; i++) {
            selectedLanguages.push(temp[i].textContent.trim())
        }
    }

    // selected genres
    temp = filterListGenre.childNodes;
    let selectedGenres = [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].firstElementChild.checked) {
            selectedGenres.push(temp[i].textContent.trim());
        }
    }

    if (selectedGenres.length == 0) {
        for (let i = 0; i < temp.length; i++) {
            selectedGenres.push(temp[i].textContent.trim());
        }
    }

    // selected authors
    let filteredAuthors = BOOKS.map(item => {
        for (let i = 0; i < BOOKS.length; i++) {
            for (let j = 0; j < selectedAuthors.length; j++) {
                if (item.author == selectedAuthors[j]) return item;
            }
        }
    })
    for (let i = 0; i < filteredAuthors.length; i++) {
        if (filteredAuthors[i] == undefined) {
            filteredAuthors.splice(i, 1);
            i--;
        };

    }




    // filter languages

    for (const lang of selectedLanguages) {
        temp = filteredAuthors.filter(item => item.language == lang);
        result.push(temp);
        result = result.flat();
    }


    // filter genres
    let temporaryResult = []
    for (const genre of selectedGenres) {
        temp = result.filter(item => item.genre == genre);
        temporaryResult.push(temp);
        temporaryResult = temporaryResult.flat();
    }

    result = temporaryResult;

    renderBooks(result)

}





// events
filterIcon.addEventListener("click", () => filtersField.style.display = "block")

btnCloseFilters.addEventListener("click", () => filtersField.style.display = "")

for (let i = 0; i < filterItems.length; i++) {
    filterItems[i].addEventListener("click", openList)
}

btnClearFilters.addEventListener("click", clearFilters);

btnApplyFilters.addEventListener("click", applyFilters);

cartIcon.addEventListener("click", renderCart);


window.addEventListener("popstate", render)
