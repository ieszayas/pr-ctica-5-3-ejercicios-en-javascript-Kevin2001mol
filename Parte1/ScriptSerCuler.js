// ==============================
// Obtención de elementos del DOM
// ==============================

/**
 * Elemento del formulario.
 * @type {HTMLElement}
 */
const formulario = document.getElementById('formulario');

/**
 * Botón para limpiar el formulario.
 * @type {HTMLElement}
 */
const btnLimpiar = document.getElementById('btnLimpiar');

/**
 * Campo de entrada para el nombre.
 * @type {HTMLElement}
 */
const nombre = document.getElementById('nombre');

/**
 * Campo de entrada para la contraseña.
 * @type {HTMLElement}
 */
const password = document.getElementById('password');

/**
 * Campo de entrada para el correo electrónico.
 * @type {HTMLElement}
 */
const email = document.getElementById('email');

/**
 * Campo de entrada para la fecha de nacimiento.
 * @type {HTMLElement}
 */
const birthdate = document.getElementById('birthdate');

/**
 * Checkbox para aceptar los términos y condiciones.
 * @type {HTMLElement}
 */
const terms = document.getElementById('terms');


// ====================================
// Funciones de validación de los campos
// ====================================

/**
 * Valida el campo del nombre.
 * Elimina espacios en blanco y comprueba que no esté vacío y que contenga solo letras.
 * Actualiza el DOM mostrando mensajes de validación.
 *
 * @returns {boolean} Verdadero si el nombre es válido, de lo contrario, falso.
 */
function validarNombre() {
    // Obtener el valor del campo y quitar espacios en blanco al inicio y al final.
    const valor = nombre.value.trim();
    // Remover clases de validación previas.
    nombre.classList.remove('is-valid', 'is-invalid');

    // Validar si el campo está vacío.
    if (valor === '') {
        // Mostrar mensaje de error en el elemento siguiente.
        nombre.nextElementSibling.textContent = 'El campo Nombre no puede estar vacío.';
        // Agregar clase de error.
        nombre.classList.add('is-invalid');
        return false;
    }
    // Validar que el nombre contenga solo letras (mayúsculas y minúsculas).
    else if (!/^[a-zA-Z]+$/.test(valor)) {
        nombre.nextElementSibling.textContent = 'El Nombre solo puede contener letras (a-z, A-Z).';
        nombre.classList.add('is-invalid');
        return false;
    } else {
        // Si es válido, mostrar mensaje de éxito.
        nombre.nextElementSibling.textContent = '¡Nombre válido!';
        nombre.classList.add('is-valid');
        return true;
    }
}

/**
 * Valida el campo de la contraseña.
 * Comprueba que no esté vacío y que cumpla con el formato requerido:
 * mínimo 8 caracteres, al menos un número y un carácter especial.
 *
 * @returns {boolean} Verdadero si la contraseña es válida, de lo contrario, falso.
 */
function validarPassword() {
    const valor = password.value.trim();
    // Quitar clases de validación previas.
    password.classList.remove('is-valid', 'is-invalid');

    // Verificar si el campo está vacío.
    if (valor === '') {
        password.nextElementSibling.textContent = 'El campo Contraseña no puede estar vacío.';
        password.classList.add('is-invalid');
        return false;
    }
    // Verificar si la contraseña cumple con los criterios establecidos.
    else if (!/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/.test(valor)) {
        password.nextElementSibling.textContent = 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.';
        password.classList.add('is-invalid');
        return false;
    } else {
        // Contraseña válida: mostrar mensaje de éxito.
        password.nextElementSibling.textContent = '¡Contraseña válida!';
        password.classList.add('is-valid');
        return true;
    }
}

/**
 * Valida el campo del correo electrónico.
 * Se asegura de que el campo no esté vacío y que cumpla con el formato de email.
 *
 * @returns {boolean} Verdadero si el correo es válido, de lo contrario, falso.
 */
