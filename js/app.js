const headerline2=document.getElementById("headerline2")
const headerlinesearch=document.getElementById("headerlinesearch")
const headerlinemenu=document.getElementById("headerlinemenu")
const graybg=document.getElementById("graybg")
const menuicon=document.getElementById("menuicon")   
const hidemenuicon=document.getElementById("hidemenuicon")
const cardContainer=document.getElementById("cardContainer")
const carousel=document.getElementById("carousel")

let cardkod=''
let carouselkod=''
let pagekod=''

let DATA=[]
let carouselData=[]

                // GET DATA AND LAST 3 NEWS DATA

function handleData(){
    fetch('https://67051c47031fd46a830eae14.mockapi.io/oxuaz/article')
    .then(res=>res.json())
    .then(data=>{
        DATA.length=0
        DATA.push(...data)
        carouselData=DATA.slice(-3)
        showCard()
        showCarousel()
        console.log(carouselData)
    })
}
 
                        // SHOW CAROUSEL

function showCarousel(){
    carouselkod=''      
    carouselData.map(item=>{
        carouselkod+=`
           <div class="relative w-full flex-shrink-0">
           <a  href="/pages/pages.html?id=${item.id}" class="">
            <img src="${item.img}" class="w-full h-[400px] object-cover" alt="Slide 1">
            <div class="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
              <h2 class="text-lg">${item.title}</h2>
            </div>
            <a/>
          </div>
        `
    })
    carousel.innerHTML  = carouselkod
}

                        // SHOW CARDS IN INDEX
function showCard(){
    DATA.map(item=>{
        cardkod+=`
            <a  href="/pages/pages.html?id=${item.id}" class="flex flex-col w-[90%]   shadow-2xl sm:w-[300px]">
                <img class="h-[200px] object-cover" src="${item.img}" alt="">
                <p class="fa-regular fa-calendar text-[gray] relative p-[10px]">
                    <span class="capitalize text-sm">${item.date}/${item.time} </span>
                    <span class="capitalize text-sm absolute  right-[10px]"><i class="fa-solid fa-eye px-[2px]"></i>${item.view}</span>
                </p> 
                <p class="p-[10px]">${item.title}</p>
                <div class="flex justify-between p-[10px]">
                    <i class="fa-regular fa-thumbs-up">100</i> 
                    <i class="fa-regular fa-thumbs-down">23</i>
                </div>  
            </a>
        `
    })
    cardContainer.innerHTML=cardkod
}


handleData()


                    // HANDLE SEARCH BAR AND MENU 

function showsearch(){
    headerlinesearch.style.display="flex"
    headerline2.style.display="none"
}   
function hidesearch(){
    headerlinesearch.style.display="none"
    headerline2.style.display="flex"
}
function showmenu(){
    headerlinemenu.classList.toggle("hidden")
    graybg.classList.toggle("hidden")
    menuicon.classList.toggle('fa-xmark')
    menuicon.classList.toggle('fa-bars')

}