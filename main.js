var ruta = "merch.json"
let carrito = JSON.parse(localStorage.getItem("Merch")) || []
const carritoTraer = document.getElementById("carrito")
const cantidadCarrito = document.getElementById("cuenta-carrito")
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
    const respuesta = await fetch(mijson);
    if (respuesta.ok) {
        const info = await respuesta.json();
        return info
    } else {
        return [];
    }
}
async function verImagenes(mijson) {
    const respuesta = await peticion(mijson)
    let all = document.querySelector(".toito")

    respuesta[1].forEach(product => {
        const newDiv = document.createElement("div")
        newDiv.classList.add("item")
        const img = document.createElement("img");
        img.src = product.imagen
        img.height = 400

        img.addEventListener(`mouseover`, function () {
            img.src = product.imagenHover
        })
        img.addEventListener(`mouseout`, function () {
            img.src = product.imagen
        })
        newDiv.appendChild(img);

        const boton = document.createElement("button")
        boton.textContent = "Comprar"
        boton.classList.add("botonet")

        boton.addEventListener(`click`, function () {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
            if (repeat) {
                carrito.map((productico) => {
                    if (productico.id === product.id)
                        productico.Cantidad++;
                })
            } else {
                carrito.push({
                    id: product.id,
                    imagen: product.imagen,
                    Descripcion: product.Descripcion,
                    precio: product.Precio,
                    Cantidad: product.Cantidad
                });
                carritoContador();
                guardarLocalStorage();
            }
        })
        const description = document.createElement("p");
        description.innerHTML = `${product.Descripcion}<br>$ ${product.Precio}.00`;
        newDiv.appendChild(description)

        newDiv.appendChild(boton);
        all.appendChild(newDiv);
    });

}

verImagenes(ruta)

function hacerCarrito() {
    carritoTraer.innerHTML = ""
    carrito.forEach((product, index) => {
        const content = document.createElement("div")
        content.classList.add("pruebaaa")
        content.innerHTML = `
        <img src="${product.imagen}" style="height: 20vh;">
        ${product.Descripcion}
        <br>
        $${product.Cantidad * product.precio}.00
        <button class="btnMas">+</button>
        <h2 class="canti">${product.Cantidad}</h2>
        <button class="btnMenos">−</button>`;
        carritoTraer.appendChild(content);
        let eliminar = document.createElement("h4")
        eliminar.classList.add("delete")
        eliminar.innerHTML = `Eliminar`
        carritoTraer.appendChild(eliminar)
        eliminar.addEventListener("click", function () {
            carrito.splice(index, 1);
            carritoContador();
            guardarLocalStorage();
            hacerCarrito();
        }
        );
        const btnMas = content.querySelector(".btnMas");
        const btnMenos = content.querySelector(".btnMenos");
        const textoFinal = content.querySelector(".canti");
        btnMas.addEventListener("click", function () {
            product.Cantidad++;
            textoFinal.innerText = product.Cantidad;
            hacerCarrito();
        });
        btnMenos.addEventListener("click", function () {
            if (product.Cantidad > 1) {
                product.Cantidad--;
            } else {
                carrito.splice(index, 1);
            }
            hacerCarrito();
        });
    });
    const total = carrito.reduce((acumulador, productCarrito) => acumulador + (productCarrito.Cantidad * productCarrito.precio), 0);
    const totalito = document.createElement("div")
    totalito.classList.add("Total")
    totalito.innerHTML = `TOTAL: $${total}.00`;
    carritoTraer.appendChild(totalito);

};

btnCarrito.addEventListener("click", hacerCarrito);

//---------------------------------------------------------------------------------------------
// CANTIDAD CARRITO

function carritoContador() {
    cantidadCarrito.style.display = "block";
    const Contador = carrito.length
    localStorage.setItem("Contador", JSON.stringify(Contador))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("Contador"));
}
carritoContador()
//---------------------------------------------------------------------------------------------
// LOCAL STORAGE

function guardarLocalStorage() {
    localStorage.setItem("Merch", JSON.stringify(carrito));
}
 
//---------------------------------------------------------------------------------------------
// FILTRAR POR CATEGORIA

const encontrarCamisa = carrito.find((element) =>element.Categoria)

carrito = carrito.filter((prube) =>{
    console.log(prube)
    return prube !== encontrarCamisa
})