function validarEmail() {
    const valor = email.value.trim();
    // Remover clases de validación previas.
    email.classList.remove('is-valid', 'is-invalid');
    // Expresión regular para validar el formato del email.
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

/**
 * Valida el campo de la fecha de nacimiento.
 * Verifica que no esté vacío y que el usuario tenga al menos 18 años.
 *
 * @returns {boolean} Verdadero si la fecha es válida (mayor de 18), de lo contrario, falso.
 */
function validarFechaNacimiento() {
    // Obtener y limpiar el valor del campo de fecha.
    const valor = birthdate.value.trim();
    // Eliminar clases de validación previas.
    birthdate.classList.remove('is-valid', 'is-invalid');
    
    // Comprobar si el campo está vacío.
    if (valor === '') {
        birthdate.nextElementSibling.textContent = 'El campo Fecha de Nacimiento no puede estar vacío.';
        birthdate.classList.add('is-invalid');
        return false;
    }
    
    // Parsear el valor introducido como fecha.
    const fechaNacimiento = new Date(valor);
    const hoy = new Date();
    
    // Calcular la edad del usuario.
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    
    // Validar que la edad sea al menos 18 años.
    if (edad < 18) {
        birthdate.nextElementSibling.textContent = 'Debes ser mayor de 18 años para registrarte.';
        birthdate.classList.add('is-invalid');
        return false;
    } else {
        birthdate.nextElementSibling.textContent = '¡Fecha válida!';
        birthdate.classList.add('is-valid');
        return true;
    }
}



// =====================================
// Eventos para el formulario
// =====================================

/**
 * Evento para limpiar los datos del formulario.
 * Reinicia el formulario, limpia clases de validación y muestra un toast.
 */
btnLimpiar.addEventListener('click', () => {
    // Reinicia el formulario.
    formulario.reset();

    // Array con los campos que se deben limpiar.
    const campos = [nombre, password, email, birthdate];
    // Crear y mostrar un toast para notificar que se limpiaron los datos.
    const toastEnviar = new bootstrap.Toast(document.getElementById('toastLimpiar'));
    toastEnviar.show();
    // Eliminar clases de validación y mensajes en cada campo.
    campos.forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
        campo.nextElementSibling.textContent = '';
    });
});

/**
 * Evento para enviar el formulario.
 * Valida cada campo, evita el envío por defecto y, si todo es válido, muestra un toast y limpia el formulario.
 */
formulario.addEventListener('submit', (event) => {
    // Prevenir el envío del formulario para evitar recarga de página.
    event.preventDefault();

    // Ejecutar las funciones de validación y almacenar el resultado.
    const esNombreValido = validarNombre();
    const esPasswordValido = validarPassword();
    const esEmailValido = validarEmail();
    const esFechaValida = validarFechaNacimiento();

    // Verificar si el checkbox de términos está marcado.
    if (!terms.checked) {
        terms.classList.add('is-invalid');
        return;
    } else {
        terms.classList.remove('is-invalid');
    }

    // Si todos los campos son válidos y los términos están aceptados:
    if (esNombreValido && esPasswordValido && esEmailValido && esFechaValida && terms.checked) {
        // Crear y mostrar un toast para notificar que el formulario se envió correctamente.
        const toastEnviar = new bootstrap.Toast(document.getElementById('toastEnviar'));
        toastEnviar.show();
        // Reiniciar el formulario.
        formulario.reset();

        // Limpiar clases de validación y mensajes en cada campo.
        const campos = [nombre, password, email, birthdate];
        campos.forEach(campo => {
            campo.classList.remove('is-valid', 'is-invalid');
            campo.nextElementSibling.textContent = '';
        });
    }
});

// Event listener para el checkbox de términos y condiciones
terms.addEventListener('change', function() {
    // Si el checkbox está marcado, se elimina la clase de error "is-invalid"
    if (this.checked) {
        this.classList.remove('is-invalid');
    }
});



// =====================================
// Validación en tiempo real
// =====================================

// Agregar eventos 'input' para validar a medida que el usuario escribe.
nombre.addEventListener('input', validarNombre);
password.addEventListener('input', validarPassword);
email.addEventListener('input', validarEmail);
birthdate.addEventListener('input', validarFechaNacimiento);


// =====================================
// Funcionalidad del reloj digital
// =====================================

/**
 * Actualiza el contador regresivo hasta el próximo miércoles a las 14:00 horas.
 * Calcula la diferencia de tiempo y actualiza el elemento con id "digitalClock".
 */
function updateCountdown() {
    // Obtener la fecha y hora actual.
    const now = new Date();
    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado).
    const dayOfWeek = now.getDay();
    // Crear un objeto Date para el próximo miércoles.
    const nextWednesday = new Date();
    // Calcular los días restantes hasta el próximo miércoles.
    const daysToWednesday = (3 - dayOfWeek + 7) % 7 || 7;

    // Actualizar la fecha del próximo miércoles.
    nextWednesday.setDate(now.getDate() + daysToWednesday);
    // Establecer la hora a las 14:00:00.
    nextWednesday.setHours(14, 0, 0, 0);

    // Si el próximo miércoles ya pasó en la fecha actual, sumar 7 días.
    if (nextWednesday.getTime() <= now.getTime()) {
        nextWednesday.setDate(nextWednesday.getDate() + 7);
    }

    // Calcular la diferencia en milisegundos entre el próximo miércoles y ahora.
    const diff = nextWednesday - now;

    // Convertir la diferencia a horas, minutos y segundos.
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

    // Actualizar el contenido del elemento con id "digitalClock".
    document.getElementById("digitalClock").textContent = `¡Te quedan ${hours}:${minutes}:${seconds}  para poder aprovecharte de descuentos exclusivos al registrarte!`;
}

// Configurar que la función updateCountdown se ejecute cada segundo.
setInterval(updateCountdown, 1000);
// Llamar a updateCountdown inmediatamente para inicializar el reloj.
updateCountdown();
