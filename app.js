/* ==========================================================================
   NEXORA LAB PRO - GAMER SCIENCE & IA HÍBRIDA ADAPTADA
   ========================================================================== */

let nivelActual = "Secundaria";
let materiaActual = "Fisica";
let expActual = null;
let pasoActual = 1;
let animId = null;
let sensorActivo = false;
let sensorTilt = 0;

let userSession = {
    observacionSeleccionada: "",
    observacionLibre: "",
    problemaSeleccionado: "",
    hipotesisCondicion: "",
    hipotesisEfecto: "",
    ensayos: [],
    analisisSeleccionado: "",
    conclusionSeleccionada: "",
    conclusionTexto: "",
    comunicacionTitular: ""
};
/* GESTIÓN DE TEMA OSCURO / CLARO */
function toggleTheme() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute("data-theme");
    const btnTheme = document.getElementById("btn-theme");

    if (currentTheme === "light") {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("nexora_theme", "dark");
        if (btnTheme) btnTheme.innerText = "🌙";
    } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("nexora_theme", "light");
        if (btnTheme) btnTheme.innerText = "☀️";
    }
}

function cargarTemaGuardado() {
    const savedTheme = localStorage.getItem("nexora_theme") || "dark";
    const btnTheme = document.getElementById("btn-theme");
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (btnTheme) {
        btnTheme.innerText = savedTheme === "light" ? "☀️" : "🌙";
    }
}

