

// dom nodes
let library = document.getElementById("products");
let filterListAuthor = document.getElementById("filters__list__author");
let filterListPDate = document.getElementById("filters__list__p-date");
let filterListLang = document.getElementById("filters__list__lang");
let filterListGenre = document.getElementById("filters__list__genre");
let filterItems = document.querySelectorAll(".filters__item");
let btnApplyFilters = document.getElementById("apply-filters");
let btnClearFilters = document.getElementById("clear-filters");
let cartCounter = document.getElementById("cart-counter");

const BASKET = [];


// initial filters

// initial authors
let uniqueAuthors = [];
let temp = []
let count = 0;
temp = BOOKS.map(item => {
    return item.author;
});

for (let i = 0; i < temp.length; i++) {

    uniqueAuthors.push(temp[i]);
    for (let j = i + 1; j < temp.length; j++) {
        if (temp[i] == temp[j]) {
             temp.splice(j, 1)
             j--; 
            }

    }

}

temp = uniqueAuthors.map(item => {
    return `<li>
                <input type="checkbox">
                ${item}
            </li>`
}).join("");


filterListAuthor.innerHTML = temp;



// initial published date
temp = BOOKS.map(item => item.published_date);
temp.sort(function (a, b) { return a - b });
let pDatePeriod = [];
pDatePeriod.push(temp[0]);
pDatePeriod.push(temp[temp.length - 1]);



// initial language
temp = BOOKS.map(item => item.language);
let uniqueLanguages = [];

for (let i = 0; i < temp.length; i++) {
    uniqueLanguages.push(temp[i]);
    for (let j = i + 1; j < temp.length; j++) {
        if (temp[i] == temp[j]){ 
            temp.splice(j, 1)
            j--;
        };
    }
}

temp = uniqueLanguages.map(item => {
    return `<li>
                <input type="checkbox">
                ${item}
            </li>`
}).join("");

filterListLang.innerHTML = temp;



// initial genre
temp = BOOKS.map(item => item.genre);
let uniqueGenres = [];

for (let i = 0; i < temp.length; i++) {
    uniqueGenres.push(temp[i]);
    for (let j = i + 1; j < temp.length; j++) {
        if (temp[i] == temp[j]){ 
            temp.splice(j, 1)
            j--;
        };
    }
}

temp = uniqueGenres.map(item => {
    return `<li>
                <input type="checkbox">
                ${item}
            </li>`
}).join("");


filterListGenre.innerHTML = temp;





