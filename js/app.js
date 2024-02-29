let contenedorTarjetas = document.querySelector("#tarjetas")
const selectNombre = document.querySelector("#nombre");
const selectEdad = document.querySelector("#edad");
const selectMinimo = document.querySelector("#minimo");
const selectMaximo = document.querySelector("#maximo");
const selectClan = document.querySelector("#clanRiwi");
const selectIngles = document.querySelector("#nivelIngles");
const selectEspecialidad = document.querySelector("#especialidad");
const selectExperto = document.querySelector("#expertoTecnologia");
const nombresito = document.querySelector("#nombresito")
const modal = document.querySelector(".modalsito")


const validarCoders = {
    nombre: "",
    edad: "",
    minimo: "",
    maximo: "",
    clan: "",
    ingles: "",
    especialidad: "",
    experto: ""
}

const showInfo = (coders) => {
    coders.forEach((coder) => {
        const option = document.createElement("option")
        option.textContent = coder.nombre
        option.value = coder.nombre
        document.querySelector("#nombre").appendChild(option)

    })

    for (i = 15; i < 46; i++) {
        const option2 = document.createElement("option")
        option2.textContent = i
        option2.value = i
        document.querySelector("#edad").appendChild(option2)
    }
}


const showCoders = (coders) => {
    limpiar()
    coders.forEach((coder) => {
        const { imageUrl, nombre, detalle, promedio, expertoTecnologia, especialidad, direccion, telefono, id } = coder
        const coderHtml = document.createElement("p")
        coderHtml.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="img/${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">${detalle}</p>
                    <a href="#" class="btn btn-primary more" imagen="${imageUrl}" nombre="${nombre}" promedio="${promedio}" experto="${expertoTecnologia}" especialidad="${especialidad}" direccion="${direccion}" telefono="${telefono}">Mas detalles</a>
                    <a href="#" class="btn btn-success hire" data-bs-toggle="modal" data-bs-target="#hire" id="${id}">Hire</a>
                </div>
            </div>
        `

        contenedorTarjetas.appendChild(coderHtml)

    })
}




nombresito.addEventListener("input", (e) => {
    validarCoders.nombre = e.target.value
    filtrarCoder()
})

selectNombre.addEventListener("change", (e) => {
    validarCoders.nombre = e.target.value
    filtrarCoder()
})

selectEdad.addEventListener("change", (e) => {
    validarCoders.edad = e.target.value
    filtrarCoder()
})

selectMinimo.addEventListener("change", (e) => {
    validarCoders.minimo = e.target.value
    filtrarCoder()
})

selectMaximo.addEventListener("change", (e) => {
    validarCoders.maximo = e.target.value
    filtrarCoder()
})

selectClan.addEventListener("change", (e) => {
    validarCoders.clan = e.target.value
    filtrarCoder()
})

selectIngles.addEventListener("change", (e) => {
    validarCoders.ingles = e.target.value
    filtrarCoder()
})

selectEspecialidad.addEventListener("change", (e) => {
    validarCoders.especialidad = e.target.value
    filtrarCoder()
})

selectExperto.addEventListener("change", (e) => {
    validarCoders.experto = e.target.value
    filtrarCoder()
})


const selectCoder = () => {
    let contenedorTarjetas1 = document.querySelector("#tarjetas")

    contenedorTarjetas1.addEventListener("click", cargar)
}

const cargar = (e) => {
    if (e.target.classList.contains("more")) {
        const img = e.target.getAttribute("imagen")
        const nombre = e.target.getAttribute("nombre")
        const promedio = e.target.getAttribute("promedio")
        const experto = e.target.getAttribute("experto")
        const especialidad = e.target.getAttribute("especialidad")
        const direccion = e.target.getAttribute("direccion")
        const telefono = e.target.getAttribute("telefono")


        let respuesta = ""

        if (promedio > 4.5) {
            respuesta = "apto para trabajo remoto"
        } else {
            respuesta = "debe estudiar mas"
        }

        modal.innerHTML = `
    
        <table>
            <tr>
                <td>imagen</td>
                <td>nombre</td>
                <td>promedio</td>
                <td>especialidad</td>
                <td>tecnologia</td>
                <td>celular</td>
                <td>direccion</td>
            </tr>
            <tbody>
            <tr>
                <th><img src="img/${img}" ></th>
                <th><p>${nombre}</p></th>
                <th><p>${respuesta}</p></th>
                <th><p>${experto}</p></th>
                <th><p>${especialidad}</p></th>
                <th><p>${telefono}</p></th>
                <th><p>${direccion}</p></th>
    
            </tr>
            
            
            </tbody>
      </table>
    
      <button class="cerrar">cerrar</button>
      
        `
    }


}

/* hireeee */

//eventos

let arrayCards = []
const cardsitas = document.querySelector("#tarjetas")
const contratados = document.querySelector("#contratados")
const borrarTodo = document.querySelector(".todo")

const selectCard = (e) =>{
    e.preventDefault()
    if (e.target.classList.contains("hire")) {
         let selectedCoder = e.target.parentElement.parentElement
         details(selectedCoder)
    }
}

const details = (coder) =>{
    const coderDetails = {
        id: coder.querySelector(".hire").getAttribute("id"),
        imagen: coder.querySelector("img").src,
        nombre: coder.querySelector("h5").textContent,
        detalles: coder.querySelector("p").textContent
    }

    arrayCards = [...arrayCards,coderDetails]
    console.log(arrayCards)
    insertHtml(arrayCards)
}

const insertHtml = () =>{
    limpiarTable()
    
    arrayCards.forEach((card) =>{
        const{imagen,nombre,detalles,id} = card
        const row = document.createElement("tr")

        row.innerHTML = `
        <td><img src="${imagen}" width="150px"></td>
        <td><h3>${nombre}</h3></td>
        <td><h3>${detalles}</h3></td>
        <td><a href="#" class="btn btn-danger eliminar" id="${id}">eliminar</a></td>

       
        `
        contratados.appendChild(row)
        

    })
}


const eliminarCoder = (e) =>{
    if(e.target.classList.contains("eliminar")){

        const id = e.target.getAttribute("id")
        arrayCards = arrayCards.filter(coder => coder.id != id)
        insertHtml()
    }


    if(e.target.classList.contains("todo")){
        arrayCards = []
        insertHtml()
    }
}

contratados.addEventListener("click", eliminarCoder)
borrarTodo.addEventListener("click" , eliminarCoder)

cardsitas.addEventListener("click",selectCard)



function filtrarCoder() {
    const resultado = coders.filter(filtrarNombre)
        .filter(filtrarEdad)
        .filter(filtrarNotas)
        .filter(filtrarClan)
        .filter(filtrarIngles)
        .filter(filtrarEspecialidad)
        .filter(filtrarExpertoTecnologia)

    nofound = document.querySelector(".nofound")

    if (resultado.length === 0) {
        nofound.style.display = "block"
        showCoders(resultado)
    } else {
        nofound.style.display = "none"
        showCoders(resultado)
    }

}



function filtrarNombre(coder) {
    if (validarCoders.nombre) {
        return coder.nombre === validarCoders.nombre;
    } else {
        return coder;
    }
}

function filtrarEdad(coder) {
    if (validarCoders.edad) {
        return coder.edad === parseInt(validarCoders.edad);
    } else {
        return coder;
    }
}


function filtrarNotas(coder) {
    if (validarCoders.minimo && validarCoders.maximo) {
        return coder.promedio >= parseInt(validarCoders.minimo) && coder.promedio <= parseFloat(validarCoders.maximo);
    } else {
        return coder;
    }
}



function filtrarClan(coder) {
    if (validarCoders.clan) {
        return coder.clanRiwi === validarCoders.clan;
    } else {
        return coder;
    }
}

function filtrarIngles(coder) {
    if (validarCoders.ingles) {
        return coder.nivelIngles === validarCoders.ingles;
    } else {
        return coder;
    }
}

function filtrarEspecialidad(coder) {
    if (validarCoders.especialidad) {
        return coder.especialidad === validarCoders.especialidad;
    } else {
        return coder;
    }
}

function filtrarExpertoTecnologia(coder) {
    if (validarCoders.experto) {
        return coder.expertoTecnologia === validarCoders.experto;
    } else {
        return coder;
    }
}

function limpiar() {
    let z = document.querySelectorAll("p")
    for (let v = 0; v < z.length; v++) {
        z[v].remove()
    }
}

function limpiarTable(){
    contratados.innerHTML = ""
}

const cerrarModal = () => {
    modal.addEventListener("click", (e) => {
        if (e.target.matches("button")) {
            modal.innerHTML = ""
        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    showInfo(coders)
    showCoders(coders)
    selectCoder()
    cerrarModal()

})