/* MODIFICACIÓN EN EL EVENTO CARGA INICIAL DE LA APP */
window.onload = () => {
    cargarTemaGuardado();
    syncRed();
};
/* BASE DE DATOS DE 18 EXPERIMENTOS (3 POR MATERIA / NIVEL) */
const dbExperimentos = {
    Secundaria: {
        Fisica: [
            {
                id: "s-fis-1",
                titulo: "Fuerza y Fricción (2ª Ley de Newton)",
                desc: "Descubre cómo un objeto acelera cuando empujas más fuerte o cuando el suelo resbala más.",
                simTipo: "fuerza",
                preguntasObs: [
                    "El carrito acelera rápido cuando se aplica fuerza, pero frena por la fricción.",
                    "El carrito nunca se mueve sin importar cuánta fuerza apliquemos.",
                    "La fricción aumenta la velocidad del carrito hacia adelante."
                ],
                preguntasProb: [
                    "¿Cómo influye la fuerza del empuje en la aceleración del carrito?",
                    "¿De qué color debe ser el carrito para que no tenga fricción?",
                    "¿Por qué los objetos pesan más en la noche?"
                ],
                hipCondiciones: ["Aumentamos la fuerza de empuje", "Ponemos hielo (cero fricción)", "Aumentamos el peso al doble"],
                hipEfectos: ["el carrito acelera más rápido", "el carrito tardará más en moverse", "la aceleración se mantendrá igual"],
                analisisOpciones: [
                    "A mayor fuerza aplicada, la aceleración aumenta de forma proporcional.",
                    "La fuerza no tiene ninguna relación con la velocidad del objeto.",
                    "El peso no afecta en absoluto la aceleración."
                ],
                conclusionesOpciones: [
                    "Se confirma la hipótesis: La fuerza neta es directamente proporcional a la aceleración (F = m·a).",
                    "Se refuta la hipótesis: Los objetos pesados siempre van más rápido por gravedad.",
                    "No se obtuvieron suficientes datos numéricos para decidir."
                ],
                titularesCom: [
                    "⚡ ¡Comprobado!: Más fuerza equivale a mayor aceleración en carritos de prueba.",
                    "🚗 El misterio del auto que nunca frenó.",
                    "🔬 Científicos demuestran que la fricción frena los cuerpos en movimiento."
                ]
            },
            {
                id: "s-fis-2",
                titulo: "Conservación de Energía en el Péndulo",
                desc: "¿Puede un péndulo ganar energía de la nada? Analiza energía cinética vs potencial.",
                simTipo: "pendulo",
                preguntasObs: [
                    "Al soltar la esfera desde lo alto, gana velocidad al caer y la pierde al subir.",
                    "La esfera sube más alto de la altura desde donde fue soltada.",
                    "El péndulo se queda quieto en el aire sin caer."
                ],
                preguntasProb: [
                    "¿Se conserva la energía mecánica total al oscilar un péndulo sin aire?",
                    "¿Por qué el hilo del péndulo cambia de color con el calor?",
                    "¿Cómo influye el día de la semana en las oscilaciones?"
                ],
                hipCondiciones: ["Soltamos la esfera desde una altura mayor", "Cambiamos el material de la esfera por madera", "Eliminamos toda resistencia del aire"],
                hipEfectos: ["alcanzará mayor velocidad máxima en el punto más bajo", "el péndulo flotará hacia el techo", "se detendrá instantáneamente"],
                analisisOpciones: [
                    "La energía potencial en lo alto se transforma en cinética al caer, sumando siempre un total constante.",
                    "La energía se destruye por completo cada vez que la esfera pasa por el centro.",
                    "El péndulo acumula energía infinita en cada oscilación."
                ],
                conclusionesOpciones: [
                    "Se valida: La energía mecánica se transforma continuamente pero no se crea ni se destruye.",
                    "Se refuta: La energía desaparece totalmente sin transformarse en nada.",
                    "Inconcluso: Se requiere medir con cronómetro manual."
                ],
                titularesCom: [
                    "⚖️ De potencial a cinética: La danza eterna de la energía del péndulo.",
                    "🔮 Bolas oscilantes desafían las leyes del universo.",
                    "🎯 Reporte escolar demuestra la conservación de la energía mecánica."
                ]
            },
            {
                id: "s-fis-3",
                titulo: "Circuitos Eléctricos y Ley de Ohm",
                desc: "¿Qué pasa con la corriente de un foco si aumentas el voltaje o la resistencia?",
                simTipo: "circuito",
                preguntasObs: [
                    "El foco brilla con más intensidad cuando aumentamos el voltaje de la batería.",
                    "Al aumentar la resistencia del cable, el foco se ilumina con mayor brillo.",
                    "Los electrones no fluyen cuando el interruptor está cerrado."
                ],
                preguntasProb: [
                    "¿Cómo afecta el aumento de resistencia al flujo de corriente (Amperes)?",
                    "¿De qué forma la batería genera calor sin tocar nada?",
                    "¿Por qué los focos sólo sirven en la oscuridad?"
                ],
                hipCondiciones: ["Aumentamos el voltaje de la batería", "Colocamos una resistencia muy alta", "Conectamos dos focos en serie"],
                hipEfectos: ["la corriente aumentará y el foco brillará más", "la corriente disminuirá y el brillo bajará", "el circuito dejará de conducir por completo"],
                analisisOpciones: [
                    "La corriente es directamente proporcional al voltaje e inversamente proporcional a la resistencia (I = V/R).",
                    "A mayor resistencia, más corriente pasa por el circuito.",
                    "El voltaje nunca afecta la intensidad lumínica."
                ],
                conclusionesOpciones: [
                    "Hipótesis respaldada: La Ley de Ohm gobierna con exactitud el brillo del circuito virtual.",
                    "Hipótesis refutada: El foco brilló menos al subir el voltaje.",
                    "Faltan pruebas para determinar el valor de los Ohms."
                ],
                titularesCom: [
                    "💡 Hackeando la electricidad: La Ley de Ohm explicada con luz virtual.",
                    "⚡ Baterías al límite en el laboratorio digital.",
                    "🔌 Estudiantes comprueban cómo la resistencia frena la corriente."
                ]
            }
        ],
        Quimica: [
            {
                id: "s-qui-1",
                titulo: "Escala de pH: Ácidos, Neutros y Bases",
                desc: "¿Por qué el limón arde y el jabón resbala? Mide el pH y neutraliza soluciones.",
                simTipo: "ph",
                preguntasObs: [
                    "El líquido cambia a rojo con ácidos y a violeta/azul con sustancias básicas.",
                    "El pH siempre se mantiene en 7 sin importar qué sustancia agreguemos.",
                    "Los ácidos y las bases son exactamente la misma sustancia química."
                ],
                preguntasProb: [
                    "¿Qué ocurre con el pH de un ácido cuando agregamos una base en igual proporción?",
                    "¿Por qué los ácidos tienen sabor dulce en la simulación?",
                    "¿Cómo cambia el color del agua si no le agregamos ningún reactivo?"
                ],
                hipCondiciones: ["Añadimos gotas de base (NaOH) a un ácido fuerte", "Agregamos agua pura al compuesto", "Mezclamos dos ácidos idénticos"],
                hipEfectos: ["el pH subirá hacia 7 (neutralización)", "el pH caerá a valores negativos", "la solución explotará instantáneamente"],
                analisisOpciones: [
                    "La adición de iones OH- neutraliza los iones H+, llevando el pH hacia la zona neutra (7).",
                    "El pH se mantiene estático sin importar la cantidad de gotas.",
                    "Las bases vuelven a las sustancias más ácidas."
                ],
                conclusionesOpciones: [
                    "Se confirma: La neutralización química equilibra el pH entre ácidos y bases.",
                    "Se refuta: Los reactivos no cambiaron de color ni de pH.",
                    "El indicador universal no responde a reactivos."
                ],
                titularesCom: [
                    "🧪 El arcoíris del pH: Logramos la neutralización química perfecta.",
                    "🍋 Del jugo de limón al jabón: ¿Qué tan peligroso es el pH?",
                    "⚗️ Reporte químico: Neutralizando soluciones ácidas en el laboratorio."
                ]
            },
            {
                id: "s-qui-2",
                titulo: "Calor y Estados de la Materia",
                desc: "Aplica calor a cubos de hielo virtuales y observa cómo las moléculas se separan.",
                simTipo: "termico",
                preguntasObs: [
                    "Al calentar, las partículas vibran con mayor velocidad y se separan (sólido a líquido a gas).",
                    "Al aplicar calor las partículas se congelan y quedan inmóviles.",
                    "Las moléculas desaparecen del frasco cuando hierve el agua."
                ],
                preguntasProb: [
                    "¿Cómo influye la temperatura en la energía cinética de las moléculas de agua?",
                    "¿Por qué el fuego hace que los átomos pesen menos?",
                    "¿A qué temperatura el agua se convierte en oro?"
                ],
                hipCondiciones: ["Suministramos calor continuo al recipiente", "Enfriamos el sistema a cero absoluto", "Mantenemos la temperatura constante"],
                hipEfectos: ["las partículas pasarán de estado sólido a líquido y gas", "las partículas formarán un cristal gigante", "las partículas se destruirán"],
                analisisOpciones: [
                    "La temperatura es una medida de la energía cinética promedio de las moléculas.",
                    "El calor elimina el movimiento molecular por completo.",
                    "Los gases tienen partículas más juntas que los sólidos."
                ],
                conclusionesOpciones: [
                    "Se valida: Los cambios de estado físico dependen de la energía térmica suministrada.",
                    "Se rechaza: El hielo no cambió de forma con la temperatura.",
                    "Datos insuficientes sobre el punto de ebullición."
                ],
                titularesCom: [
                    "🔥 De hielo sólido a vapor furioso: Moléculas en movimiento microscópico.",
                    "❄️ El calor como motor de los estados de agregación de la materia.",
                    "🧊 Reporte: ¿Por qué el agua hierve al ganar energía cinética?"
                ]
            },
            {
                id: "s-qui-3",
                titulo: "Solubilidad: Mezclas Saturadas",
                desc: "¿Cuánta sal puedes disolver en agua antes de que se quede en el fondo?",
                simTipo: "soluto",
                preguntasObs: [
                    "Al inicio la sal se disuelve por completo, pero al agregar demasiado queda sedimento en el fondo.",
                    "El agua disuelve cualquier cantidad infinita de sal sin saturarse jamás.",
                    "La sal flota en el aire al caer en el vaso de agua."
                ],
                preguntasProb: [
                    "¿Existe un límite máximo (solubilidad) para disolver sal en 100 mL de agua?",
                    "¿Por qué el agua salada es de color verde brillante?",
                    "¿Cómo afecta el ruido del salón a la disolución de sales?"
                ],
                hipCondiciones: ["Superamos el límite de saturación de soluto", "Calentamos el agua antes de poner la sal", "Removemos la cuchara más rápido"],
                hipEfectos: ["se formará un precipitado sólido en el fondo", "el agua se convertirá en hielo seco", "la sal desaparecerá del universo"],
                analisisOpciones: [
                    "Cada solvente tiene un punto de saturación límite a determinada temperatura.",
                    "La sal se disuelve mágicamente en cualquier proporción.",
                    "Calentar el agua disminuye la solubilidad de los sólidos."
                ],
                conclusionesOpciones: [
                    "Hipótesis confirmada: Al superar el coeficiente de solubilidad se crea una mezcla sobresaturada.",
                    "Hipótesis refutada: El agua admitió toda la sal sin dejar residuos.",
                    "Sin datos para calcular gramos disueltos."
                ],
                titularesCom: [
                    "🧂 ¡Hasta el límite!: Estudiantes hallan el punto de saturación de la sal.",
                    "💧 Solutos y solventes: La ciencia detrás de una mezcla homogénea.",
                    "⚗️ ¿Cuántas cucharadas soporta el agua? Experimento de solubilidad."
                ]
            }
        ],
        Biologia: [
            {
                id: "s-bio-1",
                titulo: "Ósmosis: Células e Hidratación",
                desc: "Mira células vegetales hincharse o arrugarse según la sal del medio exterior.",
                simTipo: "osmosis",
                preguntasObs: [
                    "En agua dulce las células se hinchan de agua; en agua con mucha sal se deshidratan y arrugan.",
                    "Las células explotan siempre sin importar en qué líquido se encuentren.",
                    "Las membranas celulares son muros de cemento donde nada entra ni sale."
                ],
                preguntasProb: [
                    "¿Cómo afecta la concentración de sal externa al volumen de una célula vegetal?",
                    "¿Por qué las células cambian de especie al ponerles agua?",
                    "¿De qué manera la sal alimenta a los cloroplastos?"
                ],
                hipCondiciones: ["Colocamos las células en solución salina hipertónica", "Sumergimos la célula en agua pura destilada", "Mantenemos un medio isotónico equilibrado"],
                hipEfectos: ["el agua saldrá de la célula encogiéndola (plasmólisis)", "la célula mantendrá su tamaño constante", "la célula se dividirá en 10 partes"],
                analisisOpciones: [
                    "El agua viaja a través de la membrana hacia donde hay mayor concentración de soluto.",
                    "La sal entra a la célula y el agua se queda completamente inmóvil.",
                    "El volumen celular es independiente de la solución externa."
                ],
                conclusionesOpciones: [
                    "Se confirma: El fenómeno de ósmosis regula el balance hídrico celular.",
                    "Se refuta: Las células mantuvieron la misma forma en todos los medios.",
                    "No se pudo observar la membrana al microscopio."
                ],
                titularesCom: [
                    "🔬 Ósmosis en vivo: El drama celular de deshidratarse en agua salada.",
                    "🌱 ¿Por qué no regar plantas con agua de mar? La biología responde.",
                    "🧫 Células bajo presión: Turgencia y plasmólisis al descubierto."
                ]
            },
            {
                id: "s-bio-2",
                titulo: "Fotosíntesis y Burbujas de Oxígeno",
                desc: "Coloca plantas acuáticas bajo focos de luz y cuenta las burbujas de oxígeno liberadas.",
                simTipo: "fotosintesis",
                preguntasObs: [
                    "A mayor intensidad de luz sobre la planta, se liberan más burbujas de gas (O2).",
                    "En la oscuridad total la planta produce 10 veces más burbujas.",
                    "Las hojas absorben oxígeno y expulsan dióxido de carbono continuamente."
                ],
                preguntasProb: [
                    "¿Cómo incide la intensidad lumínica en la tasa fotosintética de una planta?",
                    "¿Por qué las plantas son verdes cuando duermen?",
                    "¿Cuánto oxígeno necesita una piedra para respirar?"
                ],
                hipCondiciones: ["Aumentamos la intensidad del foco de luz", "Apagamos por completo la lámpara", "Cambiamos el agua por aceite vegetal"],
                hipEfectos: ["aumentará la tasa de producción de burbujas de oxígeno", "la producción de oxígeno descenderá a cero", "la planta cambiará de color a rojo fuego"],
                analisisOpciones: [
                    "La luz es la fuente de energía para descomponer el agua y fijar el carbono, produciendo O2.",
                    "La producción de oxígeno es totalmente aleatoria y no depende de la luz.",
                    "Las plantas no realizan fotosíntesis en agua."
                ],
                conclusionesOpciones: [
                    "Se valida: La tasa fotosintética tiene relación directa con la energía lumínica disponible.",
                    "Se refuta: La planta no produjo ninguna burbuja bajo luz intensa.",
                    "Incierto por falta de conteo de burbujas."
                ],
                titularesCom: [
                    "🌿 ¡Fábricas de vida!: Midiendo el oxígeno producido por plantas acuáticas.",
                    "☀️ Luz convertida en aire puro: El milagro de la fotosíntesis escolar.",
                    "🫧 Burbujas verdes: Cómo los vegetales alimentan al planeta."
                ]
            },
            {
                id: "s-bio-3",
                titulo: "Frecuencia Cardíaca y Esfuerzo Físico",
                desc: "¿Qué pasa con tu corazón cuando trotas o haces sentadillas? Simula el ritmo cardíaco.",
                simTipo: "cardio",
                preguntasObs: [
                    "Al incrementar la intensidad del ejercicio virtual, los latidos por minuto (LPM) aumentan.",
                    "El corazón se detiene durante el esfuerzo físico para ahorrar sangre.",
                    "La frecuencia cardíaca es igual en reposo que corriendo a máxima velocidad."
                ],
                preguntasProb: [
                    "¿Por qué el corazón bombea más rápido durante el ejercicio físico?",
                    "¿De qué manera la respiración cambia el color de los huesos?",
                    "¿Por qué los músculos no necesitan oxígeno al correr?"
                ],
                hipCondiciones: ["Realizamos ejercicio aeróbico intenso", "Permanecemos en reposo total", "Bebemos agua helada"],
                hipEfectos: ["el corazón bombeará más rápido para oxigenar los músculos", "la frecuencia cardíaca bajará a cero", "los vasos sanguíneos se cerrarán"],
                analisisOpciones: [
                    "El esfuerzo muscular demanda mayor aporte de O2 y nutrientes, elevando el gasto cardíaco.",
                    "El corazón late por azar sin importar la actividad del organismo.",
                    "El reposo requiere más sangre bombeada que el deporte."
                ],
                conclusionesOpciones: [
                    "Hipótesis respaldada: La homeostasis corporal modula el ritmo cardíaco según la demanda metabólica.",
                    "Hipótesis refutada: Los latidos disminuyeron durante la actividad física.",
                    "Datos insuficientes sobre pulso arterial."
                ],
                titularesCom: [
                    "❤️ ¡A mil por hora!: La respuesta cardíaca al ejercicio intenso.",
                    "🏃 Oxígeno para tus músculos: Por qué tu pulso se acelera al entrenar.",
                    "🩺 Simulación cardiovascular: Midiendo el ritmo vital en tiempo real."
                ]
            }
        ]
    },
    Preparatoria: {
        Fisica: [
            {
                id: "p-fis-1",
                titulo: "Tiro Parabólico y Cinemática 2D",
                desc: "Calcula el ángulo de disparo óptimo para maximizar el alcance horizontal.",
                simTipo: "parabolico",
                preguntasObs: [
                    "El proyectil describe una trayectoria en parábola curva por culpa de la gravedad.",
                    "El objeto viaja en línea recta horizontal infinita sin caer al suelo.",
                    "A 90 grados el proyectil logra la máxima distancia horizontal."
                ],
                preguntasProb: [
                    "¿Qué ángulo de lanzamiento garantiza el alcance horizontal máximo sin fricción?",
                    "¿Por qué los proyectiles se vuelven más ligeros en el aire?",
                    "¿Cómo influye el color del cañón en la distancia de impacto?"
                ],
                hipCondiciones: ["Disparamos con un ángulo de 45°", "Disparamos a 85° casi vertical", "Duplicamos la velocidad inicial V0"],
                hipEfectos: ["se obtendrá el alcance horizontal más largo posible", "el proyectil caerá sobre el cañón", "el alcance aumentará 4 veces"],
                analisisOpciones: [
                    "A 45 grados se optimiza el producto de sen(θ)·cos(θ), maximizando la distancia horizontal X.",
                    "El alcance solo depende del peso del proyectil y no del ángulo.",
                    "La gravedad acelera los objetos hacia arriba en tiro parabólico."
                ],
                conclusionesOpciones: [
                    "Se confirma: 45° es el ángulo de alcance máximo bajo aceleración gravitatoria constante.",
                    "Se refuta: Los tiros rasantes a 10° llegaron más lejos que a 45°.",
                    "Sin datos balísticos suficientes."
                ],
                titularesCom: [
                    "🎯 Balística cuántica: El ángulo perfecto de 45° demostrado con física.",
                    "🚀 Trayectorias curvas: Dominando el tiro parabólico en preparatoria.",
                    "📐 Vectores de velocidad y gravedad: El secreto de los lanzamientos."
                ]
            },
            {
                id: "p-fis-2",
                titulo: "Choques y Conservación del Momento",
                desc: "Haz colisionar dos carritos elásticos y calcula la cantidad de movimiento (p = m·v).",
                simTipo: "choque",
                preguntasObs: [
                    "Al chocar dos masas idénticas, se transfieren velocidad y momento lineal.",
                    "Los carritos se fusionan y desaparecen tras el impacto.",
                    "La masa pesada sale despedida más rápido que la liviana."
                ],
                preguntasProb: [
                    "¿Se conserva la cantidad de movimiento total (p) en una colisión elástica cerrada?",
                    "¿Por qué los choques producen luz ultravioleta?",
                    "¿Cómo cambia la masa del carrito al chocar contra la pared?"
                ],
                hipCondiciones: ["Chocamos dos carritos de igual masa en colisión elástica", "Un carro muy pesado choca a uno liviano quieto", "Aumentamos la fricción a niveles máximos"],
                hipEfectos: ["el carro en movimiento se frenará transfiriendo su velocidad al otro", "ambos carritos rebotarán a velocidad infinita", "el momento lineal se duplicará de la nada"],
                analisisOpciones: [
                    "El momento total inicial antes del impacto equivale exactamente al momento final.",
                    "La energía cinética siempre se pierde por completo en choques elásticos.",
                    "Los carritos aumentan su masa tras la colisión."
                ],
                conclusionesOpciones: [
                    "Se valida: En ausencia de fuerzas externas, la cantidad de movimiento se conserva.",
                    "Se refuta: El momento después del choque no coincidió con el inicial.",
                    "Inconcluso por error en cálculo de velocidades."
                ],
                titularesCom: [
                    "💥 ¡Impacto total!: Comprobando la conservación del momento lineal.",
                    "🎱 Física de bolas de billar: Colisiones elásticas bajo la lupa.",
                    "🏎️ Choques en el laboratorio: Cantidad de movimiento explicada."
                ]
            },
            {
                id: "p-fis-3",
                titulo: "Refracción de la Luz (Ley de Snell)",
                desc: "¿Por qué un lápiz parece quebrado en un vaso de agua? Mide los ángulos de la luz.",
                simTipo: "snell",
                preguntasObs: [
                    "El rayo de luz cambia de ángulo cuando pasa del aire al agua o al vidrio.",
                    "La luz se apaga al tocar cualquier sustancia transparente.",
                    "El rayo no sufre ninguna desviación sin importar el material."
                ],
                preguntasProb: [
                    "¿Cuál es la relación matemática entre los índices de refracción y los ángulos de la luz?",
                    "¿Por qué los espejos reflejan solo cosas bonitas?",
                    "¿Cómo influye la temperatura del foco en la velocidad de la luz en el vacío?"
                ],
                hipCondiciones: ["El rayo pasa del aire a un medio de mayor índice (agua/vidrio)", "El rayo incide perpendicularmente a 0 grados", "Usamos un rayo láser rojo en vez de azul"],
                hipEfectos: ["el rayo se desviará acercándose a la normal de la superficie", "el rayo viajará hacia atrás por reflexión total", "el rayo continuará sin doblarse"],
                analisisOpciones: [
                    "La Ley de Snell (n1·sen θ1 = n2·sen θ2) describe fielmente el cambio de velocidad de la luz en medios ópticos.",
                    "La luz viaja más rápido en el diamante que en el aire libre.",
                    "El ángulo refractado siempre es igual al incidente."
                ],
                conclusionesOpciones: [
                    "Se confirma: La velocidad de la luz disminuye en medios más densos provocando la refracción.",
                    "Se refuta: La luz no se desvió en ningún ángulo.",
                    "Sin transportador para medir grados."
                ],
                titularesCom: [
                    "🌈 La ilusión del lápiz quebrado: Descifrando la Ley de Snell.",
                    "💎 Viajando a través del vidrio: Óptica y refracción lumínica.",
                    "🔦 La luz bajo control: Midiendo índices de refracción en laboratorio."
                ]
            }
        ],
        Quimica: [
            {
                id: "p-qui-1",
                titulo: "Ley de los Gases Ideales (P·V = n·R·T)",
                desc: "Comprime un cilindro de gas o enfríalo y observa cómo sube la presión en el manómetro.",
                simTipo: "gas",
                preguntasObs: [
                    "Al comprimir el pistón reduciendo el volumen, la aguja de presión se dispara.",
                    "Al calentar el gas, la presión baja a cero de inmediato.",
                    "El volumen del gas nunca puede cambiar aunque bajemos el émbolo."
                ],
                preguntasProb: [
                    "¿Cómo se comporta la presión de un gas cuando reducimos su volumen a temperatura fija?",
                    "¿Por qué los gases no tienen moléculas en su interior?",
                    "¿De qué color es la masa de un gas ideal en reposo?"
                ],
                hipCondiciones: ["Reducimos el volumen del pistón a la mitad (Ley de Boyle)", "Aumentamos la temperatura al doble (Ley de Gay-Lussac)", "Extraemos la mitad de los moles de gas"],
                hipEfectos: ["la presión medida se duplicará", "la presión caerá a cero atmósferas", "el émbolo flotará sin peso"],
                analisisOpciones: [
                    "La presión y el volumen son inversamente proporcionales cuando la temperatura es constante.",
                    "Los gases ideales no sufren cambios de presión al comprimirse.",
                    "La temperatura no altera la energía de los choques moleculares."
                ],
                conclusionesOpciones: [
                    "Se confirma la ecuación de estado: P·V = n·R·T describe el comportamiento del sistema.",
                    "Se refuta: La presión disminuyó al achicar el volumen.",
                    "Incierto por fuga en el émbolo virtual."
                ],
                titularesCom: [
                    "💨 ¡Pistón bajo fuego!: Comprobando la Ley de los Gases Ideales.",
                    "🎈 De Boyle a Gay-Lussac: El universo molecular de la presión.",
                    "🌡️ Comprimiendo gases: Qué ocurre cuando encierras millones de moléculas."
                ]
            },
            {
                id: "p-qui-2",
                titulo: "Reacciones Exotérmicas y Endotérmicas",
                desc: "¿Liberar o absorber calor? Mide la entalpía (ΔH) de diferentes mezclas reactivas.",
                simTipo: "termoquimica",
                preguntasObs: [
                    "Ciertas mezclas liberan tanto calor que suben el termómetro; otras enfrían el vaso.",
                    "Todas las reacciones químicas se congelan a 0 grados centígrados.",
                    "La temperatura del universo siempre sube sin reacción química."
                ],
                preguntasProb: [
                    "¿Cuál es la diferencia energética entre una reacción con entalpía negativa (exotérmica) y una positiva?",
                    "¿Por qué los fuegos artificiales absorben el calor del aire?",
                    "¿Cómo calcular el peso del fuego con una balanza digital?"
                ],
                hipCondiciones: ["Iniciamos una reacción exotérmica de combustión", "Disolvemos nitrato de amonio en agua (endotérmica)", "Colocamos un catalizador inerte"],
                hipEfectos: ["el termómetro subirá rápidamente liberando energía térmica", "la temperatura descenderá enfriando el entorno", "no habrá ningún intercambio calórico"],
                analisisOpciones: [
                    "Las reacciones exotérmicas tienen productos con menor entalpía que los reactivos (ΔH < 0).",
                    "El calor siempre se destruye durante las mezclas químicas.",
                    "Las reacciones endotérmicas queman todo a su alrededor."
                ],
                conclusionesOpciones: [
                    "Se respalda: La variación de entalpía determina si el sistema cede o absorbe energía del entorno.",
                    "Se rechaza: El termómetro no registró ningún cambio de temperatura.",
                    "Faltan lecturas de Joules para evaluar el calor."
                ],
                titularesCom: [
                    "🔥 Calor en los enlaces: Descubriendo las reacciones exotérmicas.",
                    "🧊 El misterio químico del frío instantáneo: Termoquímica en acción.",
                    "⚗️ Entalpía y energía: La termodinámica de las reacciones cotidianas."
                ]
            },
            {
                id: "p-qui-3",
                titulo: "Cinética Química y Catalizadores",
                desc: "¿Cómo acelerar una reacción lenta? Añade un catalizador o aumenta la temperatura.",
                simTipo: "cinetica",
                preguntasObs: [
                    "Al añadir un catalizador o subir la temperatura, la reacción concluye en segundos.",
                    "Los catalizadores se destruyen y consumen por completo durante la reacción.",
                    "Enfriar los reactivos hace que reaccionen a mayor velocidad."
                ],
                preguntasProb: [
                    "¿De qué manera un catalizador modifica la energía de activación de un proceso químico?",
                    "¿Por qué las sustancias calientes se vuelven transparentes?",
                    "¿Cómo influye la marca del cronómetro en la cinética química?"
                ],
                hipCondiciones: ["Añadimos un catalizador a la mezcla reactiva", "Aumentamos la concentración de los reactivos", "Enfriamos el vaso a temperatura de hielo"],
                hipEfectos: ["la reacción ocurrirá mucho más rápido al bajar la energía de activación", "la reacción se detendrá para siempre", "los reactivos cambiarán de peso atómico"],
                analisisOpciones: [
                    "Los catalizadores ofrecen una ruta alternativa con menor energía de activación sin consumirse.",
                    "La velocidad de reacción no tiene relación con la temperatura.",
                    "Menos colisiones entre moléculas aumentan la velocidad de reacción."
                ],
                conclusionesOpciones: [
                    "Se confirma: La cinética química depende de la frecuencia de choques eficaces y de la barrera energética.",
                    "Se refuta: El catalizador frenó por completo la transformación química.",
                    "Sin datos para estimar la constante de velocidad k."
                ],
                titularesCom: [
                    "⚡ Acelerar sin consumirse: El superpoder de los catalizadores químicos.",
                    "⏱️ Cinética al milisegundo: Cómo dominar la velocidad de las reacciones.",
                    "🔬 Moléculas en choque: La teoría de colisiones comprobada en el lab."
                ]
            }
        ],
        Biologia: [
            {
                id: "p-bio-1",
                titulo: "Genética Mendeliana: Cruces de Punnett",
                desc: "Cruza plantas de flores rojas (RR) y blancas (rr) para descubrir las proporciones de Mendel.",
                simTipo: "genetica",
                preguntasObs: [
                    "En la primera generación todas las flores son rojas, pero el gen blanco reaparece en la F2.",
                    "Los genes de los padres se borran y se generan mutaciones sin herencia.",
                    "El 100% de los descendientes siempre son flores azules sin relación parental."
                ],
                preguntasProb: [
                    "¿Cuáles son las proporciones fenotípicas resultantes al cruzar dos individuos heterocigotos (Rr x Rr)?",
                    "¿Por qué las plantas deciden qué color de flor usar según su estado de ánimo?",
                    "¿Cómo influye la música clásica en los alelos de un guisante?"
                ],
                hipCondiciones: ["Cruzamos dos plantas heterocigotas Rr x Rr", "Cruzamos un homocigoto dominante con uno recesivo (RR x rr)", "Cruzamos dos homocigotos recesivos rr x rr"],
                hipEfectos: ["obtendremos una proporción 3:1 de flores rojas vs blancas", "todos los descendientes serán 100% idénticos al padre", "no nacerá ninguna semilla fértil"],
                analisisOpciones: [
                    "La segregación de alelos explica la aparición de una proporción 3 dominantes por cada 1 recesivo en F2.",
                    "La genética mendeliana no funciona con caracteres hereditarios simples.",
                    "Los alelos recesivos desaparecen para siempre del ADN."
                ],
                conclusionesOpciones: [
                    "Se valida: Las leyes de Mendel describen la probabilidad exacta de herencia biológica.",
                    "Se refuta: Los resultados contradicen el cuadro de Punnett.",
                    "Muestra estadística demasiado pequeña para validar proporciones."
                ],
                titularesCom: [
                    "🧬 El código de la herencia: Descifrando las proporciones de Mendel.",
                    "🌸 De flores rojas y blancas: La magia oculta de los alelos recesivos.",
                    "🎲 Probabilidad y vida: Cómo los cuadros de Punnett predicen rasgos."
                ]
            },
            {
                id: "p-bio-2",
                titulo: "Actividad Enzimática y Desnaturalización",
                desc: "¿Qué le ocurre a una enzima digestiva si subes la temperatura a más de 60 °C?",
                simTipo: "enzimas",
                preguntasObs: [
                    "La enzima trabaja a máxima velocidad a 37 °C, pero muere o deja de funcionar al hervir.",
                    "A 100 °C las enzimas son 50 veces más potentes y resistentes.",
                    "Las enzimas son seres vivos que tienen ojos y nadan en el tubo."
                ],
                preguntasProb: [
                    "¿Cómo afecta la temperatura excesiva a la estructura tridimensional de una enzima proteica?",
                    "¿Por qué la saliva es capaz de quemar el metal de los cubiertos?",
                    "¿Cuánto tiempo vive una proteína en un horno microondas?"
                ],
                hipCondiciones: ["Sometemos la enzima a una temperatura extrema (>60 °C)", "Mantenemos la enzima a su temperatura óptima de 37 °C", "Congelamos la enzima a -20 °C"],
                hipEfectos: ["se desnaturalizará perdiendo su sitio activo y su función biológica", "la enzima duplicará su velocidad metabólica", "la enzima se convertirá en un lípido graso"],
                analisisOpciones: [
                    "El calor excesivo rompe los puentes de hidrógeno, desnaturalizando la estructura terciaria de la proteína.",
                    "Las enzimas son indestructibles sin importar el calor o el pH.",
                    "La velocidad enzimática siempre crece de forma lineal infinita con la temperatura."
                ],
                conclusionesOpciones: [
                    "Se confirma: La desnaturalización térmica destruye la actividad catalítica de las enzimas.",
                    "Se refuta: La enzima hervida continuó degradando el sustrato sin problemas.",
                    "Sin datos sobre la velocidad de reacción enzimática."
                ],
                titularesCom: [
                    "🍳 El efecto del calor en las proteínas: ¿Por qué la fiebre alta es peligrosa?",
                    "🧪 Enzimas al rescate: El sitio activo como llave y cerradura biológica.",
                    "🔬 Desnaturalización celular: Cuando las máquinas del cuerpo dejan de funcionar."
                ]
            },
            {
                id: "p-bio-3",
                titulo: "Dinámica de Ecosistemas: Depredador-Presa",
                desc: "Equilibra conejos y zorros en un bosque virtual sin que ninguno se extinga.",
                simTipo: "poblaciones",
                preguntasObs: [
                    "Si hay muchos conejos, los zorros crecen; al haber muchos zorros, los conejos mueren y luego los zorros mueren de hambre.",
                    "Los conejos y los zorros viven en paz sin comerse entre sí jamás.",
                    "El número de animales en el bosque nunca cambia con el tiempo."
                ],
                preguntasProb: [
                    "¿Cómo regula la relación depredador-presa el tamaño poblacional de ambas especies?",
                    "¿Por qué los zorros se alimentan de luz solar en invierno?",
                    "¿Cómo afecta el canto de los pájaros a la natalidad de los conejos?"
                ],
                hipCondiciones: ["Aumentamos la población inicial de depredadores", "Eliminamos a todos los depredadores del bosque", "Mantenemos un equilibrio ecológico de recursos"],
                hipEfectos: ["la población de presas descenderá bruscamente por sobrecaza", "las presas se reproducirán sin límite consumiendo toda la vegetación", "ambas poblaciones oscilarán en ciclos estables"],
                analisisOpciones: [
                    "El modelo de Lotka-Volterra demuestra ciclos acoplados periódicos de abundancia entre presa y depredador.",
                    "Los depredadores siempre extinguen a sus presas sin excepción.",
                    "Los ecosistemas no tienen capacidad de carga límite."
                ],
                conclusionesOpciones: [
                    "Se respalda: La depredación actúa como un factor denso-dependiente que estabiliza el ecosistema.",
                    "Se rechaza: Las poblaciones no mostraron ninguna relación numérica entre sí.",
                    "Faltan años ecológicos de registro simulado."
                ],
                titularesCom: [
                    "🦊 Zorros y Conejos: La montaña rusa demográfica del modelo Lotka-Volterra.",
                    "🌲 El balance de la naturaleza: Por qué los ecosistemas necesitan depredadores.",
                    "📊 Ecología matemática: Simulando la supervivencia de especies en el lab."
                ]
            }
        ]
    }
};

