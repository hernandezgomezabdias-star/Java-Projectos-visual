```javascript
const boton = document.getElementById("boton");

const informacion = document.getElementById("informacion");

boton.addEventListener("click", function() {

    if (informacion.style.display === "none") {

        informacion.style.display = "block";

        boton.textContent = "Ocultar información";

    } else {

        informacion.style.display = "none";

        boton.textContent = "Ver información";

    }

});
```
