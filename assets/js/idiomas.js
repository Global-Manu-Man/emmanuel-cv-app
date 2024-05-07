var traducciones = {};

function cambiarIdioma() {
    var idioma = document.getElementById("idioma").value;
    //assets/js/es.js
    var archivoIdiomass = "assets/js/" + idioma + ".js";
    console.log(archivoIdiomass)
    var script = document.createElement("script");
    console.log("Que contiene el script:", script);
    script.src = archivoIdiomass;
    
        // Espera a que el archivo de idioma se cargue completamente antes de llamar a actualizarTraducciones()
        script.onload = function() {
            actualizarTraducciones();
            console.log("Se ejecuta la funcion de actualizarTraducciones:");
        };
        
        document.head.appendChild(script);
}


// Función para actualizar las traducciones en la página
function actualizarTraducciones() {
    console.log("Funcion de actualizarTraducciones(): ",traducciones)
    Object.keys(traducciones).forEach(function(id) {
        var elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = traducciones[id];
        }
    });
}

// Llama a la función de actualización de traducciones cuando se carga la página
window.onload = function() {
    actualizarTraducciones();
};

function mostrarComboIdioma() {
    var comboIdioma = document.getElementById("idioma");
    comboIdioma.style.display = "block"; // Muestra el combo de idioma
}
