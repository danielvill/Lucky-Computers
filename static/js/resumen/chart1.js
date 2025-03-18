
// Para lo que es la tabla 

$(document).ready(function () {
    $('#myTable').DataTable({
        "language": {
            "url": "/static/js/Spanish.json"
        }
    });
    var table = $('#myTable').DataTable();
    let table2 =$('#myTable2').DataTable();
    let table3 =$('#myTable3').DataTable();
    let table4 =$('#myTable4').DataTable();
});


// Función para convertir fecha a mes en texto
function obtenerMes(fecha) {
    const opciones = { month: 'long' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// Obtener todas las celdas con la clase 'mes'
const celdasMes = document.querySelectorAll('.mes');

// Iterar sobre cada celda y asignar el mes correspondiente
celdasMes.forEach(celda => {
    // Obtener la fecha de la celda anterior
    const fecha = celda.previousElementSibling.textContent.trim();
    // Convertir la fecha a mes en texto
    const mesTexto = obtenerMes(fecha);
    // Asignar el mes a la celda
    celda.textContent = mesTexto;
});




// Función para obtener el mes a partir de una fecha
function obtenerMes(fecha) {
    const opciones = { month: 'long' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// Obtener datos de la tabla ventas
const filas = document.querySelectorAll('#myTable tbody tr');
const totalesPorMes = {};

filas.forEach(fila => {
    const fecha = fila.cells[0].textContent.trim();
    const mes = obtenerMes(fecha);
    const total = parseFloat(fila.cells[2].textContent.trim());

    if (!totalesPorMes[mes]) {
        totalesPorMes[mes] = 0;
    }
    totalesPorMes[mes] += total;
});

// Crear datos para el gráfico
const labels = Object.keys(totalesPorMes);
const data = Object.values(totalesPorMes);

// Crear el gráfico de barras
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Total ',
            data: data,
            backgroundColor: 'RGB(194,212,221)',
            borderColor: 'RGB(194,212,221)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// Grafico para los productos
// Extraer los datos de la tabla productos 
const table2 = document.getElementById('myTable2');
const rows = table2.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
const labels2 = [];
const data2 = [];

for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    labels2.push(cells[1].innerText); // Nombre del producto
    data2.push(parseInt(cells[2].innerText)); // Cantidad del producto
}

// Configurar el gráfico de tipo "dona"
const ctx2 = document.getElementById('myDoughnutChart').getContext('2d');
const myDoughnutChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: labels2,
        datasets: [{
            label: 'Total',
            data: data2,
            backgroundColor: [
                'RGB(52,73,94)',
                'RGB(26,188,156)',
                'RGB(46,204,113)',
                'RGB(52,152,219)',
                'RGB(155,89,182)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Productos'
            }
        }
    }
});




// Función para convertir fecha a mes de la tabla para saber cual producto es el mas vendido
function obtenerMes(fecha) {
    const opciones = { month: 'long' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}


// Obtener todas las celdas con la clase 'moth' (mes)
const celdasMes3 = document.querySelectorAll('.moth');

// Asignar el mes correspondiente a cada celda
celdasMes3.forEach(celda => {
    const fecha = celda.previousElementSibling.textContent.trim(); // Celda con la fecha
    const mesTexto = obtenerMes(fecha); // Convertir la fecha a mes
    celda.textContent = mesTexto; // Asignar el mes a la celda
});

// Objeto para almacenar totales por mes y producto
const totalesPorMesYProducto = {};

// Obtener las filas de la tabla
const filas3 = document.querySelectorAll('#myTable3 tbody tr');

filas3.forEach(fila => {
    const fecha = fila.children[0].textContent.trim(); // Celda de la fecha
    const mes = obtenerMes(fecha); // Convertir fecha a mes
    const nombreProducto = fila.children[2].textContent.trim(); // Nombre del producto
    const cantidad = parseFloat(fila.children[3].textContent.trim()); // Cantidad

    if (!totalesPorMesYProducto[mes]) {
        totalesPorMesYProducto[mes] = {}; // Crear objeto para este mes
    }

    if (!totalesPorMesYProducto[mes][nombreProducto]) {
        totalesPorMesYProducto[mes][nombreProducto] = 0; // Inicializar cantidad
    }

    // Sumar la cantidad al total
    totalesPorMesYProducto[mes][nombreProducto] += cantidad;
});

// Preparar los datos para el gráfico
const etiquetasMeses = Object.keys(totalesPorMesYProducto); // Etiquetas de los meses
const nombresProductos = new Set(); // Set para almacenar productos únicos

// Recopilar todos los nombres de productos
etiquetasMeses.forEach(mes => {
    Object.keys(totalesPorMesYProducto[mes]).forEach(producto => {
        nombresProductos.add(producto);
    });
});

// Crear datasets para Chart.js
const datasets = Array.from(nombresProductos).map(producto => {
    return {
        label: producto,
        data: etiquetasMeses.map(mes => totalesPorMesYProducto[mes][producto] || 0),
        backgroundColor: generarColorAleatorio() // Generar un color para cada producto
    };
});

// Función para generar colores aleatorios
function generarColorAleatorio() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
}

// Configurar el gráfico de barras
const ctx3 = document.getElementById('myChart3').getContext('2d');
new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: etiquetasMeses, // Meses en el eje X
        datasets: datasets // Datos por producto
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Totales de los productos'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



// Para la tabla Clientes recurrentes
// Función para convertir fecha a mes
function obtenerMes(fecha) {
    const opciones = { month: 'long' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// Obtener todas las celdas con la clase 'mensual' (mes)
const celdasMensual = document.querySelectorAll('.mensual');

// Asignar el mes correspondiente a cada celda
celdasMensual.forEach(celda => {
    const fecha = celda.previousElementSibling.textContent.trim(); // Celda con la fecha
    const mesTexto = obtenerMes(fecha); // Convertir la fecha a mes
    celda.textContent = mesTexto; // Asignar el mes a la celda
});

// Objeto para almacenar totales por mes y cliente
const totalesPorMesYCliente = {};

// Obtener las filas de la tabla
const filas4 = document.querySelectorAll('#myTable4 tbody tr');

filas4.forEach(fila => {
    const fecha = fila.children[0].textContent.trim(); // Celda de la fecha
    const mes = obtenerMes(fecha); // Convertir fecha a mes
    const cliente = fila.children[2].textContent.trim(); // Nombre del cliente
    const cantidad = parseFloat(fila.children[4].textContent.trim()); // Cantidad

    if (!totalesPorMesYCliente[mes]) {
        totalesPorMesYCliente[mes] = {}; // Crear objeto para este mes
    }

    if (!totalesPorMesYCliente[mes][cliente]) {
        totalesPorMesYCliente[mes][cliente] = 0; // Inicializar cantidad
    }

    // Sumar la cantidad al total
    totalesPorMesYCliente[mes][cliente] += cantidad;
});

// Preparar los datos para el gráfico
const etiquetasClientes = Object.keys(totalesPorMesYCliente); // Etiquetas de los meses
const clientes = new Set(); // Set para almacenar clientes únicos

// Recopilar todos los nombres de clientes
etiquetasClientes.forEach(mes => {
    Object.keys(totalesPorMesYCliente[mes]).forEach(cliente => {
        clientes.add(cliente);
    });
});

// Crear datasets para Chart.js (Polar Area)
const datosPolar = [];
const coloresPolar = []; // Colores para las áreas
clientes.forEach(cliente => {
    let totalPorCliente = 0;

    etiquetasClientes.forEach(mes => {
        totalPorCliente += totalesPorMesYCliente[mes][cliente] || 0;
    });

    datosPolar.push(totalPorCliente);
    coloresPolar.push(generarColorAleatorio());
});

// Función para generar colores aleatorios
function generarColorAleatorio() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
}

// Configurar el gráfico Polar Area
const ctx4 = document.getElementById('polarArea').getContext('2d');
new Chart(ctx4, {
    type: 'polarArea',
    data: {
        labels: Array.from(clientes), // Clientes como etiquetas
        datasets: [{
            label: 'Total ',
            data: datosPolar, // Totales por cliente
            backgroundColor: coloresPolar // Colores generados
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Totales por Cliente'
            }
        }
    }
});

