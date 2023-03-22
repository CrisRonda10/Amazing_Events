let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

let nuevosEventos = []
let category = []

async function traerDatos() {
    try {
        const response = await fetch(urlApi)
        console.log(response);
        const data = await response.json()
        console.log(data);
        nuevosEventos = data.events
        console.log("todos:", nuevosEventos);

        let eventosActualizados = []
        function eventosConPorcentajes() {
            eventosActualizados = nuevosEventos.map(evento => {
                return ({ _id: evento._id, name: evento.name, category: evento.category, date: evento.date, assistance: evento.assistance, capacity: evento.capacity, porcentaje: evento.assistance / evento.capacity * 100 + "%", estimate: evento.estimate, price: evento.price, porcentajeEstimado: evento.estimate / evento.capacity * 100 + "%" })

            })
            eventosActualizados.map(evento => {
                if (evento.porcentaje == "NaN%") {
                    evento.porcentaje = 0
                }
                if (evento.porcentajeEstimado == "NaN%") {
                    evento.porcentajeEstimado = 0
                }
            })

        }
        eventosConPorcentajes()
        console.log("eventosActualizados:", eventosActualizados);

        let pastEvents = []
        let upcomingEvents = []

        for (let i = 0; i < eventosActualizados.length; i++) {
            if (data.currentDate > eventosActualizados[i].date) {
                pastEvents.push(eventosActualizados[i])
            } else {
                upcomingEvents.push(eventosActualizados[i])
            }
        }
        console.log("pastEvenst:", pastEvents);
        console.log("upcomingEvents:", upcomingEvents);

        function separarCategorias() {
            category = []
            eventosActualizados.forEach(evento => {
                if (!category.includes(evento.category)) {
                    category.push(evento.category)
                }
            })
            return category
        }

        separarCategorias()
        console.log("categorias:", category);

        function porcentajeMasAlto() {
            return eventosActualizados.reduce((acumulador, comparacion) => {
                if (comparacion.porcentaje > acumulador.porcentaje) {
                    return comparacion;
                } else {
                    return acumulador;
                }
            })
        }
        porcentajeMasAlto()
        const resultadoAlto = porcentajeMasAlto()

        console.log("porcentajeMasAlto:", resultadoAlto.name);

        function porcentajeMasBajo() {
            return eventosActualizados.reduce((acumulador, comparacion) => {
                if (comparacion.porcentaje < acumulador.porcentaje) {
                    return comparacion;
                } else {
                    return acumulador;
                }
            })
        }
        porcentajeMasBajo()
        const resultadoBajo = porcentajeMasBajo()
        console.log("porcentajeMasBajo:", resultadoBajo.name);

        function mayorCapacidad() {
            return eventosActualizados.reduce((acumulador, comparacion) => {
                if (comparacion.capacity > acumulador.capacity) {
                    return comparacion;
                } else {
                    return acumulador;
                }
            })
        }
        mayorCapacidad()
        const mayorCapa = mayorCapacidad()
        console.log("mayorCapacidad:", mayorCapa.name);

//DIBUJO TABLA
function tablaPrimera(){
 let crearT1 = document.querySelector('#T1')
 crearT1.innerHTML = ""
 let tr = document.createElement('tr')
 let td1 = document.createElement('td')
 td1.textContent = resultadoAlto.name
 tr.appendChild(td1)
 let td2 = document.createElement('td')
 td2.textContent = resultadoBajo.name
 tr.appendChild(td2)
 let td3 = document.createElement('td')
 td3.textContent = mayorCapa.name
 tr.appendChild(td3)
 crearT1.appendChild(tr)
}
tablaPrimera()

//DIBUJO TABLA UPCOMING
        function tablaUpcoming(){
        let crearT2 = document.querySelector('#T2')
        crearT2.innerHTML = ""
        for (let cate of category) {
            let categoriaLLena = []
            let ganaciaTotal = []
            let totalAsistencia = []

            categoriaLLena = upcomingEvents.filter(evento => evento.category == cate)
            if(categoriaLLena.length > 0){
            for (let item of categoriaLLena){
                ganaciaTotal = parseInt(ganaciaTotal + item.price * item.estimate)
                totalAsistencia = parseInt(totalAsistencia + parseInt(item.porcentajeEstimado)) 
            }
            
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            td1.textContent = cate
            tr.appendChild(td1)
            let td2 = document.createElement('td')
            td2.textContent = "$ " + ganaciaTotal.toLocaleString()
            tr.appendChild(td2)
            let td3 = document.createElement('td')
            td3.textContent = (totalAsistencia/categoriaLLena.length).toFixed(2) + " %"
            tr.appendChild(td3)
            crearT2.appendChild(tr)
        }}
    }
    tablaUpcoming()

    //DIBUJO TABLA PAST
        function tablaPast(){
        let crearT3 = document.querySelector('#T3')
        crearT3.innerHTML = ""
        for (let cate of category) {
            let categoriaLLena = []
            let ganaciaTotal2 = []
            let totalAsistencia2 = []

            categoriaLLena = pastEvents.filter(evento => evento.category == cate)
            for (let item of categoriaLLena){
                ganaciaTotal2 = parseInt(ganaciaTotal2 + item.price * item.assistance)
                totalAsistencia2 = parseInt(totalAsistencia2 + parseInt(item.porcentaje)) 
            }
            
            let tr2 = document.createElement('tr')
            let td1 = document.createElement('td')
            td1.textContent = cate
            tr2.appendChild(td1)
            let td2 = document.createElement('td')
            td2.textContent = "$ " + ganaciaTotal2.toLocaleString()
            tr2.appendChild(td2)
            let td3 = document.createElement('td')
            td3.textContent = (totalAsistencia2/categoriaLLena.length).toFixed(2) + " %"
            tr2.appendChild(td3)
            crearT3.appendChild(tr2)
        }
        }
        tablaPast()
        
    }
    catch (error) {
        console.log(error);
    }
}
traerDatos()





