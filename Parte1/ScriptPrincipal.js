
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
                alert('Por favor, introduce un nombre para buscar.');
                return;
            }

            // Buscar el jugador en las filas, solo en la columna del nombre
            for (let i = 1; i < rows.length; i++) { // Empezamos en 1 para omitir el encabezado
                const cells = rows[i].getElementsByTagName('td');

                // Comprobamos que haya al menos una celda (esto también garantiza que no estamos tocando las filas del encabezado)
                if (cells.length > 1) {
                    const playerName = cells[1].textContent.trim().toLowerCase(); // Obtener el nombre del jugador (segunda celda)

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
                }
            }

            if (!found) {
                alert('Jugador no encontrado');
            }
        });


   