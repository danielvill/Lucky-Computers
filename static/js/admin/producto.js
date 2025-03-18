// Validacion si los campos estan vacios esta vez tuve que cambiar lo que es para las class para este caso
document.querySelector('.form-horizontal').onsubmit = function (e) {
    var inputs = this.querySelectorAll('input');
    var todosLlenos = true; // Asume que todos los campos están llenos

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            todosLlenos = false; // Si un campo está vacío, establece todosLlenos en falso
            break; // No necesitas verificar el resto de los campos, así que puedes salir del bucle
        }
    }

    if (!todosLlenos) {
        e.preventDefault(); // Previene el envío del formulario
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos estan vacios'
        });
    } 
};


document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los inputs de tipo number en el formulario
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Validar que no se ingresen valores negativos
            if (this.value < 0) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡No se permiten valores negativos!'
                });
                this.value = '';
            }

            // Validar que solo se ingresen números y un punto decimal
            const value = this.value;
            const regex = /^\d*\.?\d*$/;

            if (!regex.test(value)) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor, ingresa un número válido. Solo se permiten números y un punto decimal.'
                });
                this.value = value.substr(0, value.length - 1);
            }
        });
    });
});