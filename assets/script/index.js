// all video show korar jonn fetch
function categoriesDataLoad() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => newDataLoad(data.categories))
};


function newDataLoad(categories) {
    for (const cat of categories) {
        // console.log(cat);👆 ⬆️

        const html_Element_k_Dhorchi_Jekhane_Button_thakbe = document.getElementById("categories-parent");

        const createDiv = document.createElement("div");
        createDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="dynamic_Button_a_click_korle_dynamic_Id_onujayi_data_dekhabe(${cat.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category} </button>
    `;
        // append child
        html_Element_k_Dhorchi_Jekhane_Button_thakbe.append(createDiv)
    }
}

const dynamic_Button_a_click_korle_dynamic_Id_onujayi_data_dekhabe = (id) => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url)👆 ⬆️
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // এখানে dynamically তৈরি করা ৩টি button-এর id ধরে তাদের মধ্যে active class যোগ করছি।
            removerActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`)
            console.log(clickedButton)
            clickedButton.classList.add("active")
            sob_video_display_korar_machin(data.category);
        });
}
// 👉 কাজ শেষ হলে function-টি কল করছি।👇 ⬇️
categoriesDataLoad()

// এই function ব্যবহার করে যেসব class সবসময় active থাকে, সেগুলো remove করছি।👇 ⬇️
const removerActiveClass = ()=>{
    const activeClass = document.getElementsByClassName("active");
    for(const btn of activeClass){
        btn.classList.remove("active")
    }
}

// 👉 API থেকে ডেটা নিয়ে এসে মেশিনে পাঠাচ্ছি।
function categoryVideo() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => sob_video_display_korar_machin(data.videos))
};

// 👉 সব ভিডিও প্রদর্শন করার মেশিনে  প্রক্রিয়া
function sob_video_display_korar_machin(videos) {
    // console.log(videos)👆 ⬆️
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    for (const video of videos) {
        // console.log(video)👆 ⬆️
        // create element for video👇 ⬇️
        const createVideoDiv = document.createElement("div")
        createVideoDiv.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
                <figure class="relative card bg-base-100">
                    <img class="rounded-sm w-full h-[150px] object-cover" src="${video.thumbnail}" />
                    <p class="absolute sm:mt-25 bg-black text-white rounded text-sm sm:ml-40">3hrs 56 min ago</p>
                </figure>
                <div class="flex">
                    <div class="avatar py-5 px-2">
                        <div class="ring-primary ring-offset-base-100 w-7 h-7 rounded-full ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div class="py-4">
                        <h2 class="text-xl font-bold">${video.title} </h2>
                        <h5 class="flex items-center gap-2">
                            <p class="text-[#777777]"> ${video.authors[0].profile_name}</p>
                            <img class="w-5 h-5 mt-1" src="/assets/varifeid.png" alt="">
                        </h5>
                        <p class="text-[#777777]"> ${video.others.views} </p>
                    </div>
                </div>
            </div>
        `;

        videoContainer.append(createVideoDiv)
    }
};
// 👉 সব ভিডিও প্রদর্শন করার মেশিনে প্রক্রিয়া👆 ⬆️
