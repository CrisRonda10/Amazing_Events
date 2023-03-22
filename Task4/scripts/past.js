let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

// fetch(urlApi)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
//     console.log(data.events);
// })


// *** MUESTRO LAS CARDS EN HOME ***
function crearCards(arr, contenedor) {
    let cards = document.querySelector(contenedor)
    cards.innerHTML = ""
    arr.forEach(item => {
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

// *** SEPARO LAS CARDS EN PAST Y UPCOMING ***

//   let upcomingEvents = []
function separar(array, tiempo) {
    const result = []
    if (tiempo === "past") {
        for (let i = 0; i < array.events.length; i++) {
            if (array.currentDate > array.events[i].date) {
                result.push(array.events[i])
            }
        }
    }else{for (let i = 0; i < array.events.length; i++) {
        if (array.currentDate < array.events[i].date) {
            result.push(array.events[i])
        }
    }}
    return result

}
// *** SEPARO CATEGORÍAS EN ARRAY PARA SABER CUÁLES SON Y SIN REPETIRLAS *** 

function crearCat(arr) {
    let category = []
    arr.forEach(cate => {
        if (!category.includes(cate.category)) {
            category.push(cate.category)
        }
    })

    // *** CREANDO CHECKBOX POR CADA CATEGORÍA ***

    let crearCheckbox = document.querySelector('#Checkbox')
    crearCheckbox.innerHTML = ""
    category.forEach(item => {
        let label = document.createElement('label')
        label.setAttribute = ("for", 'item')
        label.innerHTML = item
        crearCheckbox.appendChild(label)
        let checkbox = document.createElement('input')
        checkbox.setAttribute("type", "checkbox")
        checkbox.value =
            checkbox.id = item
        checkbox.title = item
        checkbox.innerHTML = item
        label.appendChild(checkbox)
    })
}


let nuevosEventos = []
async function traerDatos() {
    try {
        const response = await fetch(urlApi)
        console.log(response)
        const data = await response.json()
        console.log(data);
        crearCards(separar(data, "past"), '#cartita')
        crearCat(data.events)
        nuevosEventos = separar(data, "past")
        console.log(nuevosEventos);
    }
    catch (error) {
        console.log(error);
    }
}
traerDatos()



let categoriasFiltradas = [] //eventos filtrados
function filtrarCategorias(array, filtros) {
    categoriasFiltradas = []
    for (let i of filtros) {
        categoriasFiltradas = categoriasFiltradas.concat(array.filter(item => item.category === i)) //concateno en un nuevo array los objetos que coinciden con la categoría obtenida en los filtros
    }
    return categoriasFiltradas
}

// *** CREO ARRAY PARA AGREGAR EVENTLISTENER A CADA CHECKBOX ***    

let crearCheckbox = document.querySelector('#Checkbox')
crearCheckbox.addEventListener('click', (e) => estaChequeado(e)) //llamo al div con cualquier click

let catCheck = [] //almacena las cat seleccionadas
function estaChequeado(e) {
    if (e.target.type === "checkbox" && !catCheck.includes(e.target.value)) { //solo los checkbox
        catCheck.push(e.target.value) //guarda el valor del check (palabra)
    } else if (e.target.type === "checkbox" && catCheck.includes(e.target.value)) {
        catCheck = catCheck.filter(elem => elem !== e.target.value) //filtra los elem q no coincide con el presionado

    }
    let arrayNuevasCards = filtrarCategorias(nuevosEventos, catCheck)
    if (catCheck.length == 0) {
        crearCards(nuevosEventos, '#cartita')
    } else { crearCards(arrayNuevasCards, '#cartita') }
}


function buscarValor(param, valor) {
    let respuesta = []
    for (item of param) {
        if (item.name.trim().toLowerCase().includes(valor.trim().toLowerCase()) || item.description.trim().toLowerCase().includes(valor.trim().toLowerCase())) {
            respuesta.push(item)
        }
    }
    if (!respuesta.length) {
        crearMensaje()
    }
    crearCards(respuesta, '#cartita')
}

function handleSearch(search) {
    mensaje.innerHTML = ``

    if (search.target.value.length && categoriasFiltradas.length) {
        buscarValor(categoriasFiltradas, search.target.value)
    }
    if (search.target.value.length && !categoriasFiltradas.length) {
        buscarValor(nuevosEventos, search.target.value)
    }
    if (!search.target.value.length && categoriasFiltradas.length) {
        crearCards(categoriasFiltradas, '#cartita')
    }
    if (!search.target.value.length && !categoriasFiltradas.length) {
        crearCards(nuevosEventos, '#cartita')
    }
}

let search = document.querySelector("input[type='search']")
search.addEventListener('search', (e) => { handleSearch(e) })


let mensaje = document.querySelector('#Mensaje')
function crearMensaje() {
    mensaje.innerHTML = `<div class="row grid gap-5 justify-content-center align-items-center" style="border: 3px solid black; height: 70px;">THIS EVENT DOESN'T EXIST</div>`
}