/* GESTIÓN DE RED Y MODAL */
window.addEventListener('online', syncRed);
window.addEventListener('offline', syncRed);

function syncRed() {
    const pill = document.getElementById("estado-red");
    if (navigator.onLine) {
        pill.innerText = "🟢 Conectado (IA Global lista)";
        pill.className = "pill online";
    } else {
        pill.innerText = "🔴 Sin Conexión (IA Local activa)";
        pill.className = "pill offline";
    }
}

function toggleModalConfig() {
    document.getElementById("modal-config").classList.toggle("hidden");
    document.getElementById("input-api-key").value = localStorage.getItem("nexora_gemini_key") || "";
}

function guardarApiKey() {
    const key = document.getElementById("input-api-key").value.trim();
    if (key) {
        localStorage.setItem("nexora_gemini_key", key);
        alert("¡Clave de IA en la nube guardada con éxito!");
    } else {
        localStorage.removeItem("nexora_gemini_key");
        alert("Clave eliminada. Se utilizará la IA Local autónoma.");
    }
    toggleModalConfig();
}

/* NAVEGACIÓN Y SELECCIÓN */
function seleccionarNivel(nivel) {
    nivelActual = nivel;
    document.getElementById("menu-niveles").classList.add("hidden");
    document.getElementById("titulo-nivel").innerText = `Misiones para ${nivel}`;
    document.getElementById("menu-materias").classList.remove("hidden");
    filtrarMateria("Fisica");
}

