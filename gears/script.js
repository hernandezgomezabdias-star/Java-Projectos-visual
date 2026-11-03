/* ==================================================
   MODELO
   ==================================================

   El Modelo contiene los datos de nuestra aplicación.

   En este caso guardamos la información de los
   personajes de Gears of War.
================================================== */

const modelo = {

    informacionGeneral:
        "Gears of War es una saga de videojuegos ambientada en el planeta Sera.",

    personajes: {

        marcus: {

            nombre: "Marcus Fenix",

            descripcion:
                "Marcus Fenix es uno de los protagonistas principales de Gears of War."

        },

        dom: {

            nombre: "Dom Santiago",

            descripcion:
                "Dominic Santiago es el mejor amigo de Marcus y miembro de la CGO."

        },

        kait: {

            nombre: "Kait Diaz",

            descripcion:
                "Kait Diaz es una de las protagonistas principales de Gears 5."

        },

        jd: {

            nombre: "JD Fenix",

            descripcion:
                "JD Fenix es el hijo de Marcus Fenix y miembro de la nueva generación de Gears."

        }

    }

};


/* ==================================================
   VISTA
   ==================================================

   Aquí obtenemos los elementos HTML que serán
   mostrados o modificados en pantalla.
================================================== */

const vista = {

    botonInfo:
        document.getElementById("botonInfo"),

    informacion:
        document.getElementById("informacion"),

    tarjetaMarcus:
        document.getElementById("tarjetaMarcus"),

    textoMarcus:
        document.getElementById("textoMarcus"),

    personajes:
        document.getElementById("personajes"),

    descripcionPersonaje:
        document.getElementById("descripcionPersonaje"),

    pasoUsuario:
        document.getElementById("pasoUsuario"),

    pasoControlador:
        document.getElementById("pasoControlador"),

    pasoModelo:
        document.getElementById("pasoModelo"),

    pasoVista:
        document.getElementById("pasoVista")

};


/* ==================================================
   CONTROLADOR
   ==================================================

   El Controlador recibe las acciones del usuario.

   Después consulta el Modelo y actualiza la Vista.
================================================== */

const controlador = {


    iniciar: function () {


        /* ------------------------------------------
           BOTÓN "CONOCER MÁS"
        ------------------------------------------ */

        vista.botonInfo.addEventListener("click", function () {

            vista.informacion.textContent =
                modelo.informacionGeneral;

        });


        /* ------------------------------------------
           MOUSE SOBRE MARCUS
        ------------------------------------------ */

        vista.tarjetaMarcus.addEventListener("mouseover", function () {

            vista.tarjetaMarcus.style.backgroundColor =
                "#8b0000";

            vista.tarjetaMarcus.style.transform =
                "scale(1.05)";

        });


        /* ------------------------------------------
           MOUSE FUERA DE MARCUS
        ------------------------------------------ */

        vista.tarjetaMarcus.addEventListener("mouseout", function () {

            vista.tarjetaMarcus.style.backgroundColor =
                "#222";

            vista.tarjetaMarcus.style.transform =
                "scale(1)";

        });


        /* ------------------------------------------
           DOBLE CLICK EN MARCUS
        ------------------------------------------ */

        vista.tarjetaMarcus.addEventListener("dblclick", function () {

            vista.textoMarcus.textContent =
                modelo.personajes.marcus.descripcion;

        });


        /* ------------------------------------------
           SELECCIÓN DE PERSONAJE
        ------------------------------------------ */

        vista.personajes.addEventListener("change", function () {


            const personajeSeleccionado =
                vista.personajes.value;


            /* --------------------------------------
               PASO 1
               El usuario realiza una acción.
            -------------------------------------- */

            if (personajeSeleccionado === "") {

                vista.descripcionPersonaje.textContent =
                    "";

                vista.pasoUsuario.textContent =
                    "👤 Usuario: selecciona un personaje.";

                vista.pasoControlador.textContent =
                    "⚙️ Controlador: esperando una selección.";

                vista.pasoModelo.textContent =
                    "📦 Modelo: esperando una consulta.";

                vista.pasoVista.textContent =
                    "🖥️ Vista: esperando información.";

                return;
            }


            vista.pasoUsuario.textContent =
                "👤 Usuario: seleccionó " +
                personajeSeleccionado;


            /* --------------------------------------
               PASO 2
               El Controlador recibe la acción.
            -------------------------------------- */

            vista.pasoControlador.textContent =
                "⚙️ Controlador: recibió la selección y consultará el Modelo.";


            /* --------------------------------------
               PASO 3
               El Controlador consulta el Modelo.
            -------------------------------------- */

            const personaje =
                modelo.personajes[personajeSeleccionado];


            vista.pasoModelo.textContent =
                "📦 Modelo: encontró la información de " +
                personaje.nombre;


            /* --------------------------------------
               PASO 4
               El Controlador actualiza la Vista.
            -------------------------------------- */

            vista.descripcionPersonaje.textContent =
                personaje.nombre +
                ": " +
                personaje.descripcion;


            vista.pasoVista.textContent =
                "🖥️ Vista: muestra la información de " +
                personaje.nombre;

        });

    }

};


/* ==================================================
   INICIAR APLICACIÓN
================================================== */

controlador.iniciar();