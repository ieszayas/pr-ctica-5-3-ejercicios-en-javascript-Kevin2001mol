/**
 * Índice de la imagen actualmente activa en el carrusel.
 * @type {number}
 */
let currentImageIndex = 0;

/**
 * Arreglo con las descripciones de cada imagen del carrusel.
 * @type {string[]}
 */
let imageDescriptions = [
    "Lamine con el MVP después del memorable partido contra el BvB",
    "Jugadores del Fc Barcelona celebrando el último gol marcado en el partido contra el Borussia Dortmund.",
    "Lamine y Ferrán celebrando el gol de Ferrán Torres en el Westfalenstadion.",
    "Afición animando al Fc Barcelona después de la victoria en la supercopa del equipo blaugrana"
];

/**
 * Muestra la imagen ampliada en el modal junto con su descripción.
 *
 * @param {HTMLElement} imgElement - Elemento de imagen clickeado del carrusel.
 * @param {string} description - Texto descriptivo asociado a la imagen.
 */
function showImage(imgElement, description) {
    // Obtener el elemento del modal donde se mostrará la imagen.
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imgElement.src; // Establece la imagen del modal con la fuente del elemento clickeado.

    // Obtener el elemento donde se mostrará el texto descriptivo.
    const modalText = document.getElementById("modalText");
    modalText.textContent = description; // Actualiza el texto del modal.

    // Ajusta el ancho máximo de la imagen en el modal.
    modalImage.style.maxWidth = '120vw';

    // Asegurarse de que el contenido del modal esté centrado.
    const modalContent = document.getElementById("modal-content");
    modalContent.style.textAlign = 'center';
}

/**
 * Avanza al siguiente imagen del carrusel de forma circular y actualiza el modal.
 */
function nextImage() {
    // Seleccionar todas las imágenes dentro de los elementos con la clase "carousel-item".
    const images = document.querySelectorAll(".carousel-item img");

    // Incrementa el índice de forma circular utilizando el operador módulo.
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Actualizar la imagen en el modal.
    const modalImage = document.getElementById("modalImage");
    modalImage.src = images[currentImageIndex].src;

    // Actualizar el texto descriptivo en el modal según la imagen actual.
    const modalText = document.getElementById("modalText");
    modalText.textContent = imageDescriptions[currentImageIndex];
}

/**
 * Añade un listener para eliminar la clase "modal-open" del cuerpo cuando se cierra el modal.
 * Esto ayuda a que el modal se cierre sin problemas.
 */
document.getElementById("imageModal").addEventListener("hidden.bs.modal", function () {
    document.body.classList.remove("modal-open");
});

/**
 * Maneja el evento de envío del formulario de búsqueda.
 * Realiza la búsqueda del jugador en la tabla y resalta la fila si se encuentra.
 */
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío del formulario para evitar recargar la página.

    // Obtener la consulta de búsqueda, convertirla a minúsculas y quitar espacios en blanco.
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    // Obtener la tabla de jugadores y todas sus filas.
    const table = document.getElementById('playersTable');
    const rows = table.getElementsByTagName('tr');
    let found = false;

    // Eliminar cualquier resaltado previo removiendo la clase 'highlight-row' de todas las filas.
    for (let row of rows) {
        row.classList.remove('highlight-row');
    }

    // Si el campo de búsqueda está vacío, muestra un toast y sale de la función.
    if (!searchQuery) {
        showToast('Por favor, introduce un nombre para buscar.');
        return;
    }

    // Buscar el jugador en cada fila (se omite la primera fila de encabezado).
    for (let i = 1; i < rows.length; i++) {
        // Obtener las celdas (td) de la fila.
        const cells = rows[i].getElementsByTagName('td');

        // Comprobar que la fila tenga al menos una celda para evitar modificar la fila del encabezado.
        if (cells.length > 1) {
            // Obtener el nombre del jugador (asumido en la primera celda), limpiar espacios y convertir a minúsculas.
            const playerName = cells[0].textContent.trim().toLowerCase();

            // Escribir en consola para depuración.
            console.log(`Buscando: "${searchQuery}", Jugador: "${playerName}"`);

            // Comparar el nombre del jugador con la consulta exacta.
            if (playerName === searchQuery) {
                // Si coincide, resalta la fila añadiendo la clase 'highlight-row'.
                rows[i].classList.add('highlight-row');
                // Desplaza la vista para centrar la fila encontrada.
                rows[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
                break; // Terminar la búsqueda al encontrar el jugador.
            }
        } else {
            // Mensaje de depuración si la fila no tiene suficientes celdas.
            console.log(`Fila ${i} no tiene suficientes celdas.`);
        }
    }

    // Si el jugador no fue encontrado, muestra un toast con el mensaje "Jugador no encontrado."
    if (!found) {
        showToast('Jugador no encontrado.');
    }    
});