function volverMenuNiveles() {
    document.getElementById("menu-materias").classList.add("hidden");
    document.getElementById("menu-niveles").classList.remove("hidden");
}

function filtrarMateria(materia) {
    materiaActual = materia;
    document.querySelectorAll(".subject-btn").forEach(btn => btn.classList.remove("active"));
    const btnActivo = document.getElementById(`btn-mat-${materia}`);
    if (btnActivo) btnActivo.classList.add("active");

    const lista = document.getElementById("lista-temas");
    lista.innerHTML = "";

    const experimentos = dbExperimentos[nivelActual][materia] || [];
    experimentos.forEach(exp => {
        const item = document.createElement("div");
        item.className = "exp-item";
        item.innerHTML = `<h4>${exp.titulo}</h4><p>${exp.desc}</p>`;
        item.onclick = () => iniciarMisionLaboratorio(exp);
        lista.appendChild(item);
    });
}

function volverAMaterias() {
    detenerCanvasAnim();
    document.getElementById("vista-laboratorio").classList.add("hidden");
    document.getElementById("menu-materias").classList.remove("hidden");
}

/* INICIO DE EXPERIMENTO */
function iniciarMisionLaboratorio(exp) {
    expActual = exp;
    userSession = {
        observacionSeleccionada: "",
        observacionLibre: "",
        problemaSeleccionado: "",
        hipotesisCondicion: "",
        hipotesisEfecto: "",
        ensayos: [],
        analisisSeleccionado: "",
        conclusionSeleccionada: "",
        conclusionTexto: "",
        comunicacionTitular: ""
    };

    document.getElementById("lab-titulo").innerText = exp.titulo;
    document.getElementById("lab-tag").innerText = materiaActual.toUpperCase();

    poblarOpcionesPaso1(exp);
    poblarOpcionesPaso2(exp);
    poblarConstructorPaso3(exp);
    configurarSimuladorPaso4(exp);
    poblarOpcionesPaso5(exp);
    poblarOpcionesPaso6(exp);
    poblarOpcionesPaso7(exp);

    document.getElementById("menu-materias").classList.add("hidden");
    document.getElementById("vista-laboratorio").classList.remove("hidden");

    cambiarPaso(1);
    detectarSensores();
}

