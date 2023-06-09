debugger

document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencia al dataTable
  var dataTable = document.getElementById("clientesTable");

  // Obtener referencia al select
  var clienteSelect = document.getElementById("clienteSelect");

  // Obtener los datos del Local Storage
  var registros = obtenerRegistros();

  if (registros.length > 0) {
    // Generar las filas del DataTable
    var filas = registros.map(function (registro) {
      return [
        registro.codigo,
        registro.nombre,
        registro.apellido,
        registro.dni,
        registro.localidad,
        registro.direccion,
        registro.telefono,
        registro.condicion,
      ];
    });

    // Inicializar el DataTable
    var table = $("#clientesTable").DataTable({
      data: filas,
      columns: [
        { title: "Código ID" },
        { title: "Nombre" },
        { title: "Apellido" },
        { title: "DNI" },
        { title: "Localidad" },
        { title: "Dirección" },
        { title: "Teléfono" },
        { title: "Condición" },
      ],
    });

    // Generar las opciones del select con los registros del DataTable
    generarOpcionesSelect(clienteSelect, registros);
  }

  // Escuchar el evento de cambio en el select
  clienteSelect.addEventListener("change", function () {
    var selectedValue = clienteSelect.value;
    if (selectedValue !== "") {
      // Filtrar los registros por cliente seleccionado
      var registrosFiltrados = registros.filter(function (registro, index) {
        return index === parseInt(selectedValue);
      });

      // Generar las filas filtradas del DataTable
      var filasFiltradas = registrosFiltrados.map(function (registro) {
        return [
          registro.codigo,
          registro.nombre,
          registro.apellido,
          registro.dni,
          registro.localidad,
          registro.direccion,
          registro.telefono,
          registro.condicion,
        ];
      });

      // Limpiar el DataTable y agregar las filas filtradas
      table.clear().rows.add(filasFiltradas).draw();
    } else {
      // Mostrar todos los registros en el DataTable
      table.clear().rows.add(filas).draw();
    }
  });

  function obtenerRegistros() {
    var registros = localStorage.getItem("clientes");
    if (registros) {
      return JSON.parse(registros);
    }
    return []; // Devolver un arreglo vacío si no hay registros
  }

  function generarOpcionesSelect(selectElement, registros) {
    // Limpiar las opciones previas del select
    selectElement.innerHTML = "";

    // Agregar la opción "Seleccione un cliente"
    var option = document.createElement("option");
    option.value = ""; // Valor vacío
    option.textContent = "Seleccione un cliente";
    selectElement.appendChild(option);

    // Generar las opciones del select con los registros del DataTable
    registros.forEach(function (registro, index) {
      var option = document.createElement("option");
      option.value = index; // Índice como valor
      option.textContent = registro.nombre; // Nombre del cliente como texto de la opción
      selectElement.appendChild(option);
    });
  }
});
