const varifyElement = document.getElementById("varifyB");
function varify(v) {
    if (v) {
        // console.log("Un Hidden ", v);
        // varifyElement.classList.remove("hidden")
        // varifyElement.classList.remove
        return `<img id="varifyB" class="inline ml-2 " src="./icons/varify.svg" alt=""></img>`
    }
    else {
        // varifyElement.classList.add("inline")
        // console.log("Hidden", v);
        return `<img id="varifyB" class=" ml-2 hidden" src="./icons/varify.svg" alt=""></img>`
    }
}
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
    // console.log(dataArray);

    // DOM
    const cardsContainer = document.getElementById("cards");
    // Clear Before Load New Data
    cardsContainer.innerHTML = ``;
    for(const card of dataArray){
        // console.log(card.authors[0].profile_picture);
        // console.log(card.authors[0].profile_name);
        // console.log(card.authors[0].verified);
        // varify(card.authors[0].verified === undefined || card.authors[0].verified === "" || card.authors[0].verified === null ? false : card.authors[0].verified );
        // varify(false)
        // console.log(card.others.profile_name);
        // console.log(card.others.views);
        // varify(card.authors[0].verified);
        // console.log(card.authors[0].verified.lenght);
    
        const badge = varify(card.authors[0].verified);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-76 bg-base-100 ">
                <figure class="relative">
                    <img class="w-full rounded-lg" src="${card.thumbnail}" alt="Shoes" />
                    <div class="absolute bottom-3 right-3 bg-[#171717] text-white rounded-[4px] px-2 py-0">3hrs 56 min ago</div>
                </figure>
                <div class="card-body flex flex-row items-start ml-0 relative -left-7">
                    <div class="avatar">
                        <div class="w-8 rounded-full">
                            <img src="${card.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div>
                        <h2 class="card-title text-lg">
                        ${card.title}
                        </h2>
                        <h3>${card.authors[0].profile_name}
                            ${badge}
                        </h3>
                        <h4>
                            ${card.others.views} views
                        </h4>
                    </div>
                    
                </div>
            </div>
        `;
        // catBtn.classList.add("btn")
        // catBtn.classList.add("mx-4")
        // catBtn.classList.add("mx-4")

        cardsContainer.appendChild(div);

    }

}
// loadData();