function cambiarPaso(paso) {
    pasoActual = paso;
    document.querySelectorAll(".step-card").forEach(c => c.classList.add("hidden"));

    const cardActual = document.querySelector(`.step-card[data-paso="${paso}"]`);
    if (cardActual) cardActual.classList.remove("hidden");

    const titulos = [
        "1. Observación", "2. Pregunta Problema", "3. Formulación de Hipótesis",
        "4. Experimentación Virtual", "5. Análisis de Mediciones", "6. Conclusión", "7. Divulgación"
    ];

    document.getElementById("step-name").innerText = `Paso ${paso}/7: ${titulos[paso - 1]}`;
    document.getElementById("progress-fill").style.width = `${(paso / 7) * 100}%`;

    detenerCanvasAnim();

    if (paso === 1) {
        arrancarCanvas("canvas-obs", expActual.simTipo, true);
    } else if (paso === 4) {
        arrancarCanvas("canvas-exp", expActual.simTipo, false);
    } else if (paso === 6) {
        const hipResumen = `Si ${userSession.hipotesisCondicion || '...'}, entonces ${userSession.hipotesisEfecto || '...'}.`;
        document.getElementById("txt-recordatorio-hip").innerText = `"${hipResumen}"`;
    }
}

function avanzarPaso(pasoActual, pasoSiguiente) {
    if (pasoActual === 1 && !userSession.observacionSeleccionada) {
        alert("¡Selecciona al menos una observación de la lista para continuar!");
        return;
    }
    if (pasoActual === 2 && !userSession.problemaSeleccionado) {
        const probLibre = document.getElementById("input-problema-libre").value.trim();
        if (!probLibre) {
            alert("¡Elige una pregunta de investigación o escribe una en el botón 'escribe tu propia pregunta'!");
            return;
        }
        userSession.problemaSeleccionado = probLibre;
    }
    if (pasoActual === 5 && !userSession.analisisSeleccionado) {
        alert("¡Selecciona la tendencia que descubriste en tus datos!");
        return;
    }
    if (pasoActual === 6 && !userSession.conclusionSeleccionada) {
        alert("¡Elige si tu hipótesis fue confirmada o refutada con tus resultados!");
        return;
    }
    cambiarPaso(pasoSiguiente);
}

/* CARGA DE OPCIONES GUIADAS */
function poblarOpcionesPaso1(exp) {
    const contenedor = document.getElementById("quiz-obs-options");
    contenedor.innerHTML = "";
    exp.preguntasObs.forEach(texto => {
        const opt = document.createElement("div");
        opt.className = "quiz-option";
        opt.innerText = texto;
        opt.onclick = () => {
            contenedor.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            userSession.observacionSeleccionada = texto;
        };
        contenedor.appendChild(opt);
    });
}

function poblarOpcionesPaso2(exp) {
    const contenedor = document.getElementById("quiz-problema-options");
    contenedor.innerHTML = "";
    exp.preguntasProb.forEach(texto => {
        const opt = document.createElement("div");
        opt.className = "quiz-option";
        opt.innerText = texto;
        opt.onclick = () => {
            contenedor.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            userSession.problemaSeleccionado = texto;
        };
        contenedor.appendChild(opt);
    });
}

