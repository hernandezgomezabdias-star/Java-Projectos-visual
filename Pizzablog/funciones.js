/* ========================================
   1. CARRUSEL DE PIZZAS
======================================== */

const pizzas = [
    {
        titulo: "Pizza Margherita",
        descripcion: "Una receta clásica con tomate, mozzarella y albahaca.",
        imagen: "img/pizza-margherita.jpg",
        textoAlternativo: "Pizza Margherita con tomate, mozzarella y albahaca",
        enlace: "recetas.html#margherita"
    },
    {
        titulo: "Pizza Pepperoni",
        descripcion: "Una pizza deliciosa con pepperoni y queso fundido.",
        imagen: "img/pizza-pepperoni.jpg",
        textoAlternativo: "Pizza Pepperoni cubierta de queso",
        enlace: "recetas.html#pepperoni"
    },
    {
        titulo: "Pizza cuatro quesos",
        descripcion: "Una combinación cremosa de cuatro quesos.",
        imagen: "img/pizza-quesos.jpg",
        textoAlternativo: "Pizza cubierta con cuatro quesos",
        enlace: "faciles.html#cuatro-quesos"
    },
    {
        titulo: "Pizza Hawaiana",
        descripcion: "Una pizza con jamón y piña, una combinación dulce y salada.",
        imagen: "img/pizza-hawaiana.jpg",
        textoAlternativo: "Pizza Hawaiana con jamón y piña",
        enlace: "recetas.html#hawaiana"
    },
    {
        titulo: "Pizza Vegetariana",
        descripcion: "Una opción saludable con verduras frescas.",
        imagen: "img/pizza-vegetariana.jpg",
        textoAlternativo: "Pizza Vegetariana con diversas verduras",
        enlace: "recetas.html#vegetariana"
    }

];

let indiceActual = 0;


/* ========================================
   2. MOSTRAR UNA PIZZA
======================================== */

function mostrarPizza(indice) {
    const diapositiva = document.querySelector(".diapositiva");

    if (!diapositiva) {
        return;
    }

    const titulo = diapositiva.querySelector(".informacion-pizza h2");
    const descripcion = diapositiva.querySelector(".informacion-pizza p");
    const enlace = diapositiva.querySelector(".informacion-pizza a");
    const imagen = diapositiva.querySelector(".imagen-pizza img");

    if (!titulo || !descripcion || !enlace || !imagen) {
        return;
    }

    indiceActual = (indice + pizzas.length) % pizzas.length;

    titulo.textContent = pizzas[indiceActual].titulo;
    descripcion.textContent = pizzas[indiceActual].descripcion;
    enlace.href = pizzas[indiceActual].enlace;
    enlace.textContent = "Ver receta";
    imagen.src = pizzas[indiceActual].imagen;
    imagen.alt = pizzas[indiceActual].textoAlternativo;

    const indicadores = document.querySelectorAll(".indicador");

    indicadores.forEach(function(indicador, posicion) {
        indicador.classList.toggle("activo", posicion === indiceActual);
    });
}


/* ========================================
   3. CONFIGURAR LOS BOTONES DEL CARRUSEL
======================================== */

function configurarCarrusel() {
    const botonAnterior = document.querySelector(".anterior");
    const botonSiguiente = document.querySelector(".siguiente");
    const indicadores = document.querySelectorAll(".indicador");

    if (!document.querySelector(".diapositiva")) {
        return;
    }

    if (botonAnterior) {
        botonAnterior.addEventListener("click", function() {
            mostrarPizza(indiceActual - 1);
        });
    }

    if (botonSiguiente) {
        botonSiguiente.addEventListener("click", function() {
            mostrarPizza(indiceActual + 1);
        });
    }

    indicadores.forEach(function(indicador, posicion) {
        indicador.addEventListener("click", function() {
            mostrarPizza(posicion);
        });
    });

    mostrarPizza(0);
}


/* ========================================
   4. VALIDAR EL FORMULARIO DE BÚSQUEDA
======================================== */

function configurarBusqueda() {
    const formulario = document.querySelector(".encabezado form");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const campoBusqueda = formulario.querySelector('input[type="search"]');

        if (!campoBusqueda) {
            return;
        }

        const busqueda = campoBusqueda.value.trim().toLowerCase();

        if (busqueda === "") {
            alert("Escribe el nombre de una pizza o receta para buscar.");
            campoBusqueda.focus();
            return;
        }

        const recetas = [
            {
                nombre: "margherita",
                pagina: "recetas.html#margherita"
            },
            {
                nombre: "pepperoni",
                pagina: "recetas.html#pepperoni"
            },
            {
                nombre: "hawaiana",
                pagina: "recetas.html#hawaiana"
            },
            {
                nombre: "cuatro quesos",
                pagina: "faciles.html#cuatro-quesos"
            },
            {
                nombre: "vegetariana",
                pagina: "faciles.html#vegetariana"
            }
        ];

        const resultado = recetas.find(function(receta) {
            return receta.nombre.includes(busqueda) ||
                   busqueda.includes(receta.nombre);
        });

        if (resultado) {
            window.location.href = resultado.pagina;
        } else {
            alert("No encontramos esa receta. Prueba con Margherita, Pepperoni, Hawaiana, cuatro quesos o vegetariana.");
        }
    });
}


/* ========================================
   5. INICIAR LAS FUNCIONES
======================================== */

document.addEventListener("DOMContentLoaded", function() {
    configurarCarrusel();
    configurarBusqueda();
});