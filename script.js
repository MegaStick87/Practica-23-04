// Adivina el número - Script!

// Programado por MegaStick. (Fabricio Isaac Gutiérrez Moreno)


// _____ ______   _______   ________  ________  ________  _________  ___  ________  ___  __       
// |\   _ \  _   \|\  ___ \ |\   ____\|\   __  \|\   ____\|\___   ___\\  \|\   ____\|\  \|\  \     
// \ \  \\\__\ \  \ \   __/|\ \  \___|\ \  \|\  \ \  \___|\|___ \  \_\ \  \ \  \___|\ \  \/  /|_   
// \ \  \\|__| \  \ \  \_|/_\ \  \  __\ \   __  \ \_____  \   \ \  \ \ \  \ \  \    \ \   ___  \  
//  \ \  \    \ \  \ \  \_|\ \ \  \|\  \ \  \ \  \|____|\  \   \ \  \ \ \  \ \  \____\ \  \\ \  \ 
//   \ \__\    \ \__\ \_______\ \_______\ \__\ \__\____\_\  \   \ \__\ \ \__\ \_______\ \__\\ \__\
//    \|__|     \|__|\|_______|\|_______|\|__|\|__|\_________\   \|__|  \|__|\|_______|\|__| \|__|
//                                                \|_________|                                    

//                                             ARCHIVO JS.

// Ingeniería TIC'S.

// Variables del juego:
// --------------------
let numeroSecreto;
let intentos = 0;
let juegoIniciado = false;
let pensamientos = 0;
let maximoNumero = 100;
let maximosIntentos = 5;
let dificultadSeleccionada = false;
// --------------------

// Establecer la dificultad fácil al hacer clic en el botón correspondiente
document.getElementById('facil').addEventListener('click', function() {
    maximoNumero = 50;
    maximosIntentos = 10;
    dificultadSeleccionada = true;
    updateDifficulty('Fácil seleccionado: Número entre 1 y 50 con 10 intentos.', 'green');
});

// Establecer la dificultad media al hacer clic en el botón correspondiente
document.getElementById('medio').addEventListener('click', function() {
    maximoNumero = 100;
    maximosIntentos = 5;
    dificultadSeleccionada = true;
    updateDifficulty('Medio seleccionado: Número entre 1 y 100 con 5 intentos.', 'orange');
});

// Establecer la dificultad difícil al hacer clic en el botón correspondiente
document.getElementById('dificil').addEventListener('click', function() {
    maximoNumero = 200;
    maximosIntentos = 3;
    dificultadSeleccionada = true;
    updateDifficulty('Muy difícil seleccionado: Número entre 1 y 200 con 3 intentos.', 'red');
});

// Función para reiniciar el juego
document.getElementById('reiniciar').addEventListener('click', function() {
    resetGame();
});

// Iniciar el juego
document.getElementById('iniciar').addEventListener('click', function() {
    if (!dificultadSeleccionada) {
        alert('Primero tienes que escoger la dificultad del juego!');
        return;
    }
    juegoIniciado = true;
    numeroSecreto = Math.floor(Math.random() * maximoNumero) + 1;
    document.getElementById('numero').disabled = false;
    document.getElementById('intentar').disabled = false;
    document.getElementById('iniciar').disabled = true;
    document.getElementById('reiniciar').disabled = false;
    document.getElementById('pensar').disabled = false;
    enableDifficultyButtons(false);
    updateStatus('El número secreto ha sido elegido. Intenta adivinarlo!', 'black');
});

// Permitir cambiar el número pensado
document.getElementById('pensar').addEventListener('click', function() {
    if (pensamientos >= 4) {
        alert('Ya no puedes pensar en otro número, tus intentos se han terminado.');
        document.getElementById('pensar').disabled = true;
        return;
    }
    numeroSecreto = Math.floor(Math.random() * maximoNumero) + 1;
    pensamientos++;
    updateStatus(`Nuevo número pensado. Intenta adivinarlo! (Intento de pensar #${pensamientos+1})`, 'black');
});

// Proceso para intentar adivinar el número
document.getElementById('intentar').addEventListener('click', function() {
    if (!juegoIniciado) {
        alert('Presiona "Iniciar juego"');
        return;
    }
    let numeroIngresado = parseInt(document.getElementById('numero').value);
    if (numeroIngresado < 1 || numeroIngresado > maximoNumero) {
        alert('Ingresa un número dentro del rango permitido (1-' + maximoNumero + ')');
        return;
    }
    intentos++;
    let diferencia = Math.abs(numeroIngresado - numeroSecreto);
    if (diferencia === 0) {
        updateStatus('Ganaste! Lo lograste en: ' + intentos + ' intentos.', 'green');
        juegoIniciado = false;
        disableInputs();
    } else if (intentos >= maximosIntentos) {
        updateStatus('Has perdido, el número era: ' + numeroSecreto + '.', 'red');
        juegoIniciado = false;
        disableInputs();
    } else {
        checkTemperature(diferencia);
    }
});

// Deshabilita los controles de entrada cuando el juego termina
function disableInputs() {
    document.getElementById('numero').disabled = true;
    document.getElementById('intentar').disabled = true;
    document.getElementById('pensar').disabled = true;
}

// Resetea el juego a su estado inicial
function resetGame() {
    intentos = 0;
    juegoIniciado = false;
    pensamientos = 0;
    dificultadSeleccionada = false;
    document.getElementById('numero').value = '';
    updateStatus('El juego ha sido reiniciado. Por favor, selecciona una nueva dificultad y luego presiona "Iniciar juego" para comenzar nuevamente.', 'black');
    document.getElementById('numero').disabled = true;
    document.getElementById('intentar').disabled = true;
    document.getElementById('reiniciar').disabled = true;
    document.getElementById('iniciar').disabled = false;
    document.getElementById('pensar').disabled = true;
    enableDifficultyButtons(true);
}

// Actualiza el mensaje de estado del juego
function updateStatus(message, color) {
    const statusElement = document.getElementById('intentos');
    statusElement.style.opacity = 0;
    setTimeout(() => {
        statusElement.textContent = message;
        statusElement.style.color = color;
        statusElement.style.opacity = 1;
    }, 300);
}

// Función para actualizar el mensaje de dificultad
function updateDifficulty(message, color) {
    updateStatus(message, color);
}

// Habilita o deshabilita los botones de dificultad
function enableDifficultyButtons(enable) {
    document.getElementById('facil').disabled = !enable;
    document.getElementById('medio').disabled = !enable;
    document.getElementById('dificil').disabled = !enable;
}

// Evalúa qué tan cerca está el número ingresado del número secreto y actualiza el mensaje
function checkTemperature(diferencia) {
    if (diferencia <= 10) {
        updateStatus('Caliente. :D Te quedan: ' + (maximosIntentos - intentos) + ' intentos.', 'red');
    } else if (diferencia <= 30) {
        updateStatus('Tibión. :/ Te quedan: ' + (maximosIntentos - intentos) + ' intentos.', 'orange');
    } else {
        updateStatus('Frío. :( Te quedan: ' + (maximosIntentos - intentos) + ' intentos.', 'blue');
    }
}

