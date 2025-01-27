const pagesdiv = document.getElementById("pagesdiv")
let idofpage = location.search.split('=').at(-1)
let currentPage = {}

// GET CURRENT NEWS' DATA

fetch(`https://679798adc2c861de0c6d53a3.mockapi.io/articles/articles/${idofpage}`)
    .then(res => res.json())
    .then(data => {
        currentPage = data
        showPage()
    })
    .catch(error => {
        return
    })


// SHOW CURRENT DATA CARD IN PAGES.HTML

function showPage() {
    currentPage.view += 1
    pagesdiv.innerHTML = `
        <div>
        <img class="wid-100 w-[100%]  mt-[50px]" src="${currentPage.img}" alt="">
        <div id="pagestxt" class="flex  items-center h-[50px] lg:justify-between  lg:w-[100%]">
            <p class="text-start w-[100%]">Ana Səhifə / Dünya</p>    
            <p class="fa-regular fa-calendar text-start w-[100%] text-[gray]">
                <span class="capitalize text-sm">${currentPage.date} / ${currentPage.time}</span>
                <span class="capitalize text-sm pl-[30px]"></span>
            </p> 
        </div>
        </div>
        <div>
        <p class="text-lg pt-[20px] lg:pt-[50px] pl-[10px] lg:pl-[40px] font-bold">${currentPage.title}</p>
         
        <p class="lg:p-[20px] p-[5px]">${currentPage.desc}</p>
        <div class="flex pl-[30px]  gap-[20px] w-[30%] py-[20px]">
            <i class="fa-regular fa-thumbs-up px-[20px}">100</i> 
            <i class="fa-regular fa-thumbs-down">23</i>
        </div> 
        </div>
    `;
}