/**
 * Muestra un toast (notificación) con un mensaje personalizado.
 *
 * @param {string} message - Mensaje que se mostrará en el toast.
 */
function showToast(message) {
    // Obtener el elemento toast mediante su ID.
    const toastElement = document.getElementById('toastLimpiar'); // Asegúrate de que este ID coincida con el HTML.
    // Seleccionar el contenedor del mensaje dentro del toast.
    const toastBody = toastElement.querySelector('.toast-body');
    // Actualizar el contenido del mensaje.
    toastBody.textContent = message;
    // Crear una instancia del toast usando Bootstrap y mostrarlo.
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}


// =============================
// Funcionalidad de Accesibilidad
// =============================

/**
 * Variable global para almacenar el objeto de síntesis de voz.
 * @type {SpeechSynthesisUtterance|null}
 */
let speech = null;

/**
 * Lee el contenido de la página utilizando la síntesis de voz.
 * Recopila el texto de diversos elementos y lo envía a la síntesis de voz.
 */
function readContent() {
    stopReading(); // Detener cualquier lectura previa antes de iniciar una nueva.

    // Verificar si el navegador soporta la síntesis de voz.
    if (!('speechSynthesis' in window)) {
        alert("La síntesis de voz no es compatible con este navegador.");
        return;
    }

    let text = "";
    // Seleccionar todos los elementos dentro del cuerpo de la página.
    const elements = document.querySelectorAll('body *');

    // Recorrer cada elemento para extraer su contenido relevante.
    elements.forEach(el => {
        // Solo procesar nodos de tipo elemento.
        if (el.nodeType === Node.ELEMENT_NODE) {
            // Si es un encabezado (H1 a H6), agregar su texto.
            if (el.tagName.match(/^H[1-6]$/)) {
                text += ` Encabezado: ${el.innerText}. `;
            } 
            // Si es una imagen y tiene atributo alt, agregar el texto alternativo.
            else if (el.tagName === "IMG" && el.alt) {
                text += ` Imagen: ${el.alt}. `;
            } 
            // Si es un párrafo, agregar su contenido.
            else if (el.tagName === "P") {
                text += ` ${el.innerText}. `;
            } 
            // Si es una tabla, recorrer sus filas y celdas para extraer el contenido.
            else if (el.tagName === "TABLE") {
                el.querySelectorAll("tr").forEach(row => {
                    row.querySelectorAll("th, td").forEach(cell => {
                        text += ` ${cell.innerText}. `;
                    });
                });
            } 
            // Si es un botón o un enlace, agregar su texto.
            else if (el.tagName === "BUTTON" || el.tagName === "A") {
                text += ` Botón o enlace: ${el.innerText}. `;
            }
        }
    });

    // Si después de recopilar texto no hay contenido, notificar al usuario.
    if (text.trim() === "") {
        alert("No hay contenido para leer.");
        return;
    }

    // Crear una instancia de SpeechSynthesisUtterance con el texto recopilado.
    speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'es-ES'; // Configurar el idioma a español.
    speech.rate = 1; // Velocidad normal.
    speech.pitch = 1; // Tono normal.

    // Iniciar la síntesis de voz.
    window.speechSynthesis.speak(speech);
}

/**
 * Detiene la lectura en curso si la síntesis de voz está activa.
 */
function stopReading() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Detener inmediatamente la lectura.
    }
}

