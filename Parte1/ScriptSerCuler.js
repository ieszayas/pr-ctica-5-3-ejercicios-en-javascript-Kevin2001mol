
        // Obtener elementos del DOM
        const formulario = document.getElementById('formulario');
        const btnLimpiar = document.getElementById('btnLimpiar');
        const nombre = document.getElementById('nombre');
        const password = document.getElementById('password');
        const email = document.getElementById('email');
        const birthdate = document.getElementById('birthdate');
        const terms = document.getElementById('terms');

        // Validación de los campos
        // Validación del Nombre
        function validarNombre() {
            const valor = nombre.value.trim();
            nombre.classList.remove('is-valid', 'is-invalid');

            // Validar si el campo está vacío
            if (valor === '') {
                nombre.nextElementSibling.textContent = 'El campo Nombre no puede estar vacío.';
                nombre.classList.add('is-invalid');
                return false;
            }
            // Validar si el nombre contiene solo letras
            else if (!/^[a-zA-Z]+$/.test(valor)) {
                nombre.nextElementSibling.textContent = 'El Nombre solo puede contener letras (a-z, A-Z).';
                nombre.classList.add('is-invalid');
                return false;
            } else {
                nombre.nextElementSibling.textContent = '¡Nombre válido!';
                nombre.classList.add('is-valid');
                return true;
            }
        }


        // Validación de la Contraseña
        function validarPassword() {
            const valor = password.value.trim();
            password.classList.remove('is-valid', 'is-invalid');

            // Validar si el campo está vacío
            if (valor === '') {
                password.nextElementSibling.textContent = 'El campo Contraseña no puede estar vacío.';
                password.classList.add('is-invalid');
                return false;
            }
            // Validar si la contraseña tiene al menos 8 caracteres, un número y un carácter especial
            else if (!/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(valor)) {
                password.nextElementSibling.textContent = 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.';
                password.classList.add('is-invalid');
                return false;
            } else {
                password.nextElementSibling.textContent = '¡Contraseña válida!';
                password.classList.add('is-valid');
                return true;
            }
        }


        function validarEmail() {
            const valor = email.value.trim();
            email.classList.remove('is-valid', 'is-invalid');
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor === '') {
                email.nextElementSibling.textContent = 'El campo Email no puede estar vacío.';
                email.classList.add('is-invalid');
                return false;
            } else if (!regexEmail.test(valor)) {
                email.nextElementSibling.textContent = 'Por favor, introduce un correo electrónico válido.';
                email.classList.add('is-invalid');
                return false;
            } else {
                email.nextElementSibling.textContent = '¡Correo válido!';
                email.classList.add('is-valid');
                return true;
            }
        }

        function validarFechaNacimiento() {
            const valor = birthdate.value.trim();
            birthdate.classList.remove('is-valid', 'is-invalid');
            if (valor === '') {
                birthdate.nextElementSibling.textContent = 'El campo Fecha de Nacimiento no puede estar vacío.';
                birthdate.classList.add('is-invalid');
                return false;
            } else {
                birthdate.nextElementSibling.textContent = '¡Fecha válida!';
                birthdate.classList.add('is-valid');
                return true;
            }
        }

        // Evento para limpiar los datos del formulario
        btnLimpiar.addEventListener('click', () => {
            formulario.reset();

            const campos = [nombre, password, email, birthdate];
            const toastEnviar = new bootstrap.Toast(document.getElementById('toastLimpiar'));
            toastEnviar.show();
            campos.forEach(campo => {
                campo.classList.remove('is-valid', 'is-invalid');
                campo.nextElementSibling.textContent = '';
            });
        });

        // Evento para enviar el formulario
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            const esNombreValido = validarNombre();
            const esPasswordValido = validarPassword();
            const esEmailValido = validarEmail();
            const esFechaValida = validarFechaNacimiento();

            // Verificar si el checkbox de términos está marcado
            if (!terms.checked) {
                terms.classList.add('is-invalid');
                return;
            } else {
                terms.classList.remove('is-invalid');
            }

            if (esNombreValido && esPasswordValido && esEmailValido && esFechaValida && terms.checked) {
                const toastEnviar = new bootstrap.Toast(document.getElementById('toastEnviar'));
                toastEnviar.show();
                formulario.reset(); // Limpia el formulario

                // Eliminar clases y mensajes de validación
                const campos = [nombre, password, email, birthdate];
                campos.forEach(campo => {
                    campo.classList.remove('is-valid', 'is-invalid');
                    campo.nextElementSibling.textContent = '';
                });
            }
        });

        // Validación en tiempo real
        nombre.addEventListener('input', validarNombre);
        password.addEventListener('input', validarPassword);
        email.addEventListener('input', validarEmail);
        birthdate.addEventListener('input', validarFechaNacimiento);
        //RELOJ
        function updateCountdown() {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const nextWednesday = new Date();
            const daysToWednesday = (3 - dayOfWeek + 7) % 7 || 7; // Calcula días restantes hasta miércoles

            nextWednesday.setDate(now.getDate() + daysToWednesday);
            nextWednesday.setHours(14, 0, 0, 0);

            if (nextWednesday.getTime() <= now.getTime()) {
                nextWednesday.setDate(nextWednesday.getDate() + 7);
            }

            const diff = nextWednesday - now;

            const hours = String(
                Math.floor((diff / (1000 * 60 * 60)) % 24)
            ).padStart(2, "0");
            const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
                2,
                "0"
            );
            const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

            document.getElementById(
                "digitalClock"
            ).textContent = `¡Te quedan ${hours}:${minutes}:${seconds}  para poder aprovecharte de descuentos exclusivos al registrarte!`;
        }

        setInterval(updateCountdown, 1000); // Actualizar cada segundo
        updateCountdown(); // Llamar inmediatamente para inicializar
 
        