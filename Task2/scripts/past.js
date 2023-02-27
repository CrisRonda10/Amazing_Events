console.log(data.events.length + " es el número total de eventos")

console.log("La fecha base es " + data.currentDate)

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

// *** MUESTRO LAS CARDS DE PAST EVENTS ***

let cards = document.getElementById('cartita')
let fragment =document.createDocumentFragment()

for (let eP of pastEvents){
    let div1 = document.createElement('div')
    div1.id = 'Card' 

    let img = document.createElement('img')
    img.id = 'Fotos'
    img.src = eP.image
    div1.appendChild(img)

    let div2 = document.createElement('div')
    div2.className = 'card-body'
    div1.appendChild(div2)

    let h5 = document.createElement('h5')
    h5.className = 'card-title text-center'
    h5.textContent = eP.name
    div2.appendChild(h5)

    let pCategory = document.createElement('p')
    pCategory.className = 'card-text text-center'
    pCategory.textContent = "Category: " + eP.category
    div2.appendChild(pCategory)

    let pDate = document.createElement('p')
    pDate.className = 'card-text text-center'
    pDate.textContent = "Date: " + eP.date
    div2.appendChild(pDate)

    let div3 = document.createElement('div')
    div3.className = 'card-body d-flex justify-content-evenly'
    div2.appendChild(div3)

    let pPrice = document.createElement('p')
    pPrice.className = 'text-center'
    pPrice.textContent = "Price $" + eP.price
    div3.appendChild(pPrice)

    let aDetails = document.createElement('a')
    aDetails.className = 'btn btn-primary style="font-size: small;"'
    aDetails.textContent = "See more"
    aDetails.href = './details.html'
    div3.appendChild(aDetails)

    fragment.appendChild(div1)
    console.log(fragment)
}

cards.appendChild(fragment)
