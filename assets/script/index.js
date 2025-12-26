function categoriesDataLoad() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => newDataLoad(data.categories))
}


function newDataLoad(categories) {
   for(const cat of categories){
    // console.log(cat);

    const catchParent = document.getElementById("categories-parent");

    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category} </button>
    `;

    catchParent.append(createDiv)
   }
}

categoriesDataLoad()