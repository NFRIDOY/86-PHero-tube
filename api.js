const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/videos/categories";
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.data[1].category);
    const categoriesContainer = document.getElementById("categories");
    for(const category of data.data){
        console.log(category.category);
        const catBtn = document.createElement("button");
        catBtn.innerHTML = `
        <button class="btn mx-4 active:bg-[#FF1F3D] text-black hover:bg-black hover:text-white">${category.category}</button>
        `;
        // catBtn.classList.add("btn")
        // catBtn.classList.add("mx-4")
        // catBtn.classList.add("mx-4")

        categoriesContainer.appendChild(catBtn);

    }

}
loadCategories();
function displyCategories() {

}
