

const showLoader=()=>{
        const loader = document.getElementById("loader").classList.remove("hidden");
        const containerOfVideo = document.getElementById("video-container").classList.add("hidden")
    }
    const hideLoader=()=>{
        const loader = document.getElementById("loader").classList.add("hidden");
        const containerOfVideo = document.getElementById("video-container").classList.remove("hidden")
    }

// all video show korar jonn fetch
function categoriesDataLoad() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => newDataLoad(data.categories))
};




function newDataLoad(categories) {
    for (const cat of categories) {
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
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // এখানে dynamically তৈরি করা ৩টি button-এর id ধরে তাদের মধ্যে active class যোগ করছি।
            removerActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add("active")
            sob_video_display_korar_machin(data.category);
        });
}
// 👉 কাজ শেষ হলে function-টি কল করছি।👇 ⬇️
categoriesDataLoad();
categoryVideo();



// এই function ব্যবহার করে যেসব class সবসময় active থাকে, সেগুলো remove করছি।👇 ⬇️
const removerActiveClass = () => {
    const activeClass = document.getElementsByClassName("active");
    for (const btn of activeClass) {
        btn.classList.remove("active")
    }
}




// 👉 API থেকে ডেটা নিয়ে এসে মেশিনে পাঠাচ্ছি।
    // search input validation👇 ⬇️
function categoryVideo(searchText = "") {
             showLoader()                                      //  search input validation👇 ⬇️
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchText}`)
        .then(res => res.json())
        .then(data => {
            // 👉 all বাটনে আগে active class ছিল না, তা যোগ করেছি এবং remove করার জন্য function ব্যবহার করেছি।
            removerActiveClass();
            const btnAll = document.getElementById("btn-all").classList.add("active");
            sob_video_display_korar_machin(data.videos)
        })
};




// এই function ব্যবহার করে ডেটা নিয়ে আসছি যাতে card-এর বিস্তারিত দেখাতে পারি।👇 ⬇️
function showDetails(id) {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showVideoDetails(data.video))
}
// এখানে modal-এর সঙ্গে card যোগ করে দেখানো হয়েছে।👇 ⬇️
const showVideoDetails = (video) => {
    const modalShow = document.getElementById("my_modal_5").showModal();
    const showDetailsContainer = document.getElementById("show-Details-container");
    showDetailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img class="w-full h-[250px] rounded"
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>class="overflow-hidden" ${video.description}</p>
  </div>
</div>
    `;
}
// এখানে modal-এর সঙ্গে card যোগ করে দেখানো হয়েছে।




// 👉 সব ভিডিও প্রদর্শন করার মেশিনে  প্রক্রিয়া👇 ⬇️
function sob_video_display_korar_machin(videos) {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
// jody API er moddhe data na thake tahole
    if(videos.length == 0){
        videoContainer.innerHTML = `
        <div class="col-span-full mx-auto items-center py-20 flex flex-col justify-center">
                <img class="w-[120px]" src="/assets/Icon.png" alt="">
                <h2 class="text-4xl font-bold flex flex-col">Oops!! Sorry, There is no
                    <span class="text-center">content here</span>
                </h2>
            </div>
        `;
        hideLoader();
        return;
        // API data na thake close
    }
    for (const video of videos) {
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
                <button onclick="showDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
            </div>
        `;

        videoContainer.append(createVideoDiv)
    }
     hideLoader()
};
// 👉 সব ভিডিও প্রদর্শন করার মেশিনে প্রক্রিয়া👆 ⬆️


// এখানে search bar-এর validation করা হয়েছে।
    document.getElementById("searchBar").addEventListener("keyup", (e)=>{
        const input = e.target.value;
        // console.log(input);
        categoryVideo(input);

    });
    // এখানে search bar-এর validation করা হয়েছে।
    