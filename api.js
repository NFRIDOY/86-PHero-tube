const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/videos/categories";
    const res = await fetch(url)
    const data = await res.json()
    const dataArray = data.data;
    // console.log(data.data);

    // DOM
    const categoriesContainer = document.getElementById("categories");
    
    for(const category of dataArray){
        // console.log(category.category);
        const catBtn = document.createElement("button");
        catBtn.innerHTML = `
        <button onclick="loadData(${category.category_id})" class="btn mx-4 active:bg-[#FF1F3D] text-black hover:bg-black hover:text-white">${category.category}</button>
        `;
        // catBtn.classList.add("btn")
        // catBtn.classList.add("mx-4")
        // catBtn.classList.add("mx-4")

        categoriesContainer.appendChild(catBtn);

    }

}
loadCategories();
const loadData = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${category_id}`;
    const res = await fetch(url)
    const data = await res.json()
    const dataArray = data.data;
    console.log(dataArray);

    // DOM
    const cardsContainer = document.getElementById("cards");
    // cardsContainer.innerHTML = ``;
    for(const card of dataArray){
        // console.log(category.category);
        const div = document.createElement("div");
        div.innerHTML = `

        title: ${card.title}
        `;
        // catBtn.classList.add("btn")
        // catBtn.classList.add("mx-4")
        // catBtn.classList.add("mx-4")

        cardsContainer.appendChild(div);

    }

}
loadData();
