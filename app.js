let nivelActual = "";

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    
    // Actualizamos el título
    const titulo = document.getElementById("titulo-nivel");
    if (titulo) titulo.innerText = `Experimentos para ${nivel}`;
    
    // Ocultamos niveles y mostramos el menú de experimentos/materias
    const menuNiveles = document.getElementById("menu-niveles");
    const menuExperimentos = document.getElementById("menu-experimentos");
    
    if (menuNiveles) menuNiveles.classList.add("hidden");
    if (menuExperimentos) menuExperimentos.classList.remove("hidden");
}

function volverMenu() {
    const menuExperimentos = document.getElementById("menu-experimentos");
    const menuNiveles = document.getElementById("menu-niveles");
    
    if (menuExperimentos) menuExperimentos.classList.add("hidden");
    if (menuNiveles) menuNiveles.classList.remove("hidden");
}

// Función para el botón "IR" del desplegable de materias
function IrMateria() {
    const selectMateria = document.getElementById("lista-experimentos");
    if (!selectMateria) return;
    
    const materia = selectMateria.value;
    if (!materia) {
        alert("Por favor selecciona una materia.");
        return;
    }

    // Ocultamos el menú de experimentos
    document.getElementById("menu-experimentos").classList.add("hidden");
    
    // Mostramos la vista del experimento o método científico
    const vistaExperimento = document.getElementById("vista-experimento");
    if (vistaExperimento) {
        vistaExperimento.classList.remove("hidden");
        // Actualizamos el nombre con la materia seleccionada
        const nombreExp = document.getElementById("nombre-experimento");
        if (nombreExp) nombreExp.innerText = `Laboratorio de ${materia} (${nivelActual})`;
    }
}

function cargarExperimento(nombre) {
    const menuExp = document.getElementById("menu-experimentos");
    const vistaExp = document.getElementById("vista-experimento");
    const nombreExp = document.getElementById("nombre-experimento");
    
    if (nombreExp) nombreExp.innerText = nombre;
    if (menuExp) menuExp.classList.add("hidden");
    if (vistaExp) vistaExp.classList.remove("hidden");
}

function volverExperimentos() {
    const vistaExp = document.getElementById("vista-experimento");
    const menuExp = document.getElementById("menu-experimentos");
    
    if (vistaExp) vistaExp.classList.add("hidden");
    if (menuExp) menuExp.classList.remove("hidden");
}

function siguientePaso(pasoDestino) {
    document.querySelectorAll(".step").forEach(el => el.classList.add("hidden"));
    const pasoTarget = document.getElementById(`paso-${pasoDestino}`);
    if (pasoTarget) pasoTarget.classList.remove("hidden");
}

function actualizarSimulacion() {
    const slider = document.getElementById("slider-res");
    if (!slider) return;
    
    let resistencia = slider.value;
    let voltaje = 12; // Voltaje fijo de ejemplo
    let corriente = (voltaje / resistencia).toFixed(2);
    
    const valRes = document.getElementById("val-resistencia");
    const valCorr = document.getElementById("val-corriente");
    
    if (valRes) valRes.innerText = resistencia;
    if (valCorr) valCorr.innerText = corriente + "A";
}

function finalizarExperimento() {
    alert("¡Excelente trabajo! Has completado el ciclo del método científico y los datos se han registrado correctamente.");
    location.reload();
}