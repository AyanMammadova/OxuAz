const title=document.getElementById("title")
const desc=document.getElementById("description")
const img=document.getElementById("img")
const date=document.getElementById("date")
const time=document.getElementById("time")
let idexist=false

const formdiv=document.getElementById("form")
const showbutton=document.getElementById("showbutton")
const table=document.getElementById("table")
const cardContainer=document.getElementById("cardContainer")
const submitbutton=document.getElementById("submitbutton")

function handleSubmit(event){
    console.log("isledimmmm");
    
    event.preventDefault()
    const  titleValue=title.value
    const  descValue=desc.value
    const  imgValue=img.value
    const  dateValue=date.value
    const  timeValue=time.value
    let    viewValue=0
    if(titleValue.trim().length<5 || titleValue.length>100) return alert('Xəbər başlığığnız 5-100 simvol uzunluqda olmalıdır')
    if(descValue.trim().length<10 || descValue.length>2000) return alert('Xəbər kontekstiniz 10-2000 simvol uzunluqda olmalıdır')

                                            // FORMAT DATE
    const today=new Date()
    let dateobj=new Date(dateValue)
    if(dateobj.getFullYear() < 2000) return alert('2000den önce baş veren xeberi elave ede bilmezsiz')
    if(dateobj.getFullYear() > today.getFullYear()) return alert('Hələ baş verməmiş xəbəri elave ede bilmezsiz')
    const convertedDate = dateobj.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    })


                                            // ADD DATA TO API
    const obj={
        "img":imgValue,
        "title":titleValue,
        "desc":descValue,
        "view":viewValue,
        "date":convertedDate,
        "time":timeValue,
    }
    
        
    if(idexist){
        console.log("salallllllll");
        
        editfunction(id,obj)
    }
    else{
        fetch('https://67051c47031fd46a830eae14.mockapi.io/oxuaz/article', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                handleData()
                clearValues()
                
            })
    }
    
    handleform()

    
}
function clearValues(){
    title.value=''
    desc.value=''
    img.value=''
    date.value=''
    time.value=''
    idexist=false
}

let DATA=[]
function handleData(){
    fetch('https://67051c47031fd46a830eae14.mockapi.io/oxuaz/article')
    .then(res=>res.json())
    .then(data=>{
        DATA.length=0
        DATA.push(...data)
        showTable()
    })
}


function showTable(){
    table.innerHTML=`
        <tr class="text-left bg-[#62bbbb80] ">
            <th class="w-2/5 text-nowrap overflow-hidden">BAŞLIQ</th>
            <th class="w-1/4 text-nowrap overflow-hidden">KONTEKST</th>
            <th class="w-1/6 text-nowrap overflow-hidden">TARİX</th>
            <th class="w-1/6 text-nowrap overflow-hidden">SAAT</th>
            <th class="w-1/12 text-nowrap overflow-hidden">SİL</th>
            <th class="w-1/12 text-nowrap overflow-hidden">EDİT</th>
        </tr>
    `
    DATA.map(item=>{
        table.innerHTML+=`
            <tr class="my-[20px] font-bold">
                <td class="w-2/5 text-nowrap overflow-hidden text-ellipsis p-[10px]">${item.title}</td>
                <td class="w-1/4 text-nowrap overflow-hidden text-ellipsis p-[10px]">${item.desc}</td>
                <td class="w-1/6 text-nowrap overflow-hidden text-ellipsis p-[10px]">${item.date}</td>
                <td class="w-1/6 text-nowrap overflow-hidden text-ellipsis p-[10px]">${item.time}</td>
                <td class="w-1/12 text-nowrap overflow-hidden text-ellipsis p-[10px]"><i onclick="deleteNews(${item.id})" class="fa-solid fa-trash cursor-pointer"></i></td>
                <td class="w-1/12 text-nowrap overflow-hidden text-ellipsis p-[10px]"><i onclick="editNews(${item.id})" class="fa-solid fa-pen cursor-pointer"></i></td>
            </tr>
        `
    })
}


function editNews(index){
    let exitingid=DATA.some(item=>item.id==index)
    handleform()
    const form=document.getElementById("form")
    submitbutton.innerHTML="Xəbəri redaktə edin"
    const{img:url,title:ad,desc:aciqlama,date:tarix,time:saat}=DATA.find(item=>item.id==index)
    title.value=ad
    desc.value=aciqlama
    img.value=url
    date.value=tarix
    time.value=saat
    if(exitingid){
        idexist=true
        id=index
        form.onsubmit=(event)=>{
            event.preventDefault()
            const editedobj = {
                img:img.value,
                title:title.value,
                desc:desc.value,
                view:0,
                date:date.value,
                time:time.value,
            }
            // editfunction(index,editedobj)
        }
    }
    
}

function editfunction(index,editedobj){
    fetch(`https://67051c47031fd46a830eae14.mockapi.io/oxuaz/article/${index}`, {
        method: 'PUT',
        body: JSON.stringify(editedobj),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
            handleData()
            showTable()
            clearValues()  

        });
        idexist=false
}

function deleteNews(index){
    fetch(`https://67051c47031fd46a830eae14.mockapi.io/oxuaz/article/${index}`, {
        method: 'DELETE',
    })
    .then(res=>res.json)
    .then(data=>{
        console.log(data)
        DATA.filter(item=>item.id!=index)
        handleData()
        showTable()
    })    
}

    
function handleform(){
    formdiv.classList.toggle('hidden')
    // clearValues()
    showbutton.classList.toggle('hidden')
    submitbutton.innerHTML="Xəbər əlavə et"
}

handleData()
