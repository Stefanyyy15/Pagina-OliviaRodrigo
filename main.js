
var ruta = "merch.json"
let carrito = []
const carritoTraer = document.getElementById("carrito")
//-----------------------------------------------------------------------------------------------------
//BOTON CARRITO

const btnCarrito = document.getElementById("car");
const carri = document.querySelector(".tododo-desactive");

btnCarrito.addEventListener('click', function () {    
        if (carri.classList.contains("tododo-desactive")) {
            carri.classList.remove("tododo-desactive");
            carri.classList.add("tododo-active");
        } else {
            carri.classList.remove("tododo-active");
            carri.classList.add("tododo-desactive");
        }
    }
)

//-----------------------------------------------------------------------------------------------------
//PETICION DEL JSON
async function peticion(mijson) {
    const respuesta = await fetch (mijson);
    if (respuesta.ok){
        const info = await respuesta.json();
        return info
    }else {
        return [];
    }
}
async function verImagenes(mijson) {
    const respuesta = await peticion(mijson)
    let all = document.querySelector(".toito")
    
    respuesta[1].forEach(rest => {
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
            carrito.push({
                id : rest.id,
                imagen : rest.imagen,
                Descripcion : rest.Descripcion, 
                precio : rest.Precio
            });
            console.log(carrito);
        })

        const description = document.createElement("p");
        description.innerHTML = `${rest.Descripcion}<br>$ ${rest.Precio}.00`;
        newDiv.appendChild(description)

        newDiv.appendChild(boton);
        all.appendChild(newDiv);
    });
    
}

verImagenes(ruta)

btnCarrito.addEventListener("click", function () {
    carritoTraer.innerHTML = ""
    carrito.forEach((product) => {
        const content =  document.createElement("div")
        content.classList.add("pruebaaa")
        content.innerHTML = `
        <img src="${product.imagen}" style="height: 20vh;">
        ${product.Descripcion}
        <br>
        $${product.precio}.00`;
        carritoTraer.appendChild(content);
    });
    const total = carrito.reduce((acumulador, productCarrito) => acumulador + productCarrito.precio, 0);
    console.log(total)
    const totalito = document.createElement("div")
    totalito.classList.add("Total")
    totalito.innerHTML = `TOTAL: $${total}.00`;
    carritoTraer.appendChild(totalito);
});