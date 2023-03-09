console.log(data.events.length + " es el número total de eventos")

console.log("La fecha base es " + data.currentDate)

// *** MUESTRO LAS CARDS EN HOME ***
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
crearCards(data.events, '#cartita')



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

console.log(pastEvents + " estos son los past events")
console.log(upcomingEvents + " estos son los upcoming events")

// *** SEPARO CATEGORÍAS EN ARRAY PARA SABER CUÁLES SON Y SIN REPETIRLAS *** 

let category = []

data.events.forEach(cate => {
    if (!category.includes(cate.category)){
        category.push(cate.category)
    }
})
console.log(category)

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


// *** CREO ARRAY PARA AGREGAR EVENLISTENER A CADA CHECKBOX ***    

let checkboxButtons = document.querySelectorAll("input[type='checkbox']")
console.log(checkboxButtons)

checkboxButtons.forEach(box => box.addEventListener('change', estaChequeado))

function estaChequeado(){
    let chequeado = Array.from(checkboxButtons).filter(checkbox => checkbox.checked) // genera un array con los input chequeados
    console.log(chequeado)
    let arrayNuevasCards = filtrarCategorias(data.events,chequeado)
    console.log(arrayNuevasCards)
    crearCards(arrayNuevasCards, '#cartita'); {
        if (chequeado.length == 0 || arrayNuevasCards.length == 0){
            crearCards(data.events, '#cartita')
        }
    }
   
}

let categoriasFiltradas = []

function filtrarCategorias (array, valor){
    let categoriasFiltradas = []
    
    
    let filtros = []
    
    for (let v of valor){
        filtros.push(v.value) // genero un array con los valores de los input 
        console.log("filtros:", filtros)
    }
    
    for (let i of filtros){
        categoriasFiltradas = categoriasFiltradas.concat(array.filter(item => item.category === i)) //concateno en un nuevo array los objetos que coinciden con la categoría obtenida en los filtros
        console.log("categoriasFiltradas:", categoriasFiltradas)
    }
    
    return categoriasFiltradas
}

function buscarValor(param, valor){
    let respuesta = []
    console.log("param:", param)
    console.log("valor:", valor)
    for (item of param){
        if(item.name.trim().toLowerCase().includes(valor.trim().toLowerCase()) || item.description.trim().toLowerCase().includes(valor.trim().toLowerCase())){
            respuesta.push(item)
        } 
    }
        if(!respuesta.length){
         alert("THIS EVENT DOESN'T EXIST")
        }
     crearCards(respuesta, '#cartita')
     console.log("respuesta:", respuesta)
 }

function handleSearch(search){
    console.log("estoy buscando")
    console.log("search:", search.target.value)
    if (search.target.value.length && categoriasFiltradas.length){
        buscarValor(categoriasFiltradas, search.target.value)
    }
     if (search.target.value.length && !categoriasFiltradas.length){
         buscarValor(data.events, search.target.value)
     }
     if(!search.target.value.length){
         crearCards(data.events, '#cartita')
     }
}

let search = document.querySelector("input[type='search']")
console.log(search)
search.addEventListener('search', (e) =>{
    
    handleSearch (e) 

})
  


