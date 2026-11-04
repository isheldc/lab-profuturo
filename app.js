let nivelActual = "";

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    document.getElementById("titulo-nivel").innerText = `Experimentos para ${nivel}`;
    document.getElementById("menu-niveles").classList.add("hidden");
    document.getElementById("menu-experimentos").classList.remove("hidden");
}

function volverMenu() {
    document.getElementById("menu-experimentos").classList.add("hidden");
    document.getElementById("menu-niveles").classList.remove("hidden");
}

function cargarExperimento(nombre) {
    document.getElementById("nombre-experimento").innerText = nombre;
    document.getElementById("menu-experimentos").classList.add("hidden");
    document.getElementById("vista-experimento").classList.remove("hidden");
}

function volverExperimentos() {
    document.getElementById("vista-experimento").classList.add("hidden");
    document.getElementById("menu-experimentos").classList.remove("hidden");
}

function siguientePaso(pasoDestino) {
    document.querySelectorAll(".step").forEach(el => el.classList.add("hidden"));
    document.getElementById(`paso-${pasoDestino}`).classList.remove("hidden");
}

function actualizarSimulacion() {
    let resistencia = document.getElementById("slider-res").value;
    let voltaje = 12; // Voltaje fijo de ejemplo
    let corriente = (voltaje / resistencia).toFixed(2);
    document.getElementById("val-resistencia").innerText = resistencia;
    document.getElementById("val-corriente").innerText = corriente + "A";
}

function finalizarExperimento() {
    alert("¡Excelente trabajo! Has completado el ciclo del método científico y los datos se han registrado correctamente.");
    location.reload();
}