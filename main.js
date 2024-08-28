//PETICION DEL JSON

const cabeceras = new Headers();
cabeceras.set(`Content-Type`, `application/json`);
cabeceras.set(`Content-Encoding`, `br`);

async function peticion(mijson) {
    const respuesta = await fetch (mijson);
    if (respuesta.ok){
        const info = await respuesta.json();
        return info
    }else {
        return [];
    }
}

var ruta = "merch.json"

async function verImagenes(mijson) {
    const respuesta = await peticion(mijson)
    let all = document.querySelector(".toito")
    
    respuesta.forEach(rest => {
        const newDiv = document.createElement("div")
        newDiv.classList.add("item")
        const img = document.createElement("img");
        img.src = rest.imagen
        img.height = 400

        img.addEventListener(`mouseover`, function () {
            img.src = rest.imagenHover
        })
        img.addEventListener(`mouseout`, function () {
            img.src = rest.imagen
        } )
        newDiv.appendChild(img);

        const boton = document.createElement("button")
        boton.textContent = "Comprar"
        boton.classList.add("botonet")

        boton.addEventListener(`click`, function () {
        })

        const description = document.createElement("p");
        description.innerHTML = `${rest.Descripcion}<br>$ ${rest.Precio}.00`;
        newDiv.appendChild(description)

        newDiv.appendChild(boton);
        all.appendChild(newDiv);
    });
    
}

verImagenes(ruta)

//-----------------------------------------------------------------------------------------------------
//BOTON CARRITO

const btnCarrito = document.getElementById("car");
const carri = document.querySelector(".carrito-desactive");

btnCarrito.addEventListener('click', function () {    
        if (carri.classList.contains("carrito-desactive")) {
            carri.classList.remove("carrito-desactive");
            carri.classList.add("carrito-active");
        } else {
            carri.classList.remove("carrito-active");
            carri.classList.add("carrito-desactive");
        }
    }
)