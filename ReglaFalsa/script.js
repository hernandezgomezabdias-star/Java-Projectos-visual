```javascript
"use strict";

// =============================================
// REFERENCIAS A LOS ELEMENTOS HTML
// =============================================

const campoFuncion = document.getElementById("funcion");
const campoA = document.getElementById("valorA");
const campoB = document.getElementById("valorB");
const campoTolerancia = document.getElementById("tolerancia");
const campoDecimales = document.getElementById("decimales");

const cuerpoTabla = document.getElementById("cuerpoTabla");
const resultadoRaiz = document.getElementById("resultadoRaiz");
const resultadoError = document.getElementById("resultadoError");
const mensajeEstado = document.getElementById("mensajeEstado");

const btnCalcular = document.getElementById("btnCalcular");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnSalir = document.getElementById("btnSalir");

// =============================================
// ANALIZADOR DE FUNCIONES ALGEBRAICAS
// No utiliza eval().
// Admite números, x, paréntesis y + - * / ^
// =============================================

function evaluarFuncion(expresion, x) {

    const texto = expresion.replace(/\s+/g, "");

    if (texto === "") {
        throw new Error("Escribe una función algebraica.");
    }

    const tokens = texto.match(
        /(?:\d+(?:\.\d*)?|\.\d+)|(?:[a-zA-Z]+)|[+\-*/^()]|./g
    );

    if (!tokens || tokens.join("") !== texto) {
        throw new Error("La función contiene caracteres no válidos.");
    }

    let posicion = 0;

    function sumaResta() {

        let valor = multiplicacionDivision();

        while (
            tokens[posicion] === "+" ||
            tokens[posicion] === "-"
        ) {

            const operador = tokens[posicion++];
            const siguiente = multiplicacionDivision();

            if (operador === "+") {
                valor += siguiente;
            } else {
                valor -= siguiente;
            }
        }

        return valor;
    }

    function multiplicacionDivision() {

        let valor = unario();

        while (
            tokens[posicion] === "*" ||
            tokens[posicion] === "/"
        ) {

            const operador = tokens[posicion++];
            const siguiente = unario();

            if (operador === "*") {
                valor *= siguiente;
            } else {

                if (siguiente === 0) {
                    throw new Error("División entre cero en la función.");
                }

                valor /= siguiente;
            }
        }

        return valor;
    }

    function unario() {

        if (tokens[posicion] === "+") {
            posicion++;
            return unario();
        }

        if (tokens[posicion] === "-") {
            posicion++;
            return -unario();
        }

        return potencia();
    }

    function potencia() {

        const base = primaria();

        if (tokens[posicion] === "^") {

            posicion++;

            const exponente = unario();

            return Math.pow(base, exponente);
        }

        return base;
    }

    function primaria() {

        const token = tokens[posicion++];

        if (token === undefined) {
            throw new Error("La función está incompleta.");
        }

        if (token === "(") {

            const valor = sumaResta();

            if (tokens[posicion] !== ")") {
                throw new Error("Falta cerrar un paréntesis.");
            }

            posicion++;

            return valor;
        }

        if (token.toLowerCase() === "x") {
            return x;
        }

        if (/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) {
            return Number(token);
        }

        throw new Error(
            "Elemento no reconocido: " + token
        );
    }

    const resultado = sumaResta();

    if (posicion !== tokens.length) {
        throw new Error("Revisa la sintaxis de la función.");
    }

    if (!Number.isFinite(resultado)) {
        throw new Error(
            "La función no produce un resultado numérico finito."
        );
    }

    return resultado;
}

// =============================================
// FORMATO DE NÚMEROS
// =============================================

function formato(numero, decimales) {

    return numero.toFixed(decimales);
}

// =============================================
// MENSAJES DE ERROR
// =============================================

function mostrarError(mensaje) {

    alert(mensaje);

    mensajeEstado.textContent =
        "No se pudo completar el cálculo.";
}

// =============================================
// LIMPIAR TABLA
// =============================================

function reiniciarResultados() {

    cuerpoTabla.innerHTML = `
        <tr class="fila-vacia">
            <td colspan="4">
                Introduce los datos para comenzar.
            </td>
        </tr>
    `;

    resultadoRaiz.textContent = "----";
    resultadoError.textContent = "----";
}

// =============================================
// AGREGAR UNA FILA A LA TABLA
// =============================================

function agregarFila(
    iteracion,
    xr,
    fxr,
    error,
    decimales
) {

    const fila = document.createElement("tr");

    const valores = [
        iteracion,
        formato(xr, decimales),
        formato(fxr, decimales),
        error === null
            ? "---"
            : formato(error, decimales) + " %"
    ];

    valores.forEach(valor => {

        const celda = document.createElement("td");

        celda.textContent = valor;

        fila.appendChild(celda);
    });

    cuerpoTabla.appendChild(fila);
}

// =============================================
// MÉTODO DE LA REGLA FALSA
// =============================================

function calcular() {

    reiniciarResultados();

    try {

        // -------------------------------------
        // 1. LEER LOS DATOS
        // -------------------------------------

        const expresion = campoFuncion.value.trim();

        if (expresion === "") {
            throw new Error(
                "Introduce la función algebraica."
            );
        }

        if (
            campoA.value.trim() === "" ||
            campoB.value.trim() === "" ||
            campoTolerancia.value.trim() === "" ||
            campoDecimales.value === ""
        ) {
            throw new Error(
                "Completa todos los campos antes de calcular."
            );
        }

        let a = Number(campoA.value);
        let b = Number(campoB.value);

        const tolerancia = Number(campoTolerancia.value);
        const decimales = Number(campoDecimales.value);

        // -------------------------------------
        // 2. VALIDAR LOS DATOS
        // -------------------------------------

        if (
            !Number.isFinite(a) ||
            !Number.isFinite(b)
        ) {
            throw new Error(
                "Los límites deben ser números válidos."
            );
        }

        if (a >= b) {
            throw new Error(
                "El límite inferior debe ser menor que el superior."
            );
        }

        if (
            !Number.isFinite(tolerancia) ||
            tolerancia <= 0
        ) {
            throw new Error(
                "El error permitido debe ser mayor que cero."
            );
        }

        if (
            !Number.isInteger(decimales) ||
            decimales < 0 ||
            decimales > 10
        ) {
            throw new Error(
                "Selecciona un número válido de decimales."
            );
        }

        // -------------------------------------
        // 3. EVALUAR LA FUNCIÓN EN LOS EXTREMOS
        // -------------------------------------

        let fa = evaluarFuncion(expresion, a);
        let fb = evaluarFuncion(expresion, b);

        // Comprobar si alguno de los extremos es raíz
        if (fa === 0 || fb === 0) {

            const raiz = fa === 0 ? a : b;

            agregarFila(
                0,
                raiz,
                0,
                0,
                decimales
            );

            resultadoRaiz.textContent =
                formato(raiz, decimales);

            resultadoError.textContent = "0";

            mensajeEstado.textContent =
                "Se encontró una raíz exacta en un extremo.";

            return;
        }

        // Comprobar cambio de signo
        if (Math.sign(fa) === Math.sign(fb)) {

            throw new Error(
                "El intervalo no es válido para este método.\n\n" +
                "f(a) y f(b) deben tener signos opuestos.\n" +
                "Prueba con otros límites."
            );
        }

        // -------------------------------------
        // 4. INICIALIZAR LAS VARIABLES
        // -------------------------------------

        cuerpoTabla.innerHTML = "";

        let xr = 0;
        let xrAnterior = null;
        let error = null;

        let iteracion = 0;

        const maxIteraciones = 1000;

        // -------------------------------------
        // 5. REALIZAR LAS ITERACIONES
        // -------------------------------------

        while (iteracion < maxIteraciones) {

            const denominador = fb - fa;

            if (
                denominador === 0 ||
                !Number.isFinite(denominador)
            ) {
                throw new Error(
                    "El denominador de la fórmula es cero o no es válido."
                );
            }

            // Fórmula de la regla falsa:
            // xr = (a*f(b) - b*f(a)) / (f(b) - f(a))

            xr = (a * fb - b * fa) / denominador;

            if (!Number.isFinite(xr)) {
                throw new Error(
                    "La aproximación calculada no es válida."
                );
            }

            const fxr = evaluarFuncion(expresion, xr);

            iteracion++;

            // ---------------------------------
            // 6. CALCULAR EL ERROR RELATIVO
            // ---------------------------------

            if (xrAnterior === null) {

                error = null;

            } else if (xr !== 0) {

                error = Math.abs(
                    (xr - xrAnterior) / xr
                ) * 100;

            } else if (xrAnterior === 0) {

                error = 0;

            } else {

                error = Infinity;
            }

            // Mostrar la iteración
            agregarFila(
                iteracion,
                xr,
                fxr,
                error,
                decimales
            );

            // ---------------------------------
            // 7. COMPROBAR SI ENCONTRAMOS LA RAÍZ
            // ---------------------------------

            if (fxr === 0) {

                error = 0;
                break;
            }

            // ---------------------------------
            // 8. COMPROBAR LA TOLERANCIA
            // ---------------------------------

            if (
                error !== null &&
                error <= tolerancia
            ) {
                break;
            }

            // ---------------------------------
            // 9. ACTUALIZAR EL INTERVALO
            // ---------------------------------

            if (Math.sign(fa) !== Math.sign(fxr)) {

                b = xr;
                fb = fxr;

            } else {

                a = xr;
                fa = fxr;
            }

            xrAnterior = xr;
        }

        // -------------------------------------
        // 10. MOSTRAR EL RESULTADO FINAL
        // -------------------------------------

        resultadoRaiz.textContent =
            formato(xr, decimales);

        if (error === null || !Number.isFinite(error)) {

            resultadoError.textContent = "N/A";

        } else {

            resultadoError.textContent =
                formato(error, decimales);
        }

        // Comprobar si se alcanzó el límite
        if (
            iteracion >= maxIteraciones &&
            (error === null || error > tolerancia)
        ) {

            mensajeEstado.textContent =
                "Se alcanzó el límite de iteraciones.";

            alert(
                "Se alcanzó el límite de 1000 iteraciones.\n" +
                "Se muestra la última aproximación calculada."
            );

        } else {

            mensajeEstado.textContent =
                "Cálculo completado en " +
                iteracion + " iteraciones.";
        }

    } catch (error) {

        reiniciarResultados();

        mostrarError(error.message);
    }
}

// =============================================
// BOTÓN LIMPIAR
// =============================================

function limpiar() {

    campoFuncion.value = "";
    campoA.value = "";
    campoB.value = "";
    campoTolerancia.value = "";
    campoDecimales.value = "";

    reiniciarResultados();

    mensajeEstado.textContent =
        "Introduce los datos para comenzar.";

    campoFuncion.focus();
}

// =============================================
// BOTÓN SALIR
// =============================================

function salir() {

    const confirmar = confirm(
        "¿Deseas salir del método de la regla falsa?"
    );

    if (confirmar) {

        mensajeEstado.textContent =
            "Puedes cerrar esta pestaña del navegador.";
    }
}

// =============================================
// CONECTAR LOS BOTONES
// =============================================

btnCalcular.addEventListener("click", calcular);

btnLimpiar.addEventListener("click", limpiar);

btnSalir.addEventListener("click", salir);
```