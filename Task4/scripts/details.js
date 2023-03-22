let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function traerDatos() {
    try {
        const response = await fetch(urlApi)
        console.log(response);
        const data = await response.json()
        console.log(data);
        crearDetailsApi(data)
    }
    catch (error) {
        console.log(error);
    }
}
traerDatos()

function crearDetailsApi(array) {
    console.log([document])
    let query = location.search
    let parametros = new URLSearchParams(query)
    console.log(parametros)
    const id = parametros.get("id")
    console.log(id)
    let evento = array.events.find(evento => evento._id == id)
    console.log(evento)
    let container = document.querySelector(".verMas")
    container.innerHTML = `<div class="row col-12 d-flex justify-content-center" style="height: 500px;">
<div id="Yellow" class="card mb-3" style="max-width: 1000px; background-color: yellow;">
<div class="row g-2">
<div class="col-md-7">
<img id="Events" src="${evento.image}" class="img-fluid rounded-start" alt="...">
</div>
<div id="Details" class="col-md-5 d-flex align-items-center">
<div class="card-body">
<h5 class="card-title d-flex justify-content-center">${evento.name}</h5>
<p class="card-text d-flex justify-content-center">category: ${evento.category}</p>
<p class="card-text d-flex justify-content-center">Date: ${evento.date}</p>
<p class="card-text d-flex justify-content-center">Description: ${evento.description}</p>
<p class="card-text d-flex justify-content-center">Place: ${evento.place}</p>
<p class="card-text d-flex justify-content-center">Capacity: ${evento.capacity}</p>
<p class="card-text d-flex justify-content-center">Assistance: ${evento.assistance}</p>
<p class="card-text d-flex justify-content-center">Price: ${evento.price}</p>
</div>
</div>
</div>
<a href="${document.referrer}" class="card-text d-flex justify-content-center">Back</a>
</div>
</div>`
}

                