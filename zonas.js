
// Obtener referencia al dataTable
var dataTable = document.getElementById("clientesTable");

// Obtener referencia al select

var clienteSelect = document.getElementById("selectRegistros");
// Obtener los datos del Local Storage
var registros = obtenerRegistros();

if (registros) {
  // Generar las filas del DataTable

  // var filas = registros.map(function (registro) {
  //   return [
  //     registro[0], // id
  //     registro[1], // nombre
  //     registro[2], // apellido
  //     'N/A'
  //   ];
  // });


  // Inicializar el DataTable
  var table = $("#tablaZonas").DataTable({
    data: obtenerRegistroZone(), // Data
    columns: [
      { title: "Orden", 
          render: function(data, type, row, meta) {
            if (type === 'display') {
              return `<input type="number" data-value="${data}" class="editable" value="${data}">`;
            }
            return data;
          }
    
    },
      { title: "Nombre" },
      { title: "Apellido" },
      //{ title: "Direccion" },
      { title: "Zona" },
      { title: "Acciones" }
    ],
  });



$("#tablaZonas").on("blur", "input.editable", function() {
  const cell = table.cell($(this).closest("td"));
  const newValue = $(this).val();
  const regex = /^[0-9]+$/;
  if (regex.test(newValue) && newValue !== "" && newValue.toLowerCase() !== "e") {
    console.log(3)

    const registros = obtenerRegistroZone();  
    let registro;  
    for (const i in registros) {
      
      if (registros[i][0] == $(this).attr("data-value")) {
        registro = registros[i]
        break;
      }
    }
    
    registro[0] = newValue;

    registros.push(registro);

    localStorage.setItem("clientesZona", JSON.stringify(registros))

    cell.data(newValue).draw();
  }else {
    cell.data($(this).attr("data-value")).draw();
  }
  table.order([0, 'asc']).draw();
});




  // Generar las opciones del select con los registros del DataTable
  generarOpcionesSelect(clienteSelect, registros);
}

var btnAgregar = document.getElementById("btnAsignar")

// Escuchar el evento de cambio en el select
btnAgregar.addEventListener("click", function () {

  var selectedValue = clienteSelect.options[clienteSelect.selectedIndex].value;
  let zone = document.getElementById("inputZona").value
  if (selectedValue !== "-1" && zone !== "") {

    // Obtener todas las filas del DataTable
    var filas = table.rows().data().toArray();
    let isAdded = filas.some((fila) => fila[0] == selectedValue)
    if (isAdded) {
      Swal.fire({
        title: "Atención",
        text: `El cliente seleccionado ya se encuentra en la tabla`,
        icon: "error"
      })
    } else {

      let clientes = obtenerRegistros()
      const cliente = clientes.find((cliente) => cliente[0] == selectedValue)

      const clienteZona = obtenerRegistroZone()
   
      
      const newClienteZona = [cliente[0], cliente[1], cliente[2], zone, 
      `<button class="btn btn-danger btn-sm ml-2" onclick="eliminarCliente(${cliente[0]})">Eliminar</button>
      <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btnOpenModal" data-cliente-id="${cliente[0]}">Editar</button>`
    ]
      clienteZona.push(newClienteZona)
      table.row.add(newClienteZona).draw();
      localStorage.setItem('clientesZona', JSON.stringify(clienteZona));
    }

  }
});

function obtenerRegistros() {

  var registros = localStorage.getItem("clientesData");
  if (registros) {
    return JSON.parse(registros);
  }
  return []; // Devolver un arreglo vacío si no hay registros
}
function obtenerRegistroZone() {

  const registros = localStorage.getItem("clientesZona");
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
  option.value = "-1"; // Valor vacío
  option.textContent = "-- Selecone un cliente --";
  selectElement.appendChild(option);

  // Generar las opciones del select con los registros del DataTable
  registros.forEach(function (registro, index) {
    var option = document.createElement("option");
    option.value = registro[0]; // id como valor
    option.textContent = `${registro[1]} ${registro[2]}`; // Nombre del cliente como texto de la opción
    selectElement.appendChild(option);
  });
}

 // Generar las opciones del select con los registros del DataTable

  // (FUNCION DE ABAJO UTILIZA SWEET ALERT)

function eliminarCliente(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la zona definitivamente. ¿Deseas continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      let clientes = obtenerRegistroZone()
      const cliente = clientes.find((cliente) => cliente[0] == id)
      const index = clientes.indexOf(cliente)
      clientes.splice(index, 1)
      localStorage.setItem('clientesZona', JSON.stringify(clientes));
      location.reload()
      Swal.fire(
        'Eliminado',
        'La zona ha sido eliminada correctamente.',
        'success'
      )
    }
  });
}

 // (FUNCION DE ARRIBA UTILIZA SWEET ALERT)

// function editarCliente
var myModal = document.getElementById('exampleModal')

myModal.addEventListener('shown.bs.modal', function (e) {

  let clientes = obtenerRegistroZone()
  const cliente = clientes.find(cliente => cliente[0] == e.relatedTarget.getAttribute('data-cliente-id'))
  const index = clientes.indexOf(cliente)
  clientes.splice(index, 1)
  document.getElementById("oldZoneValue").textContent = cliente[3]

 

  $("#btnUpdateZoneModal").unbind('click')
  $("#btnUpdateZoneModal").bind('click', () => {

    const newZone = document.getElementById("updateZoneValue")
    if (newZone.value !== "") {
      cliente[3] = newZone.value
      clientes.push(cliente)
      localStorage.setItem('clientesZona', JSON.stringify(clientes));
      location.reload()
    }


  })


})






