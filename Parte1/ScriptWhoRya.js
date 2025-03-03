/**
 * Array de objetos que representa a los jugadores.
 * Cada objeto contiene propiedades como nombre, posición, edad, número, nacionalidad e imagen.
 */
const players = [
    { name: "Lewandowski", position: "Delantero", age: 35, number: 9, nationality: "Polonia", img: "../media/lewan.jpg" }, // Objeto para Lewandowski
    { name: "Ter Stegen", position: "Portero", age: 31, number: 1, nationality: "Alemania", img: "../media/terstegen.jpg" }, // Objeto para Ter Stegen
    { name: "Pedri", position: "Centrocampista", age: 21, number: 8, nationality: "España", img: "../media/pedri.jpg" }, // Objeto para Pedri
    { name: "Iñaki Peña", position: "Portero", age: 25, number: 13, nationality: "España", img: "../media/iñaki.webp" }, // Objeto para Iñaki Peña
    { name: "Wojciech Szczesny", position: "Portero", age: 34, number: 25, nationality: "Polonia", img: "../media/chesni.jpg" }, // Objeto para Szczesny
    { name: "Ander Astralaga", position: "Portero", age: 20, number: 26, nationality: "España", img: "../media/astralaga.webp" }, // Objeto para Ander Astralaga
    { name: "Pau Cubarsi", position: "Defensa", age: 18, number: 2, nationality: "España", img: "../media/cubarsi.jpg" }, // Objeto para Pau Cubarsi
    { name: "Ronald Araujo", position: "Defensa", age: 25, number: 4, nationality: "Uruguay", img: "../media/araujo.webp" }, // Objeto para Ronald Araujo
    { name: "Andreas Christensen", position: "Defensa", age: 28, number: 15, nationality: "Dinamarca", img: "../media/christensen.webp" }, // Objeto para Christensen
    { name: "Eric Garcia", position: "Defensa", age: 24, number: 24, nationality: "España", img: "../media/eric.jpg" }, // Objeto para Eric García
    { name: "Iñigo Martinez", position: "Defensa", age: 33, number: 5, nationality: "España", img: "../media/iñigo.jpg" }, // Objeto para Iñigo Martínez
    { name: "Sergi Dominguez", position: "Defensa", age: 19, number: 36, nationality: "España", img: "../media/sergi.webp" }, // Objeto para Sergi Dominguez
    { name: "Alejandro Balde", position: "Defensa", age: 21, number: 3, nationality: "España", img: "../media/balde.webp" }, // Objeto para Alejandro Balde
    { name: "Gerard Martin", position: "Defensa", age: 22, number: 35, nationality: "España", img: "../media/gerard.webp" }, // Objeto para Gerard Martín
    { name: "Jules Kounde", position: "Defensa", age: 26, number: 23, nationality: "Francia", img: "../media/kounde.webp" }, // Objeto para Jules Koundé
    { name: "Hector Fort", position: "Defensa", age: 18, number: 32, nationality: "España", img: "../media/fort.jpg" }, // Objeto para Héctor Fort
    { name: "Marc Casado", position: "Centrocampista", age: 21, number: 17, nationality: "España", img: "../media/casado.jpg" }, // Objeto para Marc Casado
    { name: "Marc Bernal", position: "Centrocampista", age: 17, number: 28, nationality: "España", img: "../media/bernal.webp" }, // Objeto para Marc Bernal
    { name: "Gavi", position: "Centrocampista", age: 20, number: 6, nationality: "España", img: "../media/gavi.jpg" }, // Objeto para Gavi
    { name: "Fermin Lopez", position: "Centrocampista", age: 21, number: 16, nationality: "España", img: "../media/fermin.jpg" }, // Objeto para Fermín López
    { name: "Frenkie de Jong", position: "Centrocampista", age: 27, number: 21, nationality: "Países Bajos", img: "../media/frenkie.jpg" }, // Objeto para Frenkie de Jong
    { name: "Dani Olmo", position: "Centrocampista", age: 26, number: 20, nationality: "España", img: "../media/olmo.jpg" }, // Objeto para Dani Olmo
    { name: "Pablo Torre", position: "Centrocampista", age: 21, number: 14, nationality: "España", img: "../media/pabloTorre.jpg" }, // Objeto para Pablo Torre
    { name: "Raphinha", position: "Delantero", age: 28, number: 11, nationality: "Brasil", img: "../media/raphinha.jpg" }, // Objeto para Raphinha
    { name: "Ansu Fati", position: "Delantero", age: 22, number: 10, nationality: "España", img: "../media/ansu.jpg" }, // Objeto para Ansu Fati
    { name: "Lamine Yamal", position: "Delantero", age: 17, number: 19, nationality: "España", img: "../media/lamineY.webp" }, // Objeto para Lamine Yamal
    { name: "Ferran Torres", position: "Delantero", age: 24, number: 7, nationality: "España", img: "../media/ferran.jpg" }, // Objeto para Ferran Torres
    { name: "Pau Victor", position: "Delantero", age: 23, number: 18, nationality: "España", img: "../media/pauVictor.webp" } // Objeto para Pau Victor
];