function toggleCustomInput(id) {
    document.getElementById(id).classList.toggle("hidden");
}

function poblarConstructorPaso3(exp) {
    const selectCond = document.getElementById("hb-condicion");
    const selectEf = document.getElementById("hb-efecto");
    selectCond.innerHTML = "";
    selectEf.innerHTML = "";

    exp.hipCondiciones.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        selectCond.appendChild(opt);
    });

    exp.hipEfectos.forEach(e => {
        const opt = document.createElement("option");
        opt.value = e;
        opt.textContent = e;
        selectEf.appendChild(opt);
    });

    actualizarPrevisualizacionHipotesis();
}

function actualizarPrevisualizacionHipotesis() {
    const c = document.getElementById("hb-condicion").value;
    const e = document.getElementById("hb-efecto").value;
    userSession.hipotesisCondicion = c;
    userSession.hipotesisEfecto = e;
    document.getElementById("hb-preview-text").innerText = `"Si ${c.toLowerCase()}, entonces ${e.toLowerCase()}."`;
}

function poblarOpcionesPaso5(exp) {
    const contenedor = document.getElementById("quiz-analisis-options");
    contenedor.innerHTML = "";
    exp.analisisOpciones.forEach(txt => {
        const opt = document.createElement("div");
        opt.className = "quiz-option";
        opt.innerText = txt;
        opt.onclick = () => {
            contenedor.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            userSession.analisisSeleccionado = txt;
        };
        contenedor.appendChild(opt);
    });
}

function poblarOpcionesPaso6(exp) {
    const contenedor = document.getElementById("quiz-conclusion-options");
    contenedor.innerHTML = "";
    exp.conclusionesOpciones.forEach(txt => {
        const opt = document.createElement("div");
        opt.className = "quiz-option";
        opt.innerText = txt;
        opt.onclick = () => {
            contenedor.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            userSession.conclusionSeleccionada = txt;
        };
        contenedor.appendChild(opt);
    });
}

function poblarOpcionesPaso7(exp) {
    const contenedor = document.getElementById("quiz-comunicacion-options");
    contenedor.innerHTML = "";
    exp.titularesCom.forEach(txt => {
        const opt = document.createElement("div");
        opt.className = "quiz-option";
        opt.innerText = txt;
        opt.onclick = () => {
            contenedor.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            userSession.comunicacionTitular = txt;
        };
        contenedor.appendChild(opt);
    });
}

/* SIMULADOR EN VIVO */
let simVars = { param1: 35 };

function configurarSimuladorPaso4(exp) {
    const contenedor = document.getElementById("sim-controls-container");
    contenedor.innerHTML = "";
    document.getElementById("tabla-registros").innerHTML = `<tr><td colspan="4" style="text-align:center; color:#64748b;">Aún no has hecho ensayos. ¡Presiona los botones para registrar datos!</td></tr>`;

    if (exp.simTipo === "fuerza" || exp.simTipo === "choque" || exp.simTipo === "newton") {
        simVars.fuerza = 14; // Fuerza inicial en Newtons (N)
        simVars.masa = 2.0;  // Masa inicial en Kilogramos (kg)

        contenedor.innerHTML = `
            <div class="control-item" style="margin-bottom: 12px;">
                <div class="control-header" style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span>Fuerza Aplicada: <b id="val-ctrl-fuerza">14</b> N</span>
                </div>
                <input type="range" class="slider" min="5" max="80" value="14" oninput="actualizarVarFuerza(this.value)">
            </div>

            <div class="control-item" style="margin-bottom: 15px;">
                <div class="control-header" style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span>Masa del Carro: <b id="val-ctrl-masa">2.0</b> kg</span>
                </div>
                <input type="range" class="slider" min="0.5" max="5.0" step="0.5" value="2.0" oninput="actualizarVarMasa(this.value)">
            </div>

            <button class="btn btn-neon" style="background:#10b981; color:#fff;" onclick="lanzarPruebaNewton()">▶ Aplicar Impulso y Medir</button>
        `;
    } else if (exp.simTipo === "ph") {
        contenedor.innerHTML = `
            <div class="btn-duo" style="margin-top:0;">
                <button class="btn btn-muted btn-sm" onclick="accionarReactivoPH('acido')">+ Ácido Clorhídrico</button>
                <button class="btn btn-muted btn-sm" onclick="accionarReactivoPH('base')">+ Hidróxido de Sodio</button>
            </div>
            <div style="text-align:center; margin-top:10px; font-size:0.85rem;">
                pH de la solución: <b id="val-ph-live" style="color:var(--neon-blue); font-size:1.1rem;">7.00</b>
            </div>
        `;
    } else if (exp.simTipo === "circuito") {
        contenedor.innerHTML = `
            <div class="control-item">
                <div class="control-header"><span>Voltaje: <b id="val-ctrl1">9</b> V</span></div>
                <input type="range" class="slider" min="1" max="24" value="9" oninput="actualizarSlider(1, this.value, ' V')">
            </div>
            <button class="btn btn-neon" onclick="ejecutarEnsayoSimulado('Cierre de Interruptor')">💡 Medir Intensidad Lumínica</button>
        `;
    } else if (exp.simTipo === "pendulo") {
        simVars.param1 = 45; 
        contenedor.innerHTML = `
            <div class="control-item">
                <div class="control-header"><span>Amplitud / Apertura: <b id="val-ctrl1">45</b>°</span></div>
                <input type="range" class="slider" min="15" max="85" value="45" oninput="actualizarSlider(1, this.value, '°')">
            </div>
            <button class="btn btn-neon" onclick="ejecutarEnsayoSimulado('Medición de Péndulo')">⏱️ Registrar Lectura del Péndulo</button>
        `;
    } else {
        contenedor.innerHTML = `
            <div class="control-item">
                <div class="control-header"><span>Intensidad de Entrada: <b id="val-ctrl1">50</b> %</span></div>
                <input type="range" class="slider" min="10" max="100" value="50" oninput="actualizarSlider(1, this.value, ' %')">
            </div>
            <button class="btn btn-neon" onclick="ejecutarEnsayoSimulado('Medición Sensorial')">🚀 Registrar Lectura</button>
        `;
    }
}

function actualizarVarFuerza(val) {
    simVars.fuerza = parseFloat(val);
    const tag = document.getElementById("val-ctrl-fuerza");
    if (tag) tag.innerText = val;
}

function actualizarVarMasa(val) {
    simVars.masa = parseFloat(val);
    const tag = document.getElementById("val-ctrl-masa");
    if (tag) tag.innerText = parseFloat(val).toFixed(1);
}

function lanzarPruebaNewton() {
    const fuerza = simVars.fuerza || 14;
    const masa = simVars.masa || 2.0;
    
    const aceleracion = (fuerza / masa).toFixed(2);

    simVars.impulsoActivo = true;
    simVars.velocidadAcc = parseFloat(aceleracion);

    registrarFilaTabla(
        `F = ${fuerza} N, m = ${masa} kg`, 
        `Aceleración = ${aceleracion} m/s²`, 
        "Completado"
    );
}

function actualizarSlider(num, val, unit) {
    simVars.param1 = parseFloat(val);
    const tag = document.getElementById(`val-ctrl${num}`);
    if (tag) tag.innerText = val + unit;
}

function accionarReactivoPH(tipo) {
    if (tipo === 'acido') {
        simVars.param1 = Math.max(1.0, simVars.param1 - 1.2);
    } else {
        simVars.param1 = Math.min(14.0, simVars.param1 + 1.2);
    }
    const valTag = document.getElementById("val-ph-live");
    if (valTag) valTag.innerText = simVars.param1.toFixed(2);

    registrarFilaTabla(`Gotas de ${tipo.toUpperCase()}`, `pH = ${simVars.param1.toFixed(2)}`, simVars.param1 < 7 ? "Ácido" : simVars.param1 > 7 ? "Base" : "Neutro");
}

function ejecutarEnsayoSimulado(nombreAccion) {
    let medicion = "";
    let estado = "Normal";

    if (expActual.simTipo === "fuerza") {
        const acel = (simVars.param1 / 2.5).toFixed(2);
        medicion = `Aceleración: ${acel} m/s²`;
        estado = acel > 20 ? "Aceleración Alta" : "Aceleración Media";
    } else if (expActual.simTipo === "circuito") {
        const amperes = (simVars.param1 / 10).toFixed(2);
        medicion = `Corriente: ${amperes} A`;
        estado = amperes > 1.5 ? "Foco Muy Brillante" : "Brillo Normal";
    } else {
        medicion = `Respuesta = ${(simVars.param1 * 1.34).toFixed(1)} unidades`;
        estado = "Registro Válido";
    }

    registrarFilaTabla(`${nombreAccion} (${simVars.param1})`, medicion, estado);
}

