// *** SEPARO LAS CARDS EN PAST Y UPCOMING ***

 let pastEvents = []
 let upcomingEvents = []

 for (let i = 0; i < data.events.length; i++) {
     if (data.currentDate > data.events[i].date) {
         pastEvents.push(data.events[i])
     } else {
         upcomingEvents.push(data.events[i])
     }
 }

// *** MUESTRO LAS CARDS DE PAST EVENTS ***

function crearCards(arr, contenedor){
    let cards = document.querySelector(contenedor)
    cards.innerHTML = ""
    arr.forEach (item => {
        let div1 = document.createElement('div')
        div1.id = 'Card'
      
        let img = document.createElement('img')
        img.id = 'Fotos'
        img.src = item.image
        div1.appendChild(img)
  
        let div2 = document.createElement('div')
        div2.className = 'card-body'
        div1.appendChild(div2)
      
        let h5 = document.createElement('h5')
        h5.className = 'card-title text-center'
        h5.textContent = item.name
        div2.appendChild(h5)
  
        let pCategory = document.createElement('p')
        pCategory.className = 'card-text text-center'
        pCategory.textContent = "Category: " + item.category
        div2.appendChild(pCategory)
  
        let pDate = document.createElement('p')
        pDate.className = 'card-text text-center'
        pDate.textContent = "Date: " + item.date
        div2.appendChild(pDate)
  
        let div3 = document.createElement('div')
        div3.className = 'card-body d-flex justify-content-evenly'
        div2.appendChild(div3)
  
        let pPrice = document.createElement('p')
        pPrice.className = 'text-center'
        pPrice.textContent = "Price $" + item.price
        div3.appendChild(pPrice)
  
        let aDetails = document.createElement('a')
        aDetails.className = 'btn btn-primary'
        aDetails.textContent = "See more"
        aDetails.href = `./details.html?id=${item._id}`
        div3.appendChild(aDetails)
     
        cards.appendChild(div1)    
    });
  }
  crearCards(pastEvents, '#cartita')

  // *** SEPARO CATEGORÍAS EN ARRAY PARA SABER CUÁLES SON Y SIN REPETIRLAS *** 

let category = []

pastEvents.forEach(cate => {
    if (!category.includes(cate.category)){
        category.push(cate.category)
    }
})

// *** CREANDO CHECKBOX POR CADA CATEGORÍA ***

let crearCheckbox = document.querySelector('#Checkbox')
crearCheckbox.innerHTML = "" 
category.forEach(item =>{
    let label = document.createElement('label')
    label.setAttribute = ("for",'item')
    label.innerHTML = item
    crearCheckbox.appendChild(label)
    let checkbox = document.createElement('input')
    checkbox.setAttribute("type","checkbox")
    checkbox.value = 
    checkbox.id = item
    checkbox.title = item
    checkbox.innerHTML = item    
    label.appendChild(checkbox)
})    




let checkboxButtons = document.querySelectorAll("input[type='checkbox']")

checkboxButtons.forEach(box => box.addEventListener('change', estaChequeado))

function estaChequeado(){
    let chequeado = Array.from(checkboxButtons).filter(checkbox => checkbox.checked)
    let arrayNuevasCards = filtrarCategorias(pastEvents, chequeado)
    crearCards(arrayNuevasCards, '#cartita'); {
        if (chequeado.length == 0 || arrayNuevasCards.length == 0){
            crearCards(pastEvents,'#cartita')
        }
    }
}

let categoriasFiltradas = []

function filtrarCategorias (array, valor){
    categoriasFiltradas = []
    let filtros = []
    for (let v of valor){
        filtros.push(v.value)   
    }
    for (let i of filtros){
        categoriasFiltradas = categoriasFiltradas.concat(array.filter(item => item.category === i)) 
    }
    return categoriasFiltradas
}

function buscarValor(param, valor){
    let respuesta = []
    for (item of param){
        if(item.name.trim().toLowerCase().includes(valor.trim().toLowerCase()) || item.description.trim().toLowerCase().includes(valor.trim().toLowerCase())){
            respuesta.push(item)
        } 
    }
    if(!respuesta.length){
        crearMensaje()
    }
    crearCards(respuesta, '#cartita')
 }

function handleSearch(search){
    mensaje.innerHTML = ``
    
    if (search.target.value.length && categoriasFiltradas.length){
        buscarValor(categoriasFiltradas, search.target.value)
    }
     if (search.target.value.length && !categoriasFiltradas.length){
         buscarValor(pastEvents, search.target.value)
     }
     if(!search.target.value.length && categoriasFiltradas.length){
         crearCards(categoriasFiltradas, '#cartita')
     }
     if(!search.target.value.length && !categoriasFiltradas.length){
        crearCards(pastEvents, '#cartita')
     }
}

let search = document.querySelector("input[type='search']")
search.addEventListener('search', (e) =>{ handleSearch (e) })

let mensaje = document.querySelector('#Mensaje')
function crearMensaje(){ 
    mensaje.innerHTML = `<div class="row grid gap-5 justify-content-center align-items-center" style="border: 3px solid black; height: 70px;">THIS EVENT DOESN'T EXIST</div>`
}