/**
 * Número de intentos disponibles para adivinar el jugador.
 */
let attempts = 4; // Inicializa la cantidad de intentos disponibles

/**
 * Variable que almacenará el jugador misterioso seleccionado aleatoriamente.
 */
let mysteryPlayer; // Jugador que se debe adivinar

/**
 * Array que contendrá los nombres de los jugadores ya adivinados (en minúsculas) para evitar duplicados.
 */
let guessedPlayers = []; // Jugadores ya intentados

/**
 * Inicia el juego seleccionando aleatoriamente un jugador y reseteando el estado de la interfaz.
 */
function startGame() {
    // Seleccionar aleatoriamente un jugador del array players
    mysteryPlayer = players[Math.floor(Math.random() * players.length)];
    // Actualizar la imagen del jugador en el DOM con la imagen del jugador misterioso
    document.getElementById("player-image").src = mysteryPlayer.img;
    // Aplicar un filtro de desenfoque a la imagen para ocultar detalles
    document.getElementById("player-image").style.filter = "blur(20px)";
    // Limpiar el campo de entrada de texto
    document.getElementById("guess-input").value = "";
    // Limpiar el contenido de las pistas (hints)
    document.getElementById("hints").innerHTML = "";
    // Reiniciar el contador de intentos en la interfaz
    document.getElementById("attempts").innerText = "Intentos restantes: 4";
    // Ocultar y deshabilitar el botón de "Nuevo Juego"
    document.getElementById("new-game").style.display = "none";
    document.getElementById("new-game").disabled = true;
    // Reinicializar los intentos y el array de jugadores adivinados
    attempts = 4;
    guessedPlayers = [];
}

// Asigna la función startGame para que se ejecute al cargar la ventana
window.onload = startGame;

/**
 * Muestra un toast con un mensaje personalizado.
 *
 * @param {string} message - El mensaje que se mostrará en el toast.
 */