function registrarFilaTabla(control, resultado, estado) {
    const tabla = document.getElementById("tabla-registros");
    if (userSession.ensayos.length === 0) tabla.innerHTML = "";

    const num = userSession.ensayos.length + 1;
    userSession.ensayos.push({ num, control, resultado, estado });

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><b>#${num}</b></td>
        <td>${control}</td>
        <td style="color:var(--neon-blue); font-weight:600;">${resultado}</td>
        <td><span class="pill">${estado}</span></td>
    `;
    tabla.appendChild(tr);
}

function detenerCanvasAnim() {
    if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
    }
}

function actualizarVarFuerza(val) {
    simVars.fuerza = parseFloat(val);
    const tag = document.getElementById("val-ctrl-fuerza");
    if (tag) tag.innerText = val;
}

function actualizarVarMasa(val) {
    simVars.masa = parseFloat(val);
    const tag = document.getElementById("val-ctrl-masa");
    if (tag) tag.innerText = parseFloat(val).toFixed(1);
}

function lanzarPruebaNewton() {
    const fuerza = simVars.fuerza || 14;
    const masa = simVars.masa || 2.0;
    
    // Ley de Newton: Aceleración = Fuerza / Masa
    const aceleracion = (fuerza / masa).toFixed(2);

    // Activa el impulso en la animación del canvas
    simVars.impulsoActivo = true;
    simVars.velocidadAcc = parseFloat(aceleracion);

    // Registra el ensayo numérico en la tabla de datos del Paso 5
    registrarFilaTabla(
        `F = ${fuerza} N, m = ${masa} kg`, 
        `Aceleración = ${aceleracion} m/s²`, 
        "Completado"
    );
}
function actualizarSlider(num, val, unit) {
    simVars.param1 = parseFloat(val);
    const tag = document.getElementById(`val-ctrl${num}`);
    if (tag) tag.innerText = val + unit;
}

function accionarReactivoPH(tipo) {
    if (tipo === 'acido') {
        simVars.param1 = Math.max(1.0, simVars.param1 - 1.2);
    } else {
        simVars.param1 = Math.min(14.0, simVars.param1 + 1.2);
    }
    const valTag = document.getElementById("val-ph-live");
    if (valTag) valTag.innerText = simVars.param1.toFixed(2);

    registrarFilaTabla(`Gotas de ${tipo.toUpperCase()}`, `pH = ${simVars.param1.toFixed(2)}`, simVars.param1 < 7 ? "Ácido" : simVars.param1 > 7 ? "Base" : "Neutro");
}

function ejecutarEnsayoSimulado(nombreAccion) {
    let medicion = "";
    let estado = "Normal";

    if (expActual.simTipo === "fuerza") {
        const acel = (simVars.param1 / 2.5).toFixed(2);
        medicion = `Aceleración: ${acel} m/s²`;
        estado = acel > 20 ? "Aceleración Alta" : "Aceleración Media";
    } else if (expActual.simTipo === "circuito") {
        const amperes = (simVars.param1 / 10).toFixed(2);
        medicion = `Corriente: ${amperes} A`;
        estado = amperes > 1.5 ? "Foco Muy Brillante" : "Brillo Normal";
    } else {
        medicion = `Respuesta = ${(simVars.param1 * 1.34).toFixed(1)} unidades`;
        estado = "Registro Válido";
    }

    registrarFilaTabla(`${nombreAccion} (${simVars.param1})`, medicion, estado);
}

function registrarFilaTabla(control, resultado, estado) {
    const tabla = document.getElementById("tabla-registros");
    if (userSession.ensayos.length === 0) tabla.innerHTML = "";

    const num = userSession.ensayos.length + 1;
    userSession.ensayos.push({ num, control, resultado, estado });

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><b>#${num}</b></td>
        <td>${control}</td>
        <td style="color:var(--neon-blue); font-weight:600;">${resultado}</td>
        <td><span class="pill">${estado}</span></td>
    `;
    tabla.appendChild(tr);
}

function detenerCanvasAnim() {
    if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
    }
}

