/* ==========================================================================
   SISTEMA DE NAVEGACIÓN ENTRE PESTAÑAS Y CONTROL DE PORTADA
   ========================================================================== */
function abrirModulo(evt, nombreModulo) {
    document.getElementById("main-cover").style.display = "none";
    
    var contenidos = document.getElementsByClassName("tab-content");
    for (var i = 0; i < contenidos.length; i++) {
        contenidos[i].style.display = "none";
    }
    
    var botones = document.getElementsByClassName("control-pestana");
    for (var i = 0; i < botones.length; i++) {
        botones[i].className = botones[i].className.replace(" active", "");
    }
    
    document.getElementById(nombreModulo).style.display = "block";
    if (evt) {
        evt.currentTarget.className += " active";
    }
}

function volverAPortada() {
    var contenidos = document.getElementsByClassName("tab-content");
    for (var i = 0; i < contenidos.length; i++) {
        contenidos[i].style.display = "none";
    }
    
    var botones = document.getElementsByClassName("control-pestana");
    for (var i = 0; i < botones.length; i++) {
        botones[i].className = botones[i].className.replace(" active", "");
    }
    
    document.getElementById("main-cover").style.display = "block";
}

function limpiarModulo(idFormulario, idAlerta, idComparativo) {
    document.getElementById(idFormulario).reset();
    
    var alerta = document.getElementById(idAlerta);
    alerta.innerHTML = "";
    alerta.classList.add("hidden");
    
    var comparativo = document.getElementById(idComparativo);
    comparativo.innerHTML = "";
    comparativo.classList.add("hidden");
}

/* ==========================================================================
   PROCESADORES DE LÓGICA DE SIMULACIÓN
   ========================================================================== */

// Módulo 1: Carburantes
function procesarCarburantes() {
    var inicial = parseFloat(document.getElementById("carb-inicial").value);
    var consumo = parseFloat(document.getElementById("carb-consumo").value);
    var reabastecimiento = parseFloat(document.getElementById("carb-reabastecimiento").value);
    var critico = parseFloat(document.getElementById("carb-critico").value);
    
    var alertaBox = document.getElementById("res-carburantes-alerta");
    alertaBox.classList.remove("hidden");
    
    if (consumo <= reabastecimiento) {
        alertaBox.style.backgroundColor = "#d4edda";
        alertaBox.style.color = "#155724";
        alertaBox.style.borderColor = "#c3e6cb";
        alertaBox.innerHTML = "<strong>Situación Estable:</strong> El reabastecimiento diario cubre o supera la demanda. Las reservas no se agotarán bajo este ritmo operativo.";
        return;
    }
    
    var dias = 0;
    var reservaActual = inicial;
    
    while (reservaActual > critico) {
        reservaActual = reservaActual - (consumo - reabastecimiento);
        dias++;
        if(dias > 1000) break;
    }
    
    alertaBox.style.backgroundColor = "#f8d7da";
    alertaBox.style.color = "#721c24";
    alertaBox.style.borderColor = "#f5c6cb";
    alertaBox.innerHTML = "<strong>¡Alerta de Inventario!:</strong> Al ritmo de consumo ingresado, la reserva llegará a su nivel crítico de " + critico + " litros en aproximadamente <strong>" + dias + " día(s)</strong>.";
}

// Módulo 2: Alimentos
function procesarAlimentos() {
    var producto = document.getElementById("ali-producto").value;
    var anterior = parseFloat(document.getElementById("ali-anterior").value);
    var actual = parseFloat(document.getElementById("ali-actual").value);
    var cantidad = parseFloat(document.getElementById("ali-cantidad").value);
    
    var cajaAlerta = document.getElementById("res-alimentos-alerta");
    cajaAlerta.classList.remove("hidden");
    
    var gastoAnterior = anterior * cantidad;
    var gastoActual = actual * cantidad;
    var incremento = gastoActual - gastoAnterior;
    
    cajaAlerta.style.backgroundColor = "#fff3cd";
    cajaAlerta.style.color = "#856404";
    cajaAlerta.style.borderColor = "#ffeeba";
    
    cajaAlerta.innerHTML = "<h4>Análisis de Variación para: " + producto + "</h4>" +
                          "<p>Gasto con precio anterior: <strong>" + gastoAnterior.toFixed(2) + " Bs.</strong></p>" +
                          "<p>Gasto con precio actual: <strong>" + gastoActual.toFixed(2) + " Bs.</strong></p>" +
                          "<p>Incremento neto mensual: <strong style='color:#c0392b;'>" + incremento.toFixed(2) + " Bs.</strong></p>";
}

// Módulo 3: Transporte
function procesarTransporte() {
    var distNormal = parseFloat(document.getElementById("trans-dist-normal").value);
    var distDesvio = parseFloat(document.getElementById("trans-dist-desvio").value);
    var costoKm = parseFloat(document.getElementById("trans-costo-km").value);
    var viajes = parseFloat(document.getElementById("trans-viajes").value);
    
    var cajaAlerta = document.getElementById("res-transporte-alerta");
    cajaAlerta.classList.remove("hidden");
    
    if (distDesvio <= distNormal) {
        cajaAlerta.style.backgroundColor = "#d4edda";
        cajaAlerta.style.color = "#155724";
        cajaAlerta.style.borderColor = "#c3e6cb";
        cajaAlerta.innerHTML = "<strong>Operación Normal:</strong> La ruta de contingencia no representa un kilometraje adicional al trayecto regular.";
        return;
    }
    
    var kmExtraPorViaje = distDesvio - distNormal;
    var costoExtraSemanal = kmExtraPorViaje * costoKm * viajes;
    
    cajaAlerta.style.backgroundColor = "#f8d7da";
    cajaAlerta.style.color = "#721c24";
    cajaAlerta.style.borderColor = "#f5c6cb";
    
    cajaAlerta.innerHTML = "<strong>Reporte de Impacto Vial:</strong> Recorres " + kmExtraPorViaje.toFixed(1) + " Km extra por cada viaje. Esto se traduce en un sobrecosto total de <strong>" + costoExtraSemanal.toFixed(2) + " Bs.</strong> por semana.";
}

// Módulo 4: Poder Adquisitivo
function procesarPoderAdquisitivo() {
    var ingreso = parseFloat(document.getElementById("poder-ingreso").value);
    var gasto = parseFloat(document.getElementById("poder-gasto-actual").value);
    
    var cajaAlerta = document.getElementById("res-poder-alerta");
    cajaAlerta.classList.remove("hidden");
    
    if (ingreso >= gasto) {
        var saldo = ingreso - gasto;
        cajaAlerta.style.backgroundColor = "#d4edda";
        cajaAlerta.style.color = "#155724";
        cajaAlerta.style.borderColor = "#c3e6cb";
        cajaAlerta.innerHTML = "<strong>✓ Viabilidad Confirmada:</strong> Tu presupuesto cubre exitosamente el total de la compra. Te quedará un fondo remanente de <strong>" + saldo.toFixed(2) + " Bs.</strong>";
    } else {
        var deficit = gasto - ingreso;
        cajaAlerta.style.backgroundColor = "#f8d7da";
        cajaAlerta.style.color = "#721c24";
        cajaAlerta.style.borderColor = "#f5c6cb";
        cajaAlerta.innerHTML = "<strong>✕ Déficit Presupuestario:</strong> El dinero disponible no es suficiente para esta operación. Te hacen falta exactamente <strong>" + deficit.toFixed(2) + " Bs.</strong> para completar el pago.";
    }
}