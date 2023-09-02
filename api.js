let global_category_id = 1000;
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
// Time Convertion Sec to Hours Strings
function getTime(sec) {
    // validation
    if (sec !== undefined && sec !== NaN) {
        sec = parseInt(sec);

        let min = parseInt(sec / 60);
        // console.log("Min",min);
        let hour = 0;
        let day = 0;
        // let month = 0;
        if (min < 60) {
            // console.log("Min",min);
            return (min + " Min ago");
        }
        else {
            hour = parseInt(min / 60);
            min = min % 60;
            // console.log(hour + " hrs", min + " min ago");
            if (hour < 24) {
                return (hour + " hrs " + min + " min ago");
                // console.log(hour + " hrs", min + " min ago");
            }
            else {
                day = parseInt(hour / 24);
                hour = hour % 24;

                if (day) {
                    return (day + " Days " + hour + " hrs ", min + " min ago");
                }
                else {
                    return "";
                    return month + " Month " + day + " Days " + hour + " hrs " + min + " min ago";
                    month = parseInt(hour / 30);
                    day = day % 30;
                    // console.log(month);
                }

            }
        }
    }
    else {
        // console.log("DONT No");
        return ""
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

    for (const category of dataArray) {
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
    if (category_id == 1000 || category_id == 1001 || category_id == 1003) {
        global_category_id = category_id;
        console.log("Insite LoadData: ", global_category_id);
        const url = `https://openapi.programming-hero.com/api/videos/category/${category_id}`;
        const res = await fetch(url)
        const data = await res.json()
        const dataArray = data.data;
        // console.log(dataArray);
        // console.log(category_id);
        // Vlid category_id: 1000  1001  1003

        // isSortBool(category_id)

        const sortBtnContainer = document.getElementById("sort-btn-container");
        // sortBtnContainer.innerHTML = ``;
        
        // sortBtnContainer.innerHTML = `<button onclick="isSortBool(${category_id})" id="sortDec" class="btn bg-[#25252533] mr-1 md:mr-20 text-xs md:text-lg py-0 px-1 md:py-2 md:px-4">Sort by view</button>`;
        displayData(dataArray);

        
        // sortBtnContainer.appendChild()

        // let isSort = false;
        // // isSort = isSortBool();
        // console.log();
        // if (isSort) {
        //     sortIt(dataArray);
        // }
        // else {
        // }
        


    }
    else if (category_id != 1000 || category_id != 1001 || category_id != 1003) {
        // console.log(category_id, "data Note Found!!");

        const noData = document.getElementById("noData");
        const cardsContainer = document.getElementById("cards");
        cardsContainer.innerHTML = ``;
        // const div = document.createElement("div");
        noData.innerHTML = `
        <div class="flex flex-col items-center my-32">
                <div>
                    <img src="./Icon.png" alt="">
                </div>
                <div class="text-3xl my-10">Oops!! Sorry, There is no content here</div>
        </div>
        `;

        // cardsContainer.appendChild(div);

    }

}
function displayData(dataArray) {

    // DOM
    const cardsContainer = document.getElementById("cards");
    // Clear Before Load New Data
    cardsContainer.innerHTML = ``;
    document.getElementById("noData").innerHTML = ``;
    for (const card of dataArray) {
        // console.log(card.authors[0].profile_picture);
        // console.log(card.authors[0].profile_name);
        // console.log(card.authors[0].verified);
        // varify(card.authors[0].verified === undefined || card.authors[0].verified === "" || card.authors[0].verified === null ? false : card.authors[0].verified );
        // varify(false)
        // console.log(card.others.profile_name);
        // console.log(card.others.views);
        // console.log(card.others.posted_date);
        // varify(card.authors[0].verified);
        // console.log(card.authors[0].verified.lenght);

        const badge = varify(card.authors[0].verified);
        const time = getTime(card.others?.posted_date);
        const div = document.createElement("div");
        div.innerHTML = `
    <div class="card w-76 bg-base-100 ">
            <figure class="relative">
                <img class="w-full h-44 rounded-lg" src="${card.thumbnail}" alt="Shoes" />
                <div class="absolute bottom-3 right-3 bg-[#171717] text-white rounded-[4px] px-2 py-0">${time}</div>
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

        cardsContainer.appendChild(div);

    }
}
// loadData();


// sort by decending
function sortIt(array) {
    let sorted = array.sort((a, b) => b?.others?.views.split("K")[0] - a?.others?.views.split("K")[0]);
    // console.log(sorted);
    // return sorted;
    displayData(sorted);
}

async function isSortBool(category_id=1000) {
    if (category_id == 1000 || category_id == 1001 || category_id == 1003) {
        console.log(global_category_id);
        const url = `https://openapi.programming-hero.com/api/videos/category/${category_id}`;
        const res = await fetch(url)
        const data = await res.json()
        const dataArray = data.data;
        // console.log(category_id);
        // Vlid category_id: 1000  1001  1003
        
        // console.log(dataArray);
        sortIt(dataArray);
        
        // let isSort = false;
        // // isSort = isSortBool();
        // console.log();
        // if (isSort) {
        // }
        // else {
        //     displayData(dataArray);
        // }
        


    }
    else if (category_id != 1000 || category_id != 1001 || category_id != 1003) {
        // // console.log(category_id, "data Note Found!!");

        // const noData = document.getElementById("noData");
        // const cardsContainer = document.getElementById("cards");
        // cardsContainer.innerHTML = ``;
        // // const div = document.createElement("div");
        // noData.innerHTML = `
        // <div class="flex flex-col items-center my-32">
        //         <div>
        //             <img src="./Icon.png" alt="">
        //         </div>
        //         <div class="text-3xl my-10">Oops!! Sorry, There is no content here</div>
        // </div>
        // `;

        // cardsContainer.appendChild(div);

    }
}

// document.getElementById("sortDec").addEventListener("click", function callisSortBool(category_id,global_category_id) {  
//     isSortBool(category_id,global_category_id);
// })