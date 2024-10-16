const pagesdiv=document.getElementById("pagesdiv")
let idofpage=location.search.split('=').at(-1)
let currentPage={}

                    // GET CURRENT NEWS' DATA

fetch(`https://67051c47031fd46a830eae14.mockapi.io/oxuaz/article/${idofpage}`)
        .then(res=>res.json())
        .then(data=>{
            currentPage=data
            showPage()
        })
        .catch(error => {
            return
        })  


                    // SHOW CURRENT DATA CARD IN PAGES.HTML

function showPage() {
    currentPage.view+=1
    pagesdiv.innerHTML = `
        <img class="wid-100 w-[500px] mt-[50px]" src="${currentPage.img}" alt="">
        <div id="pagestxt" class="flex w-[400px] wid-100">
            <p>Ana Səhifə / Dünya</p>    
            <p class="fa-regular fa-calendar text-[gray]">
                <span class="capitalize text-sm">${currentPage.date} / ${currentPage.time}</span>
                <span class="capitalize text-sm pl-[30px]"><i class="fa-solid fa-eye"></i>${currentPage.view || 0}</span>
            </p> 
        </div>
        <p class="text-lg py-[10px] font-bold">${currentPage.title}</p>
        <div class="flex justify-between w-[30%] py-[20px]">
            <i class="fa-regular fa-thumbs-up px-[20px}">100</i> 
            <i class="fa-regular fa-thumbs-down">23</i>
        </div>  
        <p class="p-[20px]">${currentPage.desc}</p>
    `;
}