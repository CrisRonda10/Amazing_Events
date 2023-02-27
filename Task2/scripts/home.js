console.log(data.events.length + " es el número total de eventos")

console.log("La fecha base es " + data.currentDate)

// *** MUESTRO LAS CARDS EN HOME ***

let cards = document.getElementById('cartita')
 let fragment =document.createDocumentFragment()

 for (let e of data.events){
     let div1 = document.createElement('div')
     div1.id = 'Card'
    
     let img = document.createElement('img')
     img.id = 'Fotos'
     img.src = e.image
     div1.appendChild(img)

     let div2 = document.createElement('div')
     div2.className = 'card-body'
     div1.appendChild(div2)
    
     let h5 = document.createElement('h5')
     h5.className = 'card-title text-center'
     h5.textContent = e.name
     div2.appendChild(h5)

     let pCategory = document.createElement('p')
     pCategory.className = 'card-text text-center'
     pCategory.textContent = "Category: " + e.category
     div2.appendChild(pCategory)

     let pDate = document.createElement('p')
     pDate.className = 'card-text text-center'
     pDate.textContent = "Date: " + e.date
     div2.appendChild(pDate)

     let div3 = document.createElement('div')
     div3.className = 'card-body d-flex justify-content-evenly'
     div2.appendChild(div3)

     let pPrice = document.createElement('p')
     pPrice.className = 'text-center'
     pPrice.textContent = "Price $" + e.price
     div3.appendChild(pPrice)

     let aDetails = document.createElement('a')
     aDetails.className = 'btn btn-primary'
     aDetails.textContent = "See more"
     aDetails.href = './details.html'
     div3.appendChild(aDetails)
   
     fragment.appendChild(div1)
     console.log(fragment)
 }

 cards.appendChild(fragment)

// *** SEPARO LAS CARDS EN PAST Y UPCOMING ***

let pastEvents = []
let upcomingEvents = []

for (let i = 0; i < data.events.length; i++) {
    if (data.currentDate > data.events[i].date) {
        pastEvents.push(data.events[i]._id)
    } else {
        upcomingEvents.push(data.events[i]._id)
    }
}

console.log(pastEvents + " estos son los past events")
console.log(upcomingEvents + " estos son los upcoming events")


     