// Variable para rastrear la imagen activa en el carrusel
let currentImageIndex = 0;
let imageDescriptions = [
    "Lamine con el MVP después del memorable partido contra el BvB",
    "Jugadores del Fc Barcelona celebrando el último gol marcado en el partido contra el Borussia Dortmund.",
    "Lamine y Ferrán celebrando el gol de Ferrán Torres en el Westfalenstadion.",
    "Afición animando al Fc Barcelona después de la victoria en la supercopa del equipo blaugrana"
];

// Función para mostrar la imagen ampliada en el modal y el texto correspondiente
function showImage(imgElement, description) {
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imgElement.src; // Establecer la imagen del modal

    // Mostrar el texto relacionado con la imagen
    const modalText = document.getElementById("modalText");
    modalText.textContent = description;

    // Ajustar la imagen al 50% de la pantalla
    modalImage.style.maxWidth = '120vw'; // Establecer el tamaño de la imagen

    // Asegurarse de que el modal se mantenga centrado
    const modalContent = document.getElementById("modal-content");
    modalContent.style.textAlign = 'center'; // Centra el contenido del modal
}

// Función para pasar a la siguiente imagen del carrusel
function nextImage() {
    const images = document.querySelectorAll(".carousel-item img");

    // Obtener la siguiente imagen (circular)
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Actualizar la imagen en el modal
    const modalImage = document.getElementById("modalImage");
    modalImage.src = images[currentImageIndex].src;

    // Actualizar el texto según la imagen
    const modalText = document.getElementById("modalText");
    modalText.textContent = imageDescriptions[currentImageIndex];
}

// Para que el modal se cierre sin problemas si es necesario
document.getElementById("imageModal").addEventListener("hidden.bs.modal", function () {
    document.body.classList.remove("modal-open");
});

// Añadir un event listener para el evento de enviar el formulario
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir que el formulario se envíe

    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim(); // Obtener el texto del campo de búsqueda y convertirlo a minúsculas
    const table = document.getElementById('playersTable');
    const rows = table.getElementsByTagName('tr'); // Obtener todas las filas
    let found = false;

    // Eliminar cualquier resaltado previo
    for (let row of rows) {
        row.classList.remove('highlight-row');
    }

    // Comprobamos si hay algo escrito en el campo de búsqueda
    if (!searchQuery) {
        showToast('Por favor, introduce un nombre para buscar.');
        return;
    }

    // Buscar el jugador en las filas, solo en la columna del nombre
    for (let i = 1; i < rows.length; i++) { // Empezamos en 1 para omitir el encabezado
        const cells = rows[i].getElementsByTagName('td');

        // Comprobamos que haya al menos una celda (esto también garantiza que no estamos tocando las filas del encabezado)
        if (cells.length > 1) {
            const playerName = cells[0].textContent.trim().toLowerCase(); // Obtener el nombre del jugador (primera celda)

            // Verificación en consola
            console.log(`Buscando: "${searchQuery}", Jugador: "${playerName}"`);

            // Comparación exacta del nombre
            if (playerName === searchQuery) {
                console.log("Jugador encontrado: ", playerName); // Verificar si el jugador se encuentra
                rows[i].classList.add('highlight-row'); // Resaltar la fila
                rows[i].scrollIntoView({ behavior: 'smooth', block: 'center' }); // Desplazar hacia la fila encontrada
                found = true;
                break; // Salir del bucle cuando se encuentra el jugador
            }
        } else {
            console.log(`Fila ${i} no tiene suficientes celdas.`);
        }
    }

    if (!found) {
        showToast('Jugador no encontrado.');
    }
});

function showToast(message) {
    const toastElement = document.getElementById('playerNotFoundToast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Accesibilidad

let speech = null; // Variable para la lectura de voz

function readContent() {
    stopReading(); // Detiene cualquier lectura en curso antes de iniciar una nueva

    if (!('speechSynthesis' in window)) {
        alert("La síntesis de voz no es compatible con este navegador.");
        return;
    }

    let text = "";
    const elements = document.querySelectorAll('body *');

    elements.forEach(el => {
        if (el.nodeType === Node.ELEMENT_NODE) {
            if (el.tagName.match(/^H[1-6]$/)) { // Encabezados
                text += ` Encabezado: ${el.innerText}. `;
            } else if (el.tagName === "IMG" && el.alt) { // Imágenes con alt
                text += ` Imagen: ${el.alt}. `;
            } else if (el.tagName === "P") { // Párrafos
                text += ` ${el.innerText}. `;
            } else if (el.tagName === "TABLE") { // Tablas
                el.querySelectorAll("tr").forEach(row => {
                    row.querySelectorAll("th, td").forEach(cell => {
                        text += ` ${cell.innerText}. `;
                    });
                });
            } else if (el.tagName === "BUTTON" || el.tagName === "A") { // Botones y enlaces
                text += ` Botón o enlace: ${el.innerText}. `;
            }
        }
    });

    if (text.trim() === "") {
        alert("No hay contenido para leer.");
        return;
    }

    speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'es-ES'; // Español
    speech.rate = 1; // Velocidad normal
    speech.pitch = 1; // Tono normal

    window.speechSynthesis.speak(speech);
}

function stopReading() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Detiene la lectura inmediatamente
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Aquí dentro, el DOM estará completamente cargado
    console.log("DOM cargado");

    const observer = new MutationObserver(() => {
        readContent();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Eventos de teclado para iniciar y detener la lectura
    document.addEventListener('keydown', function (event) {
        if (event.altKey && event.key === 'l') {
            readContent();
        } else if (event.altKey && event.key === 'p') {
            stopReading();
        }
    });
});
// MY API
// Hacer la solicitud a la API
fetch('http://localhost:8080/api/jugadores') // Cambia la URL si es necesario
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then(data => {
        // Obtenemos el cuerpo de la tabla
        const tableBody = document.getElementById('jugadores10');
        tableBody.innerHTML = "";

        // Agregar la fila al cuerpo de la tabla
        data.forEach(jugador => {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td>${jugador.nombre}</td>
                        <td>${jugador.goles}</td>
                        <td>${jugador.asistencias}</td>
                        <td>${jugador.partidos}</td>
                    `;
            tableBody.appendChild(row);
        });
    })

    .catch (error => {
    console.error('Error al obtener los datos:', error);
})