function showToast(message) {
    // Obtener el elemento del toast por su ID
    const toastElement = document.getElementById('toastLimpiar');
    // Seleccionar el contenedor donde se mostrará el mensaje
    const toastBody = toastElement.querySelector('.toast-body');
    // Actualizar el mensaje del toast
    toastBody.textContent = message;
    // Crear una instancia del toast de Bootstrap y mostrarlo
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

/**
 * Verifica la adivinanza introducida por el usuario y actualiza la interfaz según corresponda.
 */
function checkGuess() {
    // Si el botón "Nuevo Juego" está visible, significa que el juego ya terminó
    if (document.getElementById("new-game").style.display !== "none") {
         showToast("Pulse en Nuevo Juego para jugar otra vez");
         return; // Se detiene la ejecución si ya se terminó el juego
    }

    // Si no quedan intentos, se sale de la función
    if (attempts <= 0) return;

    // Obtener el valor introducido por el usuario y eliminar espacios en blanco
    let guess = document.getElementById("guess-input").value.trim();
    // Buscar en el array players un jugador cuyo nombre coincida (ignorando mayúsculas/minúsculas)
    let foundPlayer = players.find(p => p.name.toLowerCase() === guess.toLowerCase());

    // Si el jugador ya ha sido probado anteriormente, mostrar un toast y salir de la función
    if (guessedPlayers.includes(guess.toLowerCase())) {
        showToast("¡Ya has probado con este jugador!");
        return;
    }

    // Si no se encuentra un jugador con el nombre ingresado, mostrar un toast con mensaje de error
    if (!foundPlayer) {
        showToast("Ese jugador no pertenece al FC Barcelona");
        return;
    }

    // Agregar el nombre del jugador adivinado (en minúsculas) al array de intentos
    guessedPlayers.push(guess.toLowerCase());
    // Decrementar la cantidad de intentos
    attempts--;
    // Actualizar el contador de intentos en la interfaz
    document.getElementById("attempts").innerText = `Intentos restantes: ${attempts}`;

    // Si el jugador encontrado coincide con el jugador misterioso (respuesta correcta)
    if (foundPlayer.name === mysteryPlayer.name) {
        // Remover el desenfoque de la imagen para mostrarla claramente
        document.getElementById("player-image").style.filter = "blur(0px)";
        // Mostrar un mensaje de acierto en la sección de pistas
        document.getElementById("hints").innerHTML = `<h2>¡Correcto! Era ${mysteryPlayer.name}.</h2>`;
        // Mostrar y habilitar el botón de "Nuevo Juego"
        document.getElementById("new-game").style.display = "inline";
        document.getElementById("new-game").disabled = false;
    } else {
        // Si la respuesta es incorrecta, se generan pistas para ayudar al usuario

        // Inicialización de la pista relacionada con la edad
        let ageHint = '';
        if (foundPlayer.age < mysteryPlayer.age) {
            ageHint = '⬆️'; // Indica que la edad debe ser mayor
        } else if (foundPlayer.age > mysteryPlayer.age) {
            ageHint = '⬇️'; // Indica que la edad debe ser menor
        } else {
            ageHint = '✅'; // Edad correcta
        }

        // Inicialización de la pista relacionada con el número (dorsal)
        let numberHint = '';
        if (foundPlayer.number < mysteryPlayer.number) {
            numberHint = '⬆️'; // Indica que el número debe ser mayor
        } else if (foundPlayer.number > mysteryPlayer.number) {
            numberHint = '⬇️'; // Indica que el número debe ser menor
        } else {
            numberHint = '✅'; // Número correcto
        }

        // Construcción del mensaje de pistas con los datos del jugador intentado
        let hints = `<div class='hint'>
            Nombre: ${guess} ❌<br>
            Posición: ${foundPlayer.position === mysteryPlayer.position ? '✅' : '❌'} (${foundPlayer.position})<br>
            Edad: ${ageHint} (${foundPlayer.age})<br>
            Dorsal: ${numberHint} (${foundPlayer.number})<br>
            Nacionalidad: ${foundPlayer.nationality === mysteryPlayer.nationality ? '✅' : '❌'} (${foundPlayer.nationality})
        </div>`;
        // Agregar las pistas al contenedor correspondiente en el DOM
        document.getElementById("hints").innerHTML += hints;
        // Ajustar el nivel de desenfoque de la imagen según la cantidad de intentos restantes
        document.getElementById("player-image").style.filter = `blur(${20 - (4 - attempts) * 3}px)`;
    }

    // Si se han agotado todos los intentos, mostrar el mensaje final y habilitar el botón de "Nuevo Juego"
    if (attempts === 0) {
        document.getElementById("hints").innerHTML = `<h2>Se acabaron los intentos. El jugador era: ${mysteryPlayer.name}</h2>`;
        document.getElementById("player-image").style.filter = "blur(0px)";
        document.getElementById("new-game").style.display = "inline";
        document.getElementById("new-game").disabled = false;
    }
}

// Asigna la función startGame al botón "Nuevo Juego" para reiniciar el juego al hacer clic
document.getElementById("new-game").onclick = startGame;