function arrancarCanvas(canvasId, tipo, esDemo) {
    detenerCanvasAnim();
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let xPos = 40;
    let t = 0;
    let velocidadActual = 0;
    let carroEnElBorde = false;
    let isDragging = false;

    // Inicializar variables físicas del péndulo si no existen
    if (simVars.anguloPendulo === undefined) {
        simVars.anguloPendulo = (45 * Math.PI) / 180;
        simVars.velAngular = 0;
    }

    // Configurar eventos de arrastre (mouse y táctil) una sola vez por canvas
    if (!canvas._dragListenersAttached) {
        canvas._dragListenersAttached = true;

        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
            
            // Detectar si el clic es sobre la posición actual del carro
            if (mouseX >= xPos - 15 && mouseX <= xPos + 75 && mouseY >= canvas.height - 75 && mouseY <= canvas.height - 20) {
                isDragging = true;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const rect = canvas.getBoundingClientRect();
            let mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            xPos = Math.max(40, Math.min(mouseX - 30, canvas.width - 70));
            velocidadActual = 0;
            if (xPos < canvas.width - 70) {
                carroEnElBorde = false;
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
            const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);
            
            if (touchX >= xPos - 15 && touchX <= xPos + 75 && touchY >= canvas.height - 75 && touchY <= canvas.height - 20) {
                isDragging = true;
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            let touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
            xPos = Math.max(40, Math.min(touchX - 30, canvas.width - 70));
            velocidadActual = 0;
            if (xPos < canvas.width - 70) {
                carroEnElBorde = false;
            }
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += 0.04;

        if (tipo === "fuerza" || tipo === "choque" || tipo === "newton") {
            ctx.strokeStyle = "#1e293b";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height - 30);
            ctx.lineTo(canvas.width, canvas.height - 30);
            ctx.stroke();

            if (esDemo) {
                xPos = 120 + Math.sin(t * 2) * 80;
            } else {
                if (simVars.impulsoActivo) {
                    velocidadActual = (simVars.velocidadAcc || 2.0) * 0.4;
                    simVars.impulsoActivo = false;
                    carroEnElBorde = false;
                }

                // Si no se está arrastrando manualmente, aplicamos inercia y fricción
                if (!isDragging) {
                    if (velocidadActual > 0.05) {
                        xPos += velocidadActual;
                        velocidadActual *= 0.96; 
                    } else {
                        velocidadActual = 0;
                    }
                }

                // Verificar si llegó al final de la pista y se detuvo
                if (xPos >= canvas.width - 70 && velocidadActual <= 0.05 && !isDragging) {
                    xPos = canvas.width - 70;
                    velocidadActual = 0;
                    carroEnElBorde = true;
                }

                if (sensorActivo) {
                    xPos += sensorTilt * 2;
                }
            }

            // Dibujar el carrito (cambia de color verde si lo estás arrastrando)
            ctx.fillStyle = isDragging ? "#10b981" : "#00e5ff";
            ctx.shadowColor = isDragging ? "#10b981" : "#00e5ff";
            ctx.shadowBlur = 10;
            ctx.fillRect(xPos, canvas.height - 65, 60, 25);
            ctx.shadowBlur = 0;

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(xPos + 12, canvas.height - 38, 7, 0, Math.PI * 2);
            ctx.arc(xPos + 48, canvas.height - 38, 7, 0, Math.PI * 2);
            ctx.fill();

            // Pantalla emergente en el canvas cuando se detiene al final
            if (carroEnElBorde && !esDemo) {
                ctx.fillStyle = "rgba(10, 14, 20, 0.85)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#00e5ff";
                ctx.font = "bold 14px system-ui, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("⚠️ ¡El carro se ha detenido al final de la pista!", canvas.width / 2, canvas.height / 2 - 15);

                ctx.fillStyle = "#ffffff";
                ctx.font = "12px system-ui, sans-serif";
                ctx.fillText("👆 Mantén presionado y desliza el carro hacia la izquierda para reiniciar", canvas.width / 2, canvas.height / 2 + 10);
                ctx.textAlign = "left";
            }

        } else if (tipo === "ph") {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const col = simVars.param1 < 6 ? "#ef4444" : simVars.param1 > 8 ? "#a855f7" : "#10b981";

            ctx.fillStyle = col;
            ctx.shadowColor = col;
            ctx.shadowBlur = 15;
            ctx.fillRect(cx - 50, cy - 20, 100, 100);
            ctx.shadowBlur = 0;

            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 4;
            ctx.strokeRect(cx - 55, cy - 30, 110, 115);

        } else if (tipo === "pendulo") {
            const cx = canvas.width / 2;
            const cy = 30;
            const longitudCuerda = 120;
            const g = 0.4; // Gravedad visual para aceleración realista

            if (esDemo) {
                // Física real de péndulo: acelera al caer, desacelera al subir
                const aceleracionAngular = (-g / longitudCuerda) * Math.sin(simVars.anguloPendulo);
                simVars.velAngular += aceleracionAngular;
                simVars.anguloPendulo += simVars.velAngular;
                simVars.velAngular *= 0.995; // Fricción muy leve
            } else {
                // En experimentación, responde de forma armónica al slider del usuario
                const gradosAmplitud = simVars.param1 !== undefined ? simVars.param1 : 45;
                const anguloMaximo = (gradosAmplitud * Math.PI) / 180;
                simVars.anguloPendulo = anguloMaximo * Math.sin(t * 2);
            }

            const xEsfera = cx + longitudCuerda * Math.sin(simVars.anguloPendulo);
            const yEsfera = cy + longitudCuerda * Math.cos(simVars.anguloPendulo);

            ctx.fillStyle = "#94a3b8";
            ctx.fillRect(cx - 20, cy - 10, 40, 8);

            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(xEsfera, yEsfera);
            ctx.stroke();

            ctx.fillStyle = "#a855f7";
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(xEsfera, yEsfera, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

        } else {
            ctx.strokeStyle = "#a855f7";
            ctx.lineWidth = 3;
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i += 20) {
                let y = (canvas.height / 2) + Math.sin(t + i * 0.05) * 35;
                if (i === 0) ctx.moveTo(i, y);
                else ctx.lineTo(i, y);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        animId = requestAnimationFrame(render);
    }
    render();
}
/* HARDWARE / SENSORES */
function detectarSensores() {
    if (window.DeviceMotionEvent) {
        document.getElementById("sensor-btn-box").classList.remove("hidden");
    }
}

function activarAcelerometroMovil() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission().then(state => {
            if (state === 'granted') escucharMovimiento();
        }).catch(console.warn);
    } else {
        escucharMovimiento();
    }
}

function escucharMovimiento() {
    window.addEventListener("devicemotion", (e) => {
        if (e.accelerationIncludingGravity) {
            sensorTilt = e.accelerationIncludingGravity.x || 0;
            sensorActivo = true;
        }
    });
    alert("¡Sensor de inclinación vinculado! Mueve tu móvil para interactuar.");
}

/* EVALUACIÓN FINAL IA HÍBRIDA */
async function ejecutarEvaluacionFinal() {
    document.getElementById("vista-laboratorio").classList.add("hidden");
    document.getElementById("vista-evaluacion").classList.remove("hidden");

    const loader = document.getElementById("eval-loader");
    const content = document.getElementById("eval-content");
    const motorTag = document.getElementById("eval-motor");
    const rankTag = document.getElementById("eval-badge-rank");

    loader.classList.remove("hidden");
    content.innerHTML = "";

    userSession.observacionLibre = document.getElementById("input-obs-extra").value.trim();
    userSession.conclusionTexto = document.getElementById("input-conclusion-texto").value.trim();

    const apiKey = localStorage.getItem("nexora_gemini_key");
    let dictamen = null;

    if (navigator.onLine && apiKey) {
        try {
            motorTag.innerText = "IA Global Cloud (Google Gemini)";
            dictamen = await consultarIAGlobalGemini(apiKey);
        } catch (err) {
            console.warn("Fallo nube, conmutando a IA Local Heurística:", err);
            motorTag.innerText = "IA Local Autónoma (Offline)";
            dictamen = evaluarConIALocalAdaptada();
        }
    } else {
        motorTag.innerText = "IA Local Autónoma (Offline)";
        dictamen = evaluarConIALocalAdaptada();
    }

    loader.classList.add("hidden");

    if (dictamen.puntaje >= 90) {
        rankTag.innerText = "🏆 Maestro del Cosmos";
        rankTag.style.background = "linear-gradient(90deg, #10b981, #00e5ff)";
    } else if (dictamen.puntaje >= 75) {
        rankTag.innerText = "⚡ Investigador Cuántico";
        rankTag.style.background = "linear-gradient(90deg, #f59e0b, #ec4899)";
    } else {
        rankTag.innerText = "🌱 Explorador Novato";
        rankTag.style.background = "linear-gradient(90deg, #3b82f6, #8b5cf6)";
    }

    let htmlPasos = "";
    dictamen.rubrica.forEach(item => {
        htmlPasos += `
            <div class="eval-step-row ${item.aprobado ? 'pass' : 'warn'}">
                <b>${item.aprobado ? '✔ Logrado' : '⚠️ Atención'} - ${item.paso}:</b>
                <p style="color:#94a3b8; margin-top:2px;">${item.mensaje}</p>
            </div>
        `;
    });

    content.innerHTML = `
        <div class="score-display">${dictamen.puntaje} / 100 PTS</div>
        <p style="text-align:center; font-size:0.9rem; color:#e2e8f0; margin-bottom:16px;">${dictamen.mensajeGeneral}</p>
        <div>${htmlPasos}</div>
    `;
}

function evaluarConIALocalAdaptada() {
    let score = 0;
    let rubrica = [];

    if (userSession.observacionSeleccionada) {
        score += 15;
        rubrica.push({ paso: "1. Observación", aprobado: true, mensaje: "Identificaste el fenómeno físico con precisión visual." });
    } else {
        rubrica.push({ paso: "1. Observación", aprobado: false, mensaje: "No seleccionaste ninguna observación concreta." });
    }

    if (userSession.problemaSeleccionado) {
        score += 15;
        rubrica.push({ paso: "2. Planteamiento", aprobado: true, mensaje: "Formulaste una pregunta con relación causal de variables." });
    }

    if (userSession.hipotesisCondicion && userSession.hipotesisEfecto) {
        score += 20;
        rubrica.push({ paso: "3. Hipótesis", aprobado: true, mensaje: `Excelente construcción lógica: 'Si ${userSession.hipotesisCondicion}, entonces ${userSession.hipotesisEfecto}'.` });
    }

    if (userSession.ensayos.length >= 2) {
        score += 20;
        rubrica.push({ paso: "4. Experimentación", aprobado: true, mensaje: `Rigor científico: ejecutaste ${userSession.ensayos.length} pruebas controladas en el simulador.` });
    } else {
        score += 5;
        rubrica.push({ paso: "4. Experimentación", aprobado: false, mensaje: "Hiciste menos de 2 ensayos; se requieren repeticiones para verificar consistencia." });
    }

    if (userSession.conclusionSeleccionada.includes("confirma") || userSession.conclusionSeleccionada.includes("valida")) {
        score += 15;
        rubrica.push({ paso: "5 & 6. Análisis y Conclusión", aprobado: true, mensaje: "Contrastaste con acierto las mediciones contra tu hipótesis." });
    } else {
        score += 10;
        rubrica.push({ paso: "5 & 6. Análisis y Conclusión", aprobado: true, mensaje: "Conclusión honesta con base en datos empíricos." });
    }

    if (userSession.comunicacionTitular) {
        score += 15;
        rubrica.push({ paso: "7. Divulgación", aprobado: true, mensaje: "Elegiste un titular claro y atractivo para la comunidad científica." });
    }

    return {
        puntaje: score,
        mensajeGeneral: score >= 80 
            ? "¡Trabajo científico sobresaliente! Demostraste pensamiento crítico y análisis cuantitativo impecable." 
            : "¡Buen intento! Desarrollaste el método científico con éxito, aunque puedes mejorar realizando más ensayos experimentales.",
        rubrica
    };
}

async function consultarIAGlobalGemini(apiKey) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
Eres un tutor de ciencias juvenil y motivador evaluando a un estudiante de ${nivelActual} (12-18 años).
Tema: ${expActual.titulo}.
Respuestas del alumno:
- Observación: ${userSession.observacionSeleccionada}
- Pregunta: ${userSession.problemaSeleccionado}
- Hipótesis: Si ${userSession.hipotesisCondicion}, entonces ${userSession.hipotesisEfecto}.
- Ensayos en tabla: ${userSession.ensayos.length} pruebas realizadas.
- Análisis: ${userSession.analisisSeleccionado}
- Conclusión: ${userSession.conclusionSeleccionada}

Devuelve ÚNICAMENTE un JSON válido con esta estructura estricta:
{
  "puntaje": [un número entre 60 y 100],
  "mensajeGeneral": "[mensaje motivador para el joven de 2 líneas]",
  "rubrica": [
    {"paso": "Observación y Pregunta", "aprobado": true, "mensaje": "..."},
    {"paso": "Hipótesis Causal", "aprobado": true, "mensaje": "..."},
    {"paso": "Experimentación y Análisis", "aprobado": true, "mensaje": "..."},
    {"paso": "Conclusión Crítica", "aprobado": true, "mensaje": "..."}
  ]
}
`;

    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!res.ok) throw new Error("Fallo en API Nube");

    const data = await res.json();
    let text = data.candidates[0].content.parts[0].text;
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(text);
}

function revisarPasoActual() {
    document.getElementById("vista-evaluacion").classList.add("hidden");
    document.getElementById("vista-laboratorio").classList.remove("hidden");
    cambiarPaso(5);
}

function reiniciarALista() {
    detenerCanvasAnim();
    document.getElementById("vista-evaluacion").classList.add("hidden");
    document.getElementById("menu-materias").classList.remove("hidden");
}

window.onload = () => {
    syncRed();
};