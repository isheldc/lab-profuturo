let nivelActual = "";

// Oculta todas las secciones con la clase .card
function ocultarTodasLasVistas() {
    document.querySelectorAll('.card').forEach(sec => sec.classList.add('hidden'));
}

// 1. Selecciona el nivel educativo y pasa al menú desplegable de materias
function seleccionarNivel(nivel) {
    nivelActual = nivel;
    ocultarTodasLasVistas();
    document.getElementById("titulo-nivel").innerText = `Experimentos para ${nivel}`;
    document.getElementById("menu-materias").classList.remove("hidden");
}

// 2. Vuelve desde el menú de materias al selector de niveles
function volverMenuNiveles() {
    ocultarTodasLasVistas();
    document.getElementById("menu-niveles").classList.remove("hidden");
}

// 3. Valida y muestra la lista de experimentos según la materia seleccionada
function irAMateria() {
    const materia = document.getElementById('lista-materias').value;
    if (!materia) {
        alert('Por favor selecciona una materia de la lista.');
        return;
    }

    ocultarTodasLasVistas();
    if (materia === 'Fisica') {
        document.getElementById('vista-materia-fisica').classList.remove("hidden");
    } else if (materia === 'Quimica') {
        document.getElementById('vista-materia-quimica').classList.remove("hidden");
    } else if (materia === 'Biologia') {
        document.getElementById('vista-materia-biologia').classList.remove("hidden");
    }
}

// 4. Vuelve del menú de una materia específica al selector de materias
function volverAMaterias() {
    ocultarTodasLasVistas();
    document.getElementById("menu-materias").classList.remove("hidden");
}

// 5. Carga un laboratorio/experimento individual específico
function cargarExperimento(idExp) {
    ocultarTodasLasVistas();
    const experimentoTarget = document.getElementById('exp-' + idExp);
    if (experimentoTarget) {
        experimentoTarget.classList.remove("hidden");
    }
}

// 6. Regresa desde un laboratorio individual a su lista de materia correspondiente
function volverAMateriaActual(materia) {
    document.getElementById('lista-materias').value = materia;
    irAMateria();
}

// 7. Control de pasos internos dentro de un experimento (si usas pasos)
function siguientePaso(pasoDestino, contenedorId) {
    // Si tus experimentos tienen múltiples pasos internos
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
        contenedor.querySelectorAll(".step").forEach(el => el.classList.add("hidden"));
        const pasoTarget = contenedor.querySelector(`#paso-${pasoDestino}`);
        if (pasoTarget) pasoTarget.classList.remove("hidden");
    }
}

// 8. Simulación específica (ejemplo para la Ley de Ohm)
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

// 9. Finalizar el experimento
function finalizarExperimento() {
    alert("¡Excelente trabajo! Has completado el ciclo del método científico y los datos se han registrado correctamente.");
    location.reload();
}