/**
 * Configura eventos al cargar el DOM:
 * - Inicia la lectura de contenido en caso de cambios.
 * - Configura atajos de teclado para iniciar/detener la lectura.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Confirmar que el DOM ha sido completamente cargado.
    console.log("DOM cargado");

    // Crear un observador de mutaciones para detectar cambios en el DOM.
    const observer = new MutationObserver(() => {
        readContent();
    });

    // Configurar el observador para monitorear cambios en el cuerpo del documento.
    observer.observe(document.body, { childList: true, subtree: true });

    // Configurar eventos de teclado: Alt+L para iniciar lectura, Alt+P para detener.
    document.addEventListener('keydown', function (event) {
        if (event.altKey && event.key === 'l') {
            readContent();
        } else if (event.altKey && event.key === 'p') {
            stopReading();
        }
    });
});

// ====================
// Llamada a API y manejo de datos
// ====================

/**
 * Realiza una solicitud a la API para obtener los datos de los jugadores y actualiza la tabla correspondiente.
 */
fetch('http://localhost:8080/api/jugadores') // Cambiar la URL según sea necesario
    .then(response => response.json()) // Convertir la respuesta a formato JSON
    .then(data => {
        // Obtener el elemento tbody de la tabla donde se insertarán los datos.
        const tableBody = document.getElementById('jugadores10');
        // Limpiar el contenido actual de la tabla.
        tableBody.innerHTML = "";

        // Recorrer cada objeto jugador y crear una fila de la tabla.
        data.forEach(jugador => {
            const row = document.createElement("tr");
            // Definir el contenido de la fila con las propiedades del jugador.
            row.innerHTML = `
                <td>${jugador.nombre}</td>
                <td>${jugador.dorsal}</td>
                <td>${jugador.asistencias}</td>
                <td>${jugador.goles}</td>
            `;
            // Agregar la fila al cuerpo de la tabla.
            tableBody.appendChild(row);
        });
    })
    .catch (error => {
        // Manejar y mostrar errores en la consola en caso de fallo en la solicitud.
        console.error('Error al obtener los datos:', error);
    });

// ====================
// Configuración de Chart.js para gráfico de Valor de Mercado
// ====================

/**
 * Obtiene el contexto del canvas donde se dibujará el gráfico.
 */
const ctx = document.getElementById('marketValueChart').getContext('2d');

/**
 * Calcula un arreglo de 5 años (incluyendo el año actual y los 4 anteriores).
 * @type {number[]}
 */
const currentYear = new Date().getFullYear();
const years = [];
for (let i = 4; i >= 0; i--) {
    years.push(currentYear - i);
}

/**
 * Datos simulados de valor de mercado (en millones de €) para cada jugador en los últimos 5 años.
 */
const data = {
    labels: years, // Etiquetas con los años calculados
    datasets: [
        {
            label: 'Lamine Yamal',
            data: [50, 80, 120, 150, 180], // Valores 
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.2)',
            fill: false,
        },
        {
            label: 'Pedri',
            data: [30, 40, 60, 80, 100], // Valores 
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.2)',
            fill: false,
        },
        {
            label: 'Ronald Araujo',
            data: [20, 30, 40, 50, 55], // Valores 
            borderColor: 'green',
            backgroundColor: 'rgba(0,255,0,0.2)',
            fill: false,
        }
    ]
};

/**
 * Configuración del gráfico de línea con Chart.js, incluyendo estilos para textos, ejes y cuadriculas en color blanco.
 */
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true, // Hace que el gráfico sea responsivo
        plugins: {
            legend: {
                labels: {
                    color: 'white' // Establece el color de la leyenda en blanco
                }
            },
            title: {
                display: true,
                text: 'Evolución del Valor de Mercado (últimos 5 años)',
                color: 'white' // Establece el color del título del gráfico en blanco
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'white',      // Color de las líneas de la cuadricula del eje X
                    borderColor: 'white' // Color del borde del eje X
                },
                title: {
                    display: true,
                    text: 'Año',
                    color: 'white' // Color del título del eje X
                },
                ticks: {
                    color: 'white' // Color de las etiquetas en el eje X
                }
            },
            y: {
                grid: {
                    color: 'white',      // Color de las líneas de la cuadricula del eje Y
                    borderColor: 'white' // Color del borde del eje Y
                },
                title: {
                    display: true,
                    text: 'Valor (mill. €)',
                    color: 'white' // Color del título del eje Y
                },
                ticks: {
                    color: 'white' // Color de las etiquetas en el eje Y
                }
            }
        }
    }
};

/**
 * Crea el gráfico de línea usando Chart.js con la configuración definida.
 */
const marketValueChart = new Chart(ctx, config